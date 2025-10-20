import {useNavigate} from "react-router-dom";
import {Card, CardContent, Typography, CardActionArea} from "@mui/material";

function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <Card variant="outlined">
            <CardActionArea onClick={handleClick}>
                <CardContent sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <img src={product.imgUrl} alt={`${product.brand} ${product.model}`}/>
                    <Typography sx={{ mt: 2}}>{product.brand}</Typography>
                    <Typography>{product.model}</Typography>
                    {product.price &&
                        <Typography>€ {product.price}</Typography>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ProductCard;