import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        body: '"Inter", sans-serif',
    },
    colors: {
        fypBG: {
            1: "#FAFAFA",
            2: "#FDF2E3",
        },
        fypBlue: {
            1: "#0A468C",
            2: "#2D77CD",
        }
    }
})

export default theme