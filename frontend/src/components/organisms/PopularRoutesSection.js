import {
    SimpleGrid,
    Box
} from "@chakra-ui/react"
import PopularRoute from "../molecules/PopularRoute";
import { SectionTitle } from "../atoms/WorldwideText";

import popular1 from "../../assets/Img/Johor.png";
import popular2 from "../../assets/Img/KL.png";
import popular3 from "../../assets/Img/Kuantan.png";
import popular4 from "../../assets/Img/Melaka.png";
import popular5 from "../../assets/Img/Penang.png";
import popular6 from "../../assets/Img/Singapore.png";


function PopularRoutesSection(){
    return(
        <Box pt="15px" pb="45px">
            <SectionTitle textAlign="center" mb="25px">Popular Routes</SectionTitle>
            <SimpleGrid columns={3} spacing="25px" width="75%" m="0px auto">
                <PopularRoute 
                    routeImage = {popular1}
                    routeText = "Johor"
                />
                <PopularRoute 
                    routeImage = {popular2}
                    routeText = "Kuala Lumpur"
                />
                <PopularRoute 
                    routeImage = {popular3}
                    routeText = "Kuantan"
                />
                <PopularRoute 
                    routeImage = {popular4}
                    routeText = "Melaka"
                />
                <PopularRoute 
                    routeImage = {popular5}
                    routeText = "Penang"
                />
                <PopularRoute 
                    routeImage = {popular6}
                    routeText = "Singapore"
                />
            </SimpleGrid>
        </Box>
    )
}

export default PopularRoutesSection