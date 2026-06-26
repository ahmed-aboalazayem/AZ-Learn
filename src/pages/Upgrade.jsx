import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upgrade() {
    const navigate = useNavigate();
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        {
            name: "Basic",
            price: { monthly: 0, annual: 0 },
            features: [
                "2 AI course generations per month",
                "Basic video summarization",
                "Static quizzes (no AI mentor review)",
                "Standard community access"
            ],
            cta: "Current Plan",
            current: true
        },
        {
            name: "Pro",
            price: { monthly: 15, annual: 12 },
            features: [
                "Unlimited AI course generations",
                "In-depth transcript analysis & summaries",
                "Interactive AI Mentor chat support",
                "Custom quizzes with performance scoring",
                "Ad-free learning player interface",
                "Export notes to Markdown/Notion"
            ],
            cta: "Upgrade to Pro",
            popular: true,
            gradient: "from-violet-500 to-blue-500"
        },
        {
            name: "Team",
            price: { monthly: 39, annual: 30 },
            features: [
                "Everything in Pro",
                "Dedicated organization control portal",
                "Shared team playlist workspaces",
                "Team leaderboard and analytics reports",
                "Priority API access quota"
            ],
            cta: "Contact Sales",
            outline: true
        }
    ];

    const handleUpgradeSubmit = (e) => {
        e.preventDefault();
        alert("Thank you! Payment successful. You are now upgraded!");
        setSelectedPlan(null);
        navigate("/dashboard");
    };

    return (
        <div className="p-8 w-full max-w-[1100px] mx-auto flex flex-col gap-10 font-['Plus_Jakarta_Sans'] text-on-surface">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container/50 text-primary border border-secondary-container rounded-full text-[12px] font-bold tracking-wide select-none">
                    🚀 AZ LEARN PREMIUM
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Upgrade Your Learning Potential</h1>
                <p className="text-on-surface-variant text-base max-w-xl mx-auto">
                    Unlock unlimited AI course generation, custom quizzes, and continuous learning streaks.
                </p>

                {/* Toggle monthly / annual */}
                <div className="flex items-center justify-center gap-3 pt-2">
                    <span className={`text-xs font-bold ${billingCycle === "monthly" ? "text-primary" : "text-on-surface-variant"}`}>Monthly</span>
                    <button 
                        onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                        className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-800 p-0.5 transition-colors relative cursor-pointer border-none"
                    >
                        <div className={`w-5 h-5 rounded-full bg-primary transition-all shadow ${billingCycle === "annual" ? "ml-6" : "ml-0"}`}></div>
                    </button>
                    <span className={`text-xs font-bold ${billingCycle === "annual" ? "text-primary" : "text-on-surface-variant"} flex items-center gap-1.5`}>
                        Yearly <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-extrabold uppercase">Save 20%</span>
                    </span>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {plans.map((plan) => (
                    <div 
                        key={plan.name}
                        className={`bg-surface-container-lowest border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                            plan.popular 
                                ? "border-primary shadow-lg ring-2 ring-primary/10 relative -translate-y-1 md:-translate-y-2 ai-glow" 
                                : "border-outline-variant hover:shadow-md"
                        }`}
                    >
                        {plan.popular && (
                            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                                Most Popular
                            </span>
                        )}

                        <div className="space-y-6">
                            {/* Plan Header */}
                            <div>
                                <h3 className="text-xl font-extrabold">{plan.name}</h3>
                                <div className="mt-4 flex items-baseline gap-1 select-none">
                                    <span className="text-3xl font-extrabold">$</span>
                                    <span className="text-5xl font-extrabold">
                                        {billingCycle === "monthly" ? plan.price.monthly : plan.price.annual}
                                    </span>
                                    <span className="text-on-surface-variant text-xs font-semibold">/ month</span>
                                </div>
                                {billingCycle === "annual" && plan.price.annual > 0 && (
                                    <p className="text-[10px] text-green-600 font-bold mt-1">Billed annually</p>
                                )}
                            </div>

                            {/* Plan Divider */}
                            <div className="h-px bg-outline-variant w-full"></div>

                            {/* Features list */}
                            <ul className="space-y-3.5 text-xs text-on-surface-variant">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex gap-2.5 items-start">
                                        <span className="material-symbols-outlined text-green-500 text-sm font-bold mt-0.5 select-none">
                                            check_circle
                                        </span>
                                        <span className="leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-8 pt-4">
                            {plan.current ? (
                                <button 
                                    disabled
                                    className="w-full py-3 rounded-xl border border-outline-variant bg-surface-container text-on-surface-variant font-bold text-sm cursor-not-allowed select-none"
                                >
                                    {plan.cta}
                                </button>
                            ) : plan.gradient ? (
                                <button 
                                    onClick={() => setSelectedPlan(plan)}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-bold text-sm hover:shadow-lg transition-all border-none cursor-pointer"
                                >
                                    {plan.cta}
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setSelectedPlan(plan)}
                                    className="w-full py-3 rounded-xl border border-outline-variant hover:bg-slate-50 font-bold text-sm transition-all cursor-pointer bg-white"
                                >
                                    {plan.cta}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Simulated Payment Modal */}
            {selectedPlan && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
                            <div>
                                <h3 className="font-bold text-lg">Checkout Order</h3>
                                <p className="text-[11px] text-on-surface-variant">Activate {selectedPlan.name} Subscription</p>
                            </div>
                            <button 
                                onClick={() => setSelectedPlan(null)}
                                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleUpgradeSubmit} className="space-y-4 pt-4">
                            <div className="flex justify-between text-sm font-semibold select-none">
                                <span>Subscription Plan</span>
                                <span>{selectedPlan.name} ({billingCycle})</span>
                            </div>
                            <div className="flex justify-between text-lg font-extrabold border-t border-dashed border-outline-variant pt-3 select-none">
                                <span>Total Due</span>
                                <span className="text-primary">
                                    ${billingCycle === "monthly" ? selectedPlan.price.monthly : selectedPlan.price.annual * 12}
                                </span>
                            </div>

                            {/* Card inputs mockup */}
                            <div className="space-y-3 pt-2">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface" htmlFor="cardName">Name on Card</label>
                                    <input 
                                        type="text" 
                                        id="cardName" 
                                        className="w-full px-3 py-2 text-xs border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                                        placeholder="Ahmed Aly"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface" htmlFor="cardNumber">Card Number</label>
                                    <input 
                                        type="text" 
                                        id="cardNumber" 
                                        className="w-full px-3 py-2 text-xs border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                                        placeholder="4000 1234 5678 9010"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-on-surface" htmlFor="cardExpiry">Expiry Date</label>
                                        <input 
                                            type="text" 
                                            id="cardExpiry" 
                                            className="w-full px-3 py-2 text-xs border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                                            placeholder="MM/YY"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-on-surface" htmlFor="cardCvc">CVC</label>
                                        <input 
                                            type="text" 
                                            id="cardCvc" 
                                            className="w-full px-3 py-2 text-xs border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                                            placeholder="123"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-bold text-sm hover:shadow-lg transition-all border-none cursor-pointer flex justify-center items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">lock</span>
                                Pay &amp; Activate
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
