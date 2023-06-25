import { Box } from "@chakra-ui/react";
import HeroCaption from "../molecules/HeroCaption";

function HeroSection(props) {
    return(
        <Box 
            backgroundImage={`url(${props.heroImage})`} 
            height="70vh"
            backgroundSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
        >
            <HeroCaption 
                heroText1={props.heroText1}
                heroText2={props.heroText2}
                width = {props.width}
            />
        </Box>
    )
}

export default HeroSection;