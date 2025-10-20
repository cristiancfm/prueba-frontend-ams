import {AppBar, Breadcrumbs, Link, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink, useMatches} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.css';
import {useCart} from "../context/CartContext.jsx";
import {Badge, IconButton, Menu, MenuItem} from "@mui/material";
import {useState} from "react";

function Header() {
    const matches = useMatches();
    const crumbs = matches
        .filter(match => match.handle?.crumb)
        .map(match => ({ crumb: match.handle.crumb, href: match.pathname }));
    const { cartItems, updateCartItems } = useCart();

    // Cart menu state
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClearCart = () => {
        updateCartItems(0);
        handleClose();
    };

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

                <IconButton color="inherit" onClick={handleClick}>
                    <Badge badgeContent={cartItems} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem disabled>Items in Cart: {cartItems}</MenuItem>
                    {cartItems > 0 && <MenuItem onClick={handleClearCart}>Clear Cart</MenuItem>}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Header;