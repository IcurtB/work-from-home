import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import darkScrollbar from '@mui/material/darkScrollbar';

export const theme = createTheme({
    palette: {
        primary: {
            main: blue[600]
        }
    },
    components: {
        MuiCssBaseline: {
          styleOverrides: (themeParam) => ({
            body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
          }),
        },
    },
})