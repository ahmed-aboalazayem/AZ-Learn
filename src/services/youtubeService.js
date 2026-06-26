const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE = "https://www.googleapis.com/youtube/v3";

/**
 * Parse a YouTube URL and extract playlistId or videoId.
 */
export function parseYouTubeUrl(url) {
    try {
        const u = new URL(url);
        const host = u.hostname.replace("www.", "");

        // Playlist URL
        const listId = u.searchParams.get("list");
        if (listId) return { type: "playlist", playlistId: listId };

        // Standard watch URL
        if (
            (host === "youtube.com" || host === "m.youtube.com") &&
            u.pathname === "/watch"
        ) {
            const v = u.searchParams.get("v");
            if (v) return { type: "video", videoId: v };
        }

        // Shorts
        const shortsMatch = u.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]+)/);
        if (shortsMatch) return { type: "video", videoId: shortsMatch[1] };

        // Short URL (youtu.be)
        if (host === "youtu.be") {
            const id = u.pathname.slice(1);
            if (id) return { type: "video", videoId: id };
        }

        // Channel/playlist in path
        const pathMatch = u.pathname.match(
            /^\/playlist\?list=([a-zA-Z0-9_-]+)/,
        );
        if (pathMatch) return { type: "playlist", playlistId: pathMatch[1] };

        return null;
    } catch {
        return null;
    }
}

/**
 * Convert ISO 8601 duration (PT4M32S, PT1H2M3S) to "4:32" or "1:02:03"
 */
