import MainLayout from "./layout/MainLayout.jsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import ProductList from "./pages/ProductList.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        handle: { crumb: "Home" },
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/products" replace /> },
            { path: "products", handle: { crumb: "Products" }, element: <ProductList /> },
            { path: "products/:id", handle: { crumb: "Product Detail" }, element: <ProductDetail />, },
            { path: "*", handle: { crumb: "Not Found" }, element: <NotFound /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
