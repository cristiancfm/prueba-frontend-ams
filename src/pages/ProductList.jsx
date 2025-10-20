import ProductCard from "../components/ProductCard.jsx";
import {useEffect, useState} from "react";
import * as productService from "../services/productService.js";
import {Typography, Grid, TextField, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function ProductList() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await productService.getProducts();
            console.log(response);
            setProducts(response);
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
                        { products.map((product) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                                <ProductCard product={product} style={{ flex: 1 }} />
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