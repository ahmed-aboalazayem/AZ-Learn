import { useState } from "react";

export default function Settings() {
    const [activeTab, setActiveTab] = useState("Profile");

    // Profile form states
    const [firstName, setFirstName] = useState("Alex");
    const [lastName, setLastName] = useState("Johnson");
    const [email, setEmail] = useState("alex.johnson@example.com");
    const [bio, setBio] = useState("");

    // Password states
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSaveProfile = (e) => {
        e.preventDefault();
        alert("Profile changes saved successfully!");
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        alert("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="p-8 w-full max-w-container_max_width mx-auto font-['Plus_Jakarta_Sans']">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="font-h1 text-h1 text-on-surface mb-2">Settings</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                    Manage your account preferences and security settings.
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-8 border-b border-outline-variant mb-8 overflow-x-auto no-scrollbar select-none">
                {["Profile", "Notifications", "Appearance", "Security"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 font-label-md text-label-md cursor-pointer transition-all border-none bg-transparent ${
                            activeTab === tab 
                                ? "text-primary border-b-2 border-primary border-solid font-bold" 
                                : "text-on-surface-variant hover:text-on-surface font-semibold"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Settings Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column / Main Form Area */}
                <div className="lg:col-span-2">
                    {activeTab === "Profile" && (
                        <form onSubmit={handleSaveProfile} className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-surface-container-highest p-8 space-y-8">
                            <h2 className="font-h3 text-h3 text-on-surface">Personal Information</h2>
                            
                            {/* Avatar Upload */}
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-outline-variant bg-surface-container flex-shrink-0">
                                    <img 
                                        alt="Current Avatar" 
                                        className="w-full h-full object-cover" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuASWI6xF7t4wSDBcXWozYtwo8m2rfDvcaM_mJSXZDRemDl6GNI2duf9wHUTdAZOALt9MCldwmlT-Zx9v4ecGo2D2kh7SlC7CNf7g-webg2jzBkpRWdruRXtOf1WHwAnbTmMIONa7ySLE2Lvz-as7_p6BzMypLOcdijxgJ5vzzkT3iv3GUuVPM95sPkmWK6fHNBAuj717ejct8cPAVrxcWOp-OuJ6XTqzxokD6XP0LyElyc_5ZJ4I_PzcVtFrCpnETTYbbmPFTbW4mDQ"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3">
                                        <button type="button" className="bg-surface-container-lowest border border-outline-variant text-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-sm cursor-pointer font-semibold">
                                            Upload New
                                        </button>
                                        <button type="button" className="px-4 py-2 rounded-lg font-label-md text-label-md text-error hover:bg-error-container transition-colors cursor-pointer border-none bg-transparent font-semibold">
                                            Remove
                                        </button>
                                    </div>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                                        Recommended size: 256x256px. Max 2MB.
                                    </p>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-label-md text-label-md text-on-surface block" htmlFor="firstName">First Name</label>
                                        <input 
                                            className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
                                            id="firstName" 
                                            type="text" 
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-label-md text-label-md text-on-surface block" htmlFor="lastName">Last Name</label>
                                        <input 
                                            className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
                                            id="lastName" 
                                            type="text" 
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-label-md text-on-surface block" htmlFor="email">Email Address</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                                        <input 
                                            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
                                            id="email" 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label-md text-label-md text-on-surface block" htmlFor="bio">
                                        Bio <span className="text-outline font-normal">(Optional)</span>
                                    </label>
                                    <textarea 
                                        className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm resize-none" 
                                        id="bio" 
                                        placeholder="Tell us a little about yourself..." 
                                        rows="3"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button type="submit" className="bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white px-6 py-2.5 rounded-lg font-label-md text-label-md shadow-md hover:shadow-lg transition-all border-none cursor-pointer font-semibold">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === "Notifications" && (
                        <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-surface-container-highest p-8 space-y-6">
                            <h2 className="font-h3 text-h3 text-on-surface">Notification Settings</h2>
                            <p className="text-on-surface-variant text-sm">Choose what notifications you receive and when.</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-surface-variant">
                                    <div>
                                        <p className="font-semibold text-on-surface text-sm">Course Completion Updates</p>
                                        <p className="text-xs text-on-surface-variant">Get notified when you finish a course syllabus.</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary h-5 w-5 cursor-pointer" />
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-surface-variant">
                                    <div>
                                        <p className="font-semibold text-on-surface text-sm">Weekly Activity Recap</p>
                                        <p className="text-xs text-on-surface-variant">Get an email summary of your study streaks and points earned.</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary h-5 w-5 cursor-pointer" />
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <div>
                                        <p className="font-semibold text-on-surface text-sm">Leaderboard Ranking Changes</p>
                                        <p className="text-xs text-on-surface-variant">Receive alerts if another learner moves ahead of you.</p>
                                    </div>
                                    <input type="checkbox" className="rounded text-primary focus:ring-primary h-5 w-5 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Appearance" && (
                        <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-surface-container-highest p-8 space-y-6">
                            <h2 className="font-h3 text-h3 text-on-surface">Appearance Settings</h2>
                            <p className="text-on-surface-variant text-sm">Customize how AZ Learn looks on your device.</p>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="border border-primary rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer bg-primary-container/10">
                                    <span className="material-symbols-outlined text-3xl text-primary">light_mode</span>
                                    <span className="font-bold text-sm text-primary">Light Theme</span>
                                </div>
                                <div className="border border-outline-variant rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-3xl text-slate-500">dark_mode</span>
                                    <span className="font-semibold text-sm text-on-surface-variant">Dark Theme</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Security" && (
                        <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-surface-container-highest p-8 space-y-6">
                            <h2 className="font-h3 text-h3 text-on-surface">Security Preferences</h2>
                            <p className="text-on-surface-variant text-sm">Manage advanced account verification and logs.</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-surface-variant">
                                    <div>
                                        <p className="font-semibold text-on-surface text-sm">Two-Factor Authentication (2FA)</p>
                                        <p className="text-xs text-on-surface-variant">Secure your profile with SMS or authenticator codes.</p>
                                    </div>
                                    <button className="px-4 py-1.5 border border-outline-variant rounded-lg text-xs font-bold hover:bg-slate-50 cursor-pointer bg-white">
                                        Configure
                                    </button>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <div>
                                        <p className="font-semibold text-on-surface text-sm">Connected OAuth Accounts</p>
                                        <p className="text-xs text-on-surface-variant">Google Account is currently connected.</p>
                                    </div>
                                    <span className="text-xs bg-green-50 border border-green-200 text-green-700 font-bold px-2 py-1 rounded-full">
                                        Connected
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Security / Quick Actions */}
                <div className="space-y-8">
                    {/* Password Security Card */}
                    <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-surface-container-highest p-8 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6C63FF] rounded-full blur-[60px] opacity-10 pointer-events-none"></div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-primary">lock</span>
                            <h2 className="font-h3 text-h3 text-on-surface">Password</h2>
                        </div>
                        <form onSubmit={handleUpdatePassword} className="space-y-5">
                            <div className="space-y-2">
                                <label className="font-label-md text-label-md text-on-surface block" htmlFor="currentPassword">Current Password</label>
                                <input 
                                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
                                    id="currentPassword" 
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-label-md text-label-md text-on-surface block" htmlFor="newPassword">New Password</label>
                                <input 
                                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
                                    id="newPassword" 
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-label-md text-label-md text-on-surface block" htmlFor="confirmPassword">Confirm New Password</label>
                                <input 
                                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
                                    id="confirmPassword" 
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="w-full mt-4 bg-surface-container-lowest border border-outline-variant text-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-sm cursor-pointer font-semibold" type="submit">
                                Update Password
                            </button>
                        </form>
                    </section>

                    {/* Session Management */}
                    <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-surface-container-highest p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-label-md text-label-md text-on-surface mb-1">Active Sessions</h3>
                                <p className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                                    Manage devices logged into your account.
                                </p>
                            </div>
                            <span className="material-symbols-outlined text-outline">devices</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-surface-container-highest pt-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-[20px]">computer</span>
                                <div>
                                    <p className="font-label-sm text-label-sm text-on-surface">MacBook Pro (Current)</p>
                                    <p className="text-[10px] text-outline">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
