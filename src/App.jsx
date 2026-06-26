import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { CourseProvider } from "./store/courseStore.jsx";

function App() {
    return (
        <CourseProvider>
            <RouterProvider router={router} />
        </CourseProvider>
    );
}

export default App;
