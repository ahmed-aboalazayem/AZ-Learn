const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Generate clear and readable titles for course sections using OpenRouter AI.
 * 
 * @param {Array} sections - The sections array, where each section has an id, default title, and lessons.
 * @param {string} courseTitle - The course/playlist title.
 * @param {string} courseDescription - The course/playlist description.
 * @returns {Promise<Array<string>|null>} Array of generated titles, or null if it fails.
 */
export async function generateAiSectionTitles(sections, courseTitle, courseDescription) {
    if (!OPENROUTER_API_KEY) {
        console.warn("OpenRouter API key (VITE_OPENROUTER_API_KEY) not found in environment variables.");
        return null;
    }

    try {
        const sectionsData = sections.map((s, idx) => {
            const videoTitles = s.lessons.map(l => l.title);
            return {
                sectionIndex: idx + 1,
                videoTitles: videoTitles
            };
        });

        const prompt = `You are a professional educational curriculum designer.
I have a course/playlist titled "${courseTitle}".
Description: "${courseDescription || "N/A"}"

The course contains ${sections.length} sections. Here is the list of video titles in each section:

${sectionsData.map(s => `Section ${s.sectionIndex}:\n${s.videoTitles.map(t => `- ${t}`).join('\n')}`).join('\n\n')}

Your task is to generate a short, high-quality, descriptive, and professional title for EACH section that accurately reflects the topic/content of its videos (e.g., "Introduction & Setup", "Advanced Routing & Layouts", "State Management with Zustand", "Database Integration").
Guidelines:
1. Do NOT include section numbers, prefix words like "Section X:" or "Part X:".
2. Keep each title concise (typically 3 to 7 words).
3. Do NOT make up topics not in the video titles; summarize what is actually there.
4. Ensure the output is valid JSON, containing exactly ${sections.length} elements in a single array of strings.

Output format example:
[
  "Introduction & Project Setup",
  "Working with Components",
  "Authentication & Security"
]`;

        const response = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.origin || "http://localhost:5173",
                "X-Title": "AZ Learn"
            },
            body: JSON.stringify({
                model: "openrouter/free",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.1
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (!content) {
            throw new Error("Empty response from AI model.");
        }

        // Parse JSON output
        let cleanText = content.trim();
        if (cleanText.startsWith("```")) {
            cleanText = cleanText
                .replace(/^```json\s*/i, "")
                .replace(/^```\s*/, "")
                .replace(/\s*```$/, "");
        }

        const parsed = JSON.parse(cleanText);
        
        // Handle if LLM returned an object with an array property
        let titles = null;
        if (Array.isArray(parsed)) {
            titles = parsed;
        } else if (parsed && typeof parsed === "object") {
            const keys = Object.keys(parsed);
            for (const key of keys) {
                if (Array.isArray(parsed[key])) {
                    titles = parsed[key];
                    break;
                }
            }
        }

        if (titles && Array.isArray(titles) && titles.length === sections.length) {
            return titles.map(t => String(t).trim());
        }

        console.warn("AI returned titles that do not match the section count or format:", parsed);
        return null;
    } catch (error) {
        console.error("Failed to generate AI section titles:", error);
        return null;
    }
}

/**
 * Compare two or more courses based on their video topics and playlist details.
 * 
 * @param {Array} courses - Array of fetched course data structures.
 * @returns {Promise<string>} Markdown text representing the comparison and selection of the best course.
 */
export async function compareCoursesWithAi(courses) {
    if (!OPENROUTER_API_KEY) {
        console.warn("OpenRouter API key (VITE_OPENROUTER_API_KEY) not found in environment variables.");
        throw new Error("AI Comparison is unavailable because the OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in your settings or environment.");
    }

    try {
        const coursesDataString = courses.map((course, idx) => {
            const videoTitles = course.sections.flatMap(s => s.lessons.map(l => l.title));
            return `Course ${idx + 1}: "${course.title}"
Creator/Author: ${course.author || "Unknown"}
Description: ${course.description || "No description provided."}
Total Videos: ${course.totalLessons}
Topics (Video Titles):\n${videoTitles.map((t, index) => `${index + 1}. ${t}`).join('\n')}`;
        }).join('\n\n==================================\n\n');

        const prompt = `You are an expert learning consultant and technical curriculum designer.
I want to compare the following ${courses.length} courses to decide which one is better and more comprehensive for my learning goals.

Here are the detailed topics and video lists for each course:

${coursesDataString}

Please analyze and compare these courses thoroughly based on their video topics, coverage of key concepts, structure, and overall depth.
Provide a clear decision on which course is the better/best choice and explain why.

Your response must be in a beautiful, structured Markdown format. Use the following sections in your response:
1. 🏆 **Executive Summary & Verdict**: State clearly which course is chosen as the winner and a brief explanation why.
2. 📊 **Comparison Matrix**: A markdown table comparing key metrics (e.g. course title, creator, total lessons, content depth, structure clarity).
3. 🔍 **In-Depth Course Analysis**: Analyze each course individually (pros, cons, what it covers well, what it misses based on its topics).
4. 💡 **Recommendation by Learner Type**: Explain who should choose which course (e.g. "Choose Course A if you are an absolute beginner...", "Choose Course B if you want deep-dives into...").
5. 🗺️ **Suggested Study Plan**: A structured study plan combining the best parts of the courses or outlining the optimal path forward.

Guidelines:
- Keep the tone professional, objective, and encouraging.
- Use bold text, blockquotes, bullet lists, and tables to make the markdown extremely readable and visually appealing.
- Do not mention or reference the prompt guidelines themselves.`;

        const response = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.origin || "http://localhost:5173",
                "X-Title": "AZ Learn"
            },
            body: JSON.stringify({
                model: "openrouter/free",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (!content) {
            throw new Error("Empty response from AI model.");
        }

        return content;
    } catch (error) {
        console.error("Failed to compare courses with AI:", error);
        throw error;
    }
}
