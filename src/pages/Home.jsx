import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Home() {
    return (
        <Link component={RouterLink} to="/products" color="inherit">
            View product catalog
        </Link>
    )
}

export default Home;