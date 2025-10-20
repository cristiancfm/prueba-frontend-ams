import {Outlet} from "react-router-dom";
import {Box, Container} from "@mui/material";
import Header from "../components/Header.jsx";

function MainLayout() {
    return (
        <div className="App">
            <Header />
            <Container sx={{ flex: 1, py: 4 }}>
                <Outlet />
            </Container>
        </div>
    );
}

export default MainLayout;