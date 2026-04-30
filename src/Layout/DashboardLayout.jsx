import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/SideNav";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-[300px] min-h-screen overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
