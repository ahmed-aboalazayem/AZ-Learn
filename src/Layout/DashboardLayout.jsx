import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/SideNav";
import Header from "../components/Header";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex bg-surface-container-low text-on-surface">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-[280px] min-h-screen">
                <Header />
                <main className="flex-1 pt-16 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
