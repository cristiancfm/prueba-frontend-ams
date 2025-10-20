import {Outlet} from "react-router-dom";
import {Box, Container} from "@mui/material";
import Header from "../components/Header.jsx";

function MainLayout() {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", minWidth:"100vw", flexDirection: "column" }}>
            <Header />
            <Container sx={{ flex: 1, py: 4}}>
                <Outlet />
            </Container>
        </Box>
    );
}

export default MainLayout;