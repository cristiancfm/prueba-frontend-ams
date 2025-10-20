import ProductCard from "../components/ProductCard.jsx";
import {useEffect, useState} from "react";
import * as productService from "../services/productService.js";
import {Typography, Grid, TextField, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function ProductList() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Get products on component mount
    useEffect(() => {
        getProducts();
    }, []);

    // Filter products when search term changes
    useEffect(() => {
        const handler = setTimeout(() => {
            if (!search) {
                setFilteredProducts(products);
            } else {
                const term = search.toLowerCase();
                const filtered = products.filter(p =>
                    p.brand.toLowerCase().includes(term) ||
                    p.model.toLowerCase().includes(term)
                );
                setFilteredProducts(filtered);
            }
        }, 300);

        // Clear timeout if search changes before 300ms
        return () => clearTimeout(handler);
    }, [search, products]);

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await productService.getProducts();
            setProducts(response);
            setFilteredProducts(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            { loading ?
                <Typography>Loading...</Typography>
                :
                <>
                    <Grid container justifyContent="end">
                        <Grid item>
                            <TextField
                                label="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            ></TextField>
                        </Grid>
                    </Grid>


                    <Grid container spacing={2} sx={{my: 2}}>
                        { filteredProducts.map((product) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))
                        }
                    </Grid>
                </>
            }
        </>
    )
}

export default ProductList;