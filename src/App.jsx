import './App.css'
import MainLayout from "./layout/MainLayout.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductList from "./pages/ProductList.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        handle: { crumb: "Home" },
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "products", handle: { crumb: "Products" }, element: <ProductList /> },
            { path: "*", handle: { crumb: "Not Found" }, element: <NotFound /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
