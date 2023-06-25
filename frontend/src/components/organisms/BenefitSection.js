import { 
    Flex, 
    VStack, 
    Image, 
    Box,
    Text
} from "@chakra-ui/react";
import { SectionTitle } from "../../components/atoms/WorldwideText"

import benefitsImg from '../../assets/Img/benefits.png';

function BenefitSection(){
    return(
        <Flex justifyContent="center" alignItems="center" gap={20} pt="20px" pb="40px" bg="fypBG.2">
            <Image
                objectFit='cover'
                src={benefitsImg}
                boxSize="275px"
            />
            <Box width="600px">
                <SectionTitle mb="10px">Benefits of Online Booking</SectionTitle>
                <VStack spacing="10px">
                    <Text mb="0px" textAlign="justify">
                        One of the ultimate benefits when you book bus ticket online, is you can book in advance 
                        from anywhere and whenever you want. This is especially useful for tourist and for those 
                        with difficulties to access the bus terminal counter, Instead you can save the cost and 
                        time going to the stations and terminals to buy the tickets. 
                    </Text>
                    <Text mb="0px" textAlign="justify">
                        Say no more long queues and avoid disappointment of tickets being sold out when you book 
                        for your bus in advance online.
                    </Text>
                </VStack>
            </Box>
        </Flex>
    )
}

export default BenefitSection