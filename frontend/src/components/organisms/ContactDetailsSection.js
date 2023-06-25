import {
    Box, 
    Flex,
    Text,
} from "@chakra-ui/react"
import { SectionTitle } from "../atoms/WorldwideText"

function ContactDetailsSection(){
    return(
        <Box bg="fypBG.1" pt="20px" pb="40px" justifyContent="center" id="contact">
            <SectionTitle textAlign="center" mb="20px">Contact Details</SectionTitle>
            <Flex justifyContent="center">
                <iframe 
                    title="address" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.610460310761!2d101.63932547373551!3d2.9277768544761478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdb6e4a9d3b7a1%3A0xd0f74e8ad10f1129!2sMultimedia%20University%20-%20MMU%20Cyberjaya!5e0!3m2!1sen!2smy!4v1687676143984!5m2!1sen!2smy" 
                    width="600" 
                    height="450"  
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade" 
                />
            </Flex>
            <Box m="30px auto 0 auto" width="40%">
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    Malaysia Buses System Group Sdn Bhd
                </Text>
                <Text textAlign="left">
                    Office address:  Persiaran Multimedia, 63100, Cyberjaya, Selangor.
                </Text>
                <Text textAlign="left">
                    Office contact:   1-300-80-0668
                </Text>
            </Box>
        </Box>
    )
}

export default ContactDetailsSection