import {AppBar, Breadcrumbs, Link, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink, useMatches} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.css';

function Header() {
    const matches = useMatches();
    const crumbs = matches
        .filter(match => match.handle?.crumb)
        .map(match => ({ crumb: match.handle.crumb, href: match.pathname }));

    return (
        <AppBar className="header" position="static" color="#fff" variant="outlined">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ mr: 4}}>
                    <Link href="/" underline="none" color="inherit">
                        Phone Buyer
                    </Link>
                </Typography>
                <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
                    {crumbs.map((c, i) =>
                        i < crumbs.length - 1 ? (
                            <Link key={c.href} component={RouterLink} to={c.href} color="inherit" underline="hover">
                                {c.crumb}
                            </Link>
                        ) : (
                            <Typography key={c.href} color="text.primary">
                                {c.crumb}
                            </Typography>
                        )
                    )}
                </Breadcrumbs>
                <ShoppingCartIcon />
                <Typography>Cart</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;