import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { CourseProvider } from "./store/courseStore.jsx";
import { UserProvider } from "./store/userStore.jsx";

function App() {
    return (
        <UserProvider>
            <CourseProvider>
                <RouterProvider router={router} />
            </CourseProvider>
        </UserProvider>
    );
}

export default App;
