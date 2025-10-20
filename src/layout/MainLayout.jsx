import {Outlet} from "react-router-dom";
import {Box, Container} from "@mui/material";
import Header from "../components/Header.jsx";

function MainLayout() {
    return (
        <Box sx={{ display: "flex", height: "100vh", width:"100vw", flexDirection: "column", overflowX: "hidden" }}>
            <Header />
            <Container sx={{ flex: 1, py: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
}

export default MainLayout;