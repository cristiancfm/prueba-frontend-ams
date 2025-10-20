import { Button, Grid, Typography, Container, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as productService from "../services/productService.js";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function ProductDetail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [productColor, setProductColor] = useState("");
    const [productStorage, setProductStorage] = useState("");

    useEffect(() => {
        getProduct(id);
    }, []);

    const getProduct = async (id) => {
        setLoading(true);
        try {
            const response = await productService.getProduct(id);
            setProduct(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Button component={Link} to="/products" startIcon={<ArrowBackIcon />}>
                    Back
                </Button>
            </Grid>

            {
                loading ?
                    <Typography>Loading...</Typography>
                    :
                    <>
                        {
                            product &&
                            <>
                                <Grid size={{ xs: 12, md: 6}}>
                                    <Container>
                                        <img src={product.imgUrl} alt={`${product.brand} ${product.model}`}
                                             style={{ width: "100%" }} />
                                    </Container>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6}}>
                                    <Typography variant="h4">{product.brand} {product.model}</Typography>
                                    {product.price &&
                                        <Typography variant="h5" sx={{mb: 2}}>€ {product.price}</Typography>
                                    }

                                    {product.cpu && (
                                        <>
                                            <Typography variant="body1"><b>Processor</b></Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>{product.cpu}</Typography>
                                        </>
                                    )}

                                    {product.ram && (
                                        <>
                                            <Typography variant="body1"><b>Memory</b></Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>{product.ram}</Typography>
                                        </>
                                    )}

                                    {product.os && (
                                        <>
                                            <Typography variant="body1"><b>Operating System</b></Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>{product.os}</Typography>
                                        </>
                                    )}

                                    {product.displayResolution && (
                                        <>
                                            <Typography variant="body1"><b>Display</b></Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>{product.displayResolution}</Typography>
                                        </>
                                    )}

                                    {product.battery && (
                                        <>
                                            <Typography variant="body1"><b>Battery</b></Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>{product.battery}</Typography>
                                        </>
                                    )}

                                    {product.primaryCamera && (
                                        <>
                                            <Typography variant="body1"><b>Main Camera</b></Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {Array.isArray(product.primaryCamera)
                                                    ? product.primaryCamera.join(" ")
                                                    : product.primaryCamera}
                                            </Typography>
                                        </>
                                    )}

                                    {product.secondaryCmera && (
                                        <>
                                            <Typography variant="body1"><b>Secondary Camera</b></Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {Array.isArray(product.secondaryCmera)
                                                    ? product.secondaryCmera.join(" ")
                                                    : product.secondaryCmera}
                                            </Typography>
                                        </>
                                    )}

                                    {product.dimentions && (
                                        <Typography variant="body1">Dimensions: {product.dimentions}</Typography>
                                    )}

                                    {product.weight && (
                                        <Typography variant="body1">Weight: {product.weight} g</Typography>
                                    )}

                                    <hr/>

                                    <Typography variant="h6" sx={{ my: 2}}>Buying Options</Typography>

                                    <FormControl sx={{ minWidth: 200, mr: 2 }}>
                                        <InputLabel id="color-label">Color</InputLabel>
                                        <Select
                                            labelId="color-label"
                                            variant="outlined"
                                            value={productColor}
                                            label="Color"
                                            onChange={(e) => setProductColor(e.target.value)}
                                        >
                                            {product.options?.colors?.map((color) => (
                                                <MenuItem key={color.code} value={color.code}>
                                                    {color.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{ minWidth: 200 }}>
                                        <InputLabel id="storage-label">Storage</InputLabel>
                                        <Select
                                            labelId="storage-label"
                                            variant="outlined"
                                            value={productStorage}
                                            label="Storage"
                                            onChange={(e) => setProductStorage(e.target.value)}
                                        >
                                            {product.options?.storages?.map((storage) => (
                                                <MenuItem key={storage.code} value={storage.code}>
                                                    {storage.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <Button
                                        variant="contained"
                                        startIcon={<ShoppingCartIcon/>}
                                        sx={{mt: 2}}
                                        disabled={!productColor || !productStorage}
                                    >
                                        Add to Cart
                                    </Button>
                                </Grid>
                            </>
                        }
                    </>
            }
        </Grid>
    )
}

export default ProductDetail;