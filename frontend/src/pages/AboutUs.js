import {
    VStack,
    Text,
    Flex
} from "@chakra-ui/react"
import HeroSection from "../components/organisms/HeroSection"
import { SectionTitle } from "../components/atoms/WorldwideText"

import heroImage from "../assets/HeroImg/aboutUs-hero-img.png"

function AboutUs(){
    return(
        <>
            <HeroSection 
                heroImage = {heroImage}
                heroText1 = "Malaysia Buses System"
                heroText2 = "Who are we and what we do"
            />
            <Flex bg="fypBG.2" pt="30px" justifyContent="center" h="70vh">
                <VStack w="50%" spacing={3}>
                    <SectionTitle>About Us</SectionTitle>
                    <Text textAlign="justify">
                        Malaysia Buses System (MBS)  is the Malaysia  largest online bus ticket booking service. 
                        We are a company dedicated to make your travel experience as easy and stress-free as possible. 
                    </Text>
                    <Text textAlign="justify">
                        Our mission is to provide you with a convenient and reliable way to book your bus tickets online. With our user-
                        friendly platform, you can easily search for available bus trips, compare prices, and book your tickets in just a 
                        few clicks. Whether you want to go back to your hometown or planning for a vacation, we are here to ensure 
                        that your journey is hassle free.  
                    </Text>
                    <Text textAlign="justify">
                        Thank you for choosing Malaysia Buses System (MBS). We look forward to serving you and helping you reach 
                        your destination hassle-free !  
                    </Text>
                </VStack>
            </Flex>
        </>
    )
}

export default AboutUs