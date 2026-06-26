import { useState } from "react";

export default function Leaderboard() {
    const [timeframe, setTimeframe] = useState("weekly");

    return (
        <div className="p-8 max-w-container_max_width mx-auto flex flex-col gap-8 w-full font-['Plus_Jakarta_Sans']">
            {/* Header & Toggles */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="font-h1 text-h1 text-on-surface">Leaderboard</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                        See how you rank among other learners this week.
                    </p>
                </div>
                <div className="flex bg-surface-container-highest p-1 rounded-lg select-none">
                    <button 
                        onClick={() => setTimeframe("weekly")}
                        className={`px-6 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer border-none ${
                            timeframe === "weekly" 
                                ? "bg-white text-primary shadow-sm" 
                                : "text-on-surface-variant hover:text-on-surface bg-transparent"
                        }`}
                    >
                        Weekly
                    </button>
                    <button 
                        onClick={() => setTimeframe("all-time")}
                        className={`px-6 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer border-none ${
                            timeframe === "all-time" 
                                ? "bg-white text-primary shadow-sm" 
                                : "text-on-surface-variant hover:text-on-surface bg-transparent"
                        }`}
                    >
                        All-time
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Top 3 & List */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Top 3 Podium (Bento Style) */}
                    <div className="grid grid-cols-3 gap-4 items-end h-64 mb-12">
                        {/* Rank 2 */}
                        <div className="bg-surface-container-lowest rounded-2xl p-4 flex flex-col items-center justify-center text-center soft-shadow relative h-[85%] border-t-4 border-slate-300">
                            <div className="absolute -top-6 bg-slate-100 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-slate-200">
                                2
                            </div>
                            <img 
                                alt="Rank 2" 
                                className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-slate-200" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxOhhH4PS0qSymvCm1lxglK8j0_fm1HB8ix1tDN57O14W5faP4oyUg_kDZggK-Mev3Bhl7-d-qbYiXcMpG7FZ_4t2y1mzGTaYrjrnQb_7pu0XX-ia8qu3HZJm8iNE60ngnoyqpaMR3BUY0M9Nes6Wly-qI_qKqERUVsg3raSmEFeg0NzcEfnR4rnqhGimAUTRydJvY2NtJjGvfB5PTNsjGr6OBuK3ln0ZElsXkanbmykyTH3kGrUJOGj1qUTawF3qw2NQANl50XIB-"
                            />
                            <h3 className="font-label-md text-label-md text-on-surface">Marcus L.</h3>
                            <p className="text-xs text-primary font-bold mt-1">12,450 XP</p>
                            <div className="mt-2 text-xs text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">play_circle</span> 42 Videos
                            </div>
                        </div>

                        {/* Rank 1 */}
                        <div className="bg-gradient-to-b from-primary-container/10 to-surface-container-lowest rounded-2xl p-4 flex flex-col items-center justify-center text-center soft-shadow relative h-full border-t-4 border-tertiary-container ai-glow z-10">
                            <div className="absolute -top-6 bg-tertiary-container text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md border-2 border-white">
                                1
                            </div>
                            <img 
                                alt="Rank 1" 
                                className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-tertiary-container shadow-sm" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm433yocEu2pdnBLOwzCq76SmZ9IaulqjER9GSfn8rmXLicknbdEYguVKcD0ZxAU5AICdNEbc7mZhtrurryY1PxxtkmeXeJCjrgqMqaCajE6iifWu20w-AvzCLdFevcBwQH3thyKH0uLvNcBPru0SDN9tqtwRuAh0fTzBAR2P-jyNaDGDAQfEC2PP7FqAc1Exy_DwSa5UEFPna0sKc7BDqtCb4au2vCDPBK5rfUAJJU5PcxYkM0871OZoEP6tAXAUIFayJgoasPZYM"
                            />
                            <h3 className="font-h3 text-h3 text-on-surface text-lg">Sarah J.</h3>
                            <p className="text-sm text-primary font-bold mt-1">15,200 XP</p>
                            <div className="mt-2 text-xs text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">play_circle</span> 56 Videos
                            </div>
                            <div className="mt-3 flex gap-1 select-none">
                                <span className="text-lg" title="Fast Learner">🚀</span>
                                <span className="text-lg" title="Perfect Score">🎯</span>
                            </div>
                        </div>

                        {/* Rank 3 */}
                        <div className="bg-surface-container-lowest rounded-2xl p-4 flex flex-col items-center justify-center text-center soft-shadow relative h-[75%] border-t-4 border-[#CD7F32]">
                            <div className="absolute -top-6 bg-[#CD7F32]/20 text-[#CD7F32] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-[#CD7F32]/30">
                                3
                            </div>
                            <img 
                                alt="Rank 3" 
                                className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-[#CD7F32]/30" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2_-5caJ_XHnVqzrpEE2DVs-CN0tLOMYGcurI4UbO6iDK7XC5gGbWf86U2-FdlbaGTTISHQm-3Ra-iDGJWHbL6gpQTa_BwjIO-x3zADmKKnhczSawY5j77S54jleaHTUzz4zh5D54M-sexqFtJCDsLPyrGfTa1k6T4ssV0VjXVwVBu8tzrAC6xu9i00oUiXFAf5zFnqJHuQUvG0O4esDyyvfFkMQd__39muFJ8E-wcREPMz50eiLzHw99f-1gsYVsDVUVjwiYozpIP"
                            />
                            <h3 className="font-label-md text-label-md text-on-surface">David C.</h3>
                            <p className="text-xs text-primary font-bold mt-1">11,100 XP</p>
                            <div className="mt-2 text-xs text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">play_circle</span> 38 Videos
                            </div>
                        </div>
                    </div>

                    {/* Ranked List */}
                    <div className="bg-surface-container-lowest rounded-2xl soft-shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-surface-variant flex text-xs font-semibold text-on-surface-variant uppercase tracking-wider select-none">
                            <div className="w-12 text-center">Rank</div>
                            <div className="flex-1">Learner</div>
                            <div className="w-24 text-right hidden sm:block">Videos</div>
                            <div className="w-24 text-right">XP</div>
                        </div>
                        <div className="divide-y divide-surface-variant">
                            {/* Row 4 */}
                            <div className="flex items-center px-6 py-4 hover:bg-surface-container-low transition-colors">
                                <div className="w-12 text-center font-bold text-on-surface-variant">4</div>
                                <div className="flex-1 flex items-center gap-3">
                                    <img 
                                        alt="Avatar" 
                                        className="w-10 h-10 rounded-full object-cover" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhlfReGKInCPyeNdglfoIdHpyoFDwFNHYLFmnmY0XRngHaFjYtUv4ue931oR91ztVdobZ8KZybzChaqJylf9cV0Oy4oasHHBl0O7NbtARzc4I2iZooywSIk5VU9S9u11WqQaNOKU30TxkSyjifK3Ew5R_9_JKWmTsXTW-5XVB9zTyZUrP3yexXtv7pzXU3-9mLTPATr2RRkqMmjTAZHdyF0v2ENIA4djiFpIjMxUneCkfTeS9qB7CV2n8LLa2Q6kIfOAMRV9jJxrWk"
                                    />
                                    <div>
                                        <div className="font-label-md text-label-md text-on-surface">Elena R.</div>
                                        <div className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5 font-medium">
                                            <span className="material-symbols-outlined text-[12px]">workspace_premium</span> Pro Member
                                        </div>
                                    </div>
                                </div>
                                <div className="w-24 text-right hidden sm:block text-sm text-on-surface-variant">35</div>
                                <div className="w-24 text-right font-semibold text-primary">10,400</div>
                            </div>

                            {/* Row 5 (Current User - Highlighted) */}
                            <div className="flex items-center px-6 py-4 bg-primary-container/5 border-l-4 border-primary relative ai-glow">
                                <div className="w-12 text-center font-bold text-primary">5</div>
                                <div className="flex-1 flex items-center gap-3">
                                    <img 
                                        alt="Your Avatar" 
                                        className="w-10 h-10 rounded-full object-cover border-2 border-primary" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZb3AlbYZZee_xef2PXxE6jecrAAsvrpOUwoT_lJ1Kga28ZZnzWKbOfiPxyCJn4z4eHT3Fpz2RGIRHw5Wc1v_Vlhy6IpRHXM6JC1xNzzpaVEJtZOBclNnpmonkgXYC_BQd4TvgevAnhlkhZF4f58l6pwTOV8XS4rHEIavuhx3N7UrkHRN0RxDJcqcR1MpUa_cAMOXFPDKZXUllVt7j8OZ8gIg1-WUpGmFOOGnE7F4sgnJRy65vigNK9LNuuocoiBx5W3kUnymYFVBQ"
                                    />
                                    <div>
                                        <div className="font-label-md text-label-md text-on-surface font-bold">You</div>
                                        <div className="text-xs text-primary flex items-center gap-1 mt-0.5 font-semibold">
                                            <span className="material-symbols-outlined text-[12px]">trending_up</span> Moving up!
                                        </div>
                                    </div>
                                </div>
                                <div className="w-24 text-right hidden sm:block text-sm text-on-surface-variant">32</div>
                                <div className="w-24 text-right font-bold text-primary">9,850</div>
                            </div>

                            {/* Row 6 */}
                            <div className="flex items-center px-6 py-4 hover:bg-surface-container-low transition-colors">
                                <div className="w-12 text-center font-bold text-on-surface-variant">6</div>
                                <div className="flex-1 flex items-center gap-3">
                                    <img 
                                        alt="Avatar" 
                                        className="w-10 h-10 rounded-full object-cover" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWVaWaTPWf6zf6HpuNXx7ymqPZP1vomkOFMvZxDP3-DY5wlaIt2rZjeASKPvpiiDRSQDVK6-xPnumWmphwopeTORGTozCqLTYprBHV99zgD4Z6k0K8wXnv_6BaGXK_dGqlFAQG6hXyZhDN1TzuZajtUguVjkpmhcPGTJ1Xrk9Rb0Jyn6CF1pTgLJUu4DN-6f5mPlRjzSm_OrBPewOyMzjdp7fMpD6xCKKd5yIwoXBs_jqWOxF38YRLdUBz9-ALGu9sJcWcYG1VbVNH"
                                    />
                                    <div className="font-label-md text-label-md text-on-surface">Alex K.</div>
                                </div>
                                <div className="w-24 text-right hidden sm:block text-sm text-on-surface-variant">28</div>
                                <div className="w-24 text-right font-semibold text-primary">8,900</div>
                            </div>

                            {/* Row 7 */}
                            <div className="flex items-center px-6 py-4 hover:bg-surface-container-low transition-colors">
                                <div className="w-12 text-center font-bold text-on-surface-variant">7</div>
                                <div className="flex-1 flex items-center gap-3">
                                    <img 
                                        alt="Avatar" 
                                        className="w-10 h-10 rounded-full object-cover" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE_LrM5GUO90dDdq83q_8n1oLZv-01DRK5VD4now1FrnaVqkmjwGnV8Lon7rrV439cMHZmuD63a4OdTxHD2DDzG32WQPYKaemZHPmO-7zMCTDCOK77JXFnbk6XT3v9-CxTBSTwJiAxb9SIPiNAeBKt0wl4FYJQbx6mSwxmd2f7zvS9ZBXGWeM6TdA3hrNqwK_XhBhmJeQlXUC0u8ZEZwIVO1NgpfTmE96QSqiQ7KMabzood6WHp6KuT3uicCocJJu0KVcy2Ff6Bgmz"
                                    />
                                    <div className="font-label-md text-label-md text-on-surface">Maria G.</div>
                                </div>
                                <div className="w-24 text-right hidden sm:block text-sm text-on-surface-variant">25</div>
                                <div className="w-24 text-right font-semibold text-primary">8,100</div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-surface-variant text-center">
                            <button className="text-sm font-semibold text-primary hover:text-primary-container transition-colors border-none bg-transparent cursor-pointer">
                                Load More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Personal Stats */}
                <div className="space-y-6">
                    {/* Stats Card */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 soft-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="bg-primary-fixed text-on-primary-fixed text-xs px-2 py-1 rounded-full flex items-center gap-1 ai-glow font-medium select-none">
                                ✨ AI Insights
                            </span>
                        </div>
                        <h3 className="font-h3 text-h3 text-on-surface mb-6 text-lg">Your Performance</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                                    <span className="material-symbols-outlined">military_tech</span>
                                </div>
                                <div>
                                    <p className="text-xs text-on-surface-variant">Current Rank</p>
                                    <p className="font-h2 text-h2 text-on-surface text-2xl">5th</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center">
                                    <span className="material-symbols-outlined">bolt</span>
                                </div>
                                <div>
                                    <p className="text-xs text-on-surface-variant">Weekly XP</p>
                                    <p className="font-h2 text-h2 text-on-surface text-2xl">9,850</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-surface-variant">
                                <p className="text-sm text-on-surface-variant mb-2">Distance to Rank 4</p>
                                <div className="w-full bg-surface-variant rounded-full h-2 mb-1">
                                    <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: "85%" }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-on-surface-variant">
                                    <span>550 XP needed</span>
                                    <span>85%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Badges Card */}
                    <div className="bg-surface-container-lowest rounded-2xl p-6 soft-shadow">
                        <h3 className="font-label-md text-label-md text-on-surface mb-4 uppercase tracking-wider">
                            Recent Badges
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="aspect-square bg-surface-container-low rounded-xl border border-surface-variant flex flex-col items-center justify-center p-2 text-center hover:bg-surface-container transition-colors cursor-pointer select-none">
                                <span className="text-2xl mb-1">🔥</span>
                                <span className="text-[10px] text-on-surface-variant leading-tight font-semibold">7 Day Streak</span>
                            </div>
                            <div className="aspect-square bg-surface-container-low rounded-xl border border-surface-variant flex flex-col items-center justify-center p-2 text-center hover:bg-surface-container transition-colors cursor-pointer select-none">
                                <span className="text-2xl mb-1">📚</span>
                                <span className="text-[10px] text-on-surface-variant leading-tight font-semibold">Bookworm</span>
                            </div>
                            <div className="aspect-square bg-surface-container-low rounded-xl border border-surface-variant flex flex-col items-center justify-center p-2 text-center hover:bg-surface-container transition-colors cursor-pointer opacity-50 grayscale select-none">
                                <span className="text-2xl mb-1">🏆</span>
                                <span className="text-[10px] text-on-surface-variant leading-tight font-semibold">Top 3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