function formatDuration(iso) {
    if (!iso) return "0:00";
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "0:00";
    const h = parseInt(match[1] || 0);
    const m = parseInt(match[2] || 0);
    const s = parseInt(match[3] || 0);
    if (h > 0) {
        return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Fetch video details (snippet + contentDetails) for a batch of videoIds.
 */
async function fetchVideoDetails(videoIds) {
    const results = [];
    // API allows max 50 IDs per request
    for (let i = 0; i < videoIds.length; i += 50) {
        const batch = videoIds.slice(i, i + 50);
        const res = await fetch(
            `${BASE}/videos?part=snippet,contentDetails&id=${batch.join(",")}&key=${API_KEY}`,
        );
        if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
        const data = await res.json();
        results.push(...data.items);
    }
    return results;
}

/**
 * Fetch all items from a playlist (handles pagination).
 */
async function fetchAllPlaylistItems(playlistId, onProgress) {
    const items = [];
    let pageToken = "";
    let page = 0;

    do {
        const url = `${BASE}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ""}`;
        const res = await fetch(url);
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(
                err?.error?.message || `YouTube API error: ${res.status}`,
            );
        }
        const data = await res.json();
        items.push(...data.items);
        pageToken = data.nextPageToken || "";
        page++;
        if (onProgress)
            onProgress({
                phase: "fetching",
                fetched: items.length,
                total: data.pageInfo?.totalResults || items.length,
            });
    } while (pageToken);

    return items;
}

/**
 * Fetch playlist metadata (title, channel, thumbnail).
 */
async function fetchPlaylistMeta(playlistId) {
    const res = await fetch(
        `${BASE}/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`,
    );
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
    const data = await res.json();
    if (!data.items?.length) throw new Error("Playlist not found");
    const snippet = data.items[0].snippet;
    return {
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        thumbnail:
            snippet.thumbnails?.maxres?.url ||
            snippet.thumbnails?.high?.url ||
            snippet.thumbnails?.medium?.url ||
            "",
        description: snippet.description,
    };
}

/**
 * Fetch a full playlist and return structured course data.
 */
export async function fetchPlaylistCourse(playlistId, onProgress) {
    // 1. Get playlist metadata
    onProgress?.({
        phase: "metadata",
        message: "Fetching playlist info...",
        pct: 5,
    });
    const meta = await fetchPlaylistMeta(playlistId);

    // 2. Get all playlist items
    onProgress?.({
        phase: "fetching",
        message: "Fetching video list...",
        pct: 15,
    });
    const playlistItems = await fetchAllPlaylistItems(playlistId, (p) => {
        const pct = 15 + Math.round((p.fetched / Math.max(p.total, 1)) * 35);
        onProgress?.({
            phase: "fetching",
            message: `Fetching videos... ${p.fetched}/${p.total}`,
            pct: Math.min(pct, 50),
        });
    });

    // Filter out deleted/private videos
    const validItems = playlistItems.filter(
        (item) =>
            item.snippet?.title !== "Private video" &&
            item.snippet?.title !== "Deleted video" &&
            item.snippet?.resourceId?.videoId,
    );

    // 3. Get video details (durations)
    onProgress?.({
        phase: "details",
        message: "Fetching video details...",
        pct: 55,
    });
    const videoIds = validItems.map((item) => item.snippet.resourceId.videoId);
    const videoDetails = await fetchVideoDetails(videoIds);

    // Build a map of videoId -> details
    const detailsMap = {};
    videoDetails.forEach((v) => {
        detailsMap[v.id] = v;
    });

    onProgress?.({
        phase: "structuring",
        message: "Structuring course...",
        pct: 80,
    });

    // 4. Build lessons
    const lessons = validItems.map((item, idx) => {
        const videoId = item.snippet.resourceId.videoId;
        const details = detailsMap[videoId];
        return {
            id: idx + 1,
            title: item.snippet.title,
            duration: details
                ? formatDuration(details.contentDetails?.duration)
                : "0:00",
            type: "video",
            url: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail:
                item.snippet.thumbnails?.medium?.url ||
                item.snippet.thumbnails?.default?.url ||
                "",
        };
    });

    // 5. Group into sections (chunks of ~10 videos, or by natural grouping)
    const CHUNK_SIZE = 10;
    const sections = [];
    for (let i = 0; i < lessons.length; i += CHUNK_SIZE) {
        const chunk = lessons.slice(i, i + CHUNK_SIZE);
        const sectionNum = Math.floor(i / CHUNK_SIZE) + 1;
        sections.push({
            id: sectionNum,
            title:
                lessons.length <= CHUNK_SIZE
                    ? meta.title
                    : `Part ${sectionNum}: Videos ${i + 1}–${Math.min(i + CHUNK_SIZE, lessons.length)}`,
            lessons: chunk,
        });
    }

    onProgress?.({
        phase: "done",
        message: "Course ready!",
        pct: 100,
    });

    return {
        title: meta.title,
        author: meta.channelTitle,
        thumbnail: meta.thumbnail,
        description: meta.description,
        totalLessons: lessons.length,
        sections,
    };
}

/**
 * Fetch a single video and return it as a mini course.
 */
export async function fetchSingleVideoCourse(videoId, onProgress) {
    onProgress?.({
        phase: "fetching",
        message: "Fetching video info...",
        pct: 30,
    });

    const details = await fetchVideoDetails([videoId]);
    if (!details.length) throw new Error("Video not found");

    const video = details[0];
    const snippet = video.snippet;

    onProgress?.({
        phase: "done",
        message: "Course ready!",
        pct: 100,
    });

    return {
        title: snippet.title,
        author: snippet.channelTitle,
        thumbnail:
            snippet.thumbnails?.maxres?.url ||
            snippet.thumbnails?.high?.url ||
            snippet.thumbnails?.medium?.url ||
            "",
        description: snippet.description,
        totalLessons: 1,
        sections: [
            {
                id: 1,
                title: snippet.title,
                lessons: [
                    {
                        id: 1,
                        title: snippet.title,
                        duration: formatDuration(
                            video.contentDetails?.duration,
                        ),
                        type: "video",
                        url: `https://www.youtube.com/watch?v=${videoId}`,
                        thumbnail:
                            snippet.thumbnails?.medium?.url || "",
                    },
                ],
            },
        ],
    };
}

/**
 * Main entry: auto-detect URL type and fetch course data.
 */
export async function fetchCourseFromUrl(url, onProgress) {
    const parsed = parseYouTubeUrl(url);
    if (!parsed) throw new Error("Invalid YouTube URL. Please provide a valid YouTube video or playlist link.");

    if (parsed.type === "playlist") {
        return fetchPlaylistCourse(parsed.playlistId, onProgress);
    } else {
        return fetchSingleVideoCourse(parsed.videoId, onProgress);
    }
}
