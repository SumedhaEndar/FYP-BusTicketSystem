import {
    VStack,
    Text,
    Flex,
    HStack,
} from "@chakra-ui/react"
import HeroSection from "../components/organisms/HeroSection"
import { SectionTitle } from "../components/atoms/WorldwideText"
import { EnrichBox } from "../components/molecules/EnrichBox"

import heroImage from "../assets/HeroImg/enrich-hero-img.png"

function Enrich(){
    return(
        <>
            <HeroSection 
                heroImage = {heroImage}
                heroText1 = "Enrich Points"
                heroText2 = "Earn with every booking"
                width = {250}
            />
            <Flex bg="fypBG.2" pt="30px" flexDirection="column" alignItems="center" h="70vh">
                <SectionTitle textAlign="center" mb="1rem">Enrich Points</SectionTitle>
                <VStack w="50%" mb="20px">
                    <Text textAlign="justify">
                        Frequent traveler ?  We are happy to welcome you to join out Loyalty Program. With our Loyalty Program, 
                        you get to earn Enrich Points every time you book with us. Once you have accumulated sufficient points, 
                        you can redeem the points to cut off the price for your next purchase. 
                    </Text>
                    <Text textAlign="justify">
                        Earn Enrich Points when you book tickets from Malaysia Buses System (MBS). Every RM 1.00 you paid worth 
                        one point and you can accumulate these points to redeem a discount worth up to RM 50.00.  
                    </Text>
                </VStack>
                <HStack>
                    <EnrichBox>
                        <Text fontSize="1rem" fontWeight="normal" color="fypBlue.1" m="0px">
                            300 Enrich Points
                        </Text>
                        <Text fontSize="1rem" fontWeight="normal" color="fypBlue.2" m="0px">
                            RM 6.00
                        </Text>
                    </EnrichBox>
                    <EnrichBox>
                        <Text fontSize="1rem" fontWeight="normal" color="fypBlue.1" m="0px">
                            600 Enrich Points
                        </Text>
                        <Text fontSize="1rem" fontWeight="normal" color="fypBlue.2" m="0px">
                            RM 12.50
                        </Text>
                    </EnrichBox>
                    <EnrichBox>
                        <Text fontSize="1rem" fontWeight="normal" color="fypBlue.1" m="0px">
                            1200 Enrich Points
                        </Text>
                        <Text fontSize="1rem" fontWeight="normal" color="fypBlue.2" m="0px">
                            RM 25.00
                        </Text>
                    </EnrichBox>
                    <EnrichBox>
                        <Text fontSize="1rem" fontWeight="normal" color="fypBlue.1" m="0px">
                            2000 Enrich Points
                        </Text>
                        <Text fontSize="1rem" fontWeight="normal" color="fypBlue.2" m="0px">
                            RM 50.00
                        </Text>
                    </EnrichBox>
                </HStack>
            </Flex>
        </>
    )
}

export default Enrich