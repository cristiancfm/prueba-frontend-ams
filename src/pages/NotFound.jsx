import { Typography } from "@mui/material";

function NotFound() {
    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                404 - Página no encontrada
            </Typography>
            <Typography align="center">
                La ruta que buscas no existe.
            </Typography>
        </>
    );
}

export default NotFound;