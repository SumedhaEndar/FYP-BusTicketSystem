import { Link } from "react-router-dom"
import { 
    HStack, 
    VStack, 
    Text, 
    Spacer, 
    Image,
    forwardRef 
} from "@chakra-ui/react"

import logoImg from '../../assets/logo/logo.png';

const FootHead = forwardRef((props, ref)=> (
    <Text 
        color="fypBlue.2" fontWeight="bold" alignItems="flex-start" 
        spacing="5px" mb="5px" 
        ref={ref} {...props}
    />
))

const FootText = forwardRef((props, ref)=> (
    <Text fontSize="1rem" ref={ref} {...props}/>
))

function Footer() {
    return(
        <HStack spacing="5em" alignItems="flex-start" p="20px 15px 20px 10px">
            <VStack alignItems="flex-start" spacing="5px">
                <FootHead>Information</FootHead>
                <Link to="/">
                    <FootText fontSize="1rem">Home</FootText>
                </Link>
                <Link to="/about-us">
                    <FootText fontSize="1rem">About Us</FootText>
                </Link>
                <Link to="/experience">
                    <FootText fontSize="1rem">Experience</FootText>
                </Link>
                <Link to="/enrich">
                    <FootText fontSize="1rem">Enrich</FootText>
                </Link>
                <Link to="/bus-operators">
                    <FootText fontSize="1rem">Bus Operators</FootText>
                </Link>
            </VStack>
            <VStack alignItems="flex-start" spacing="5px">
                <FootHead>AskMB</FootHead>
                <Link to="/askMB">
                    <FootText fontSize="1rem">Contact Details</FootText>
                </Link>
                <Link to="/askMB">
                    <FootText fontSize="1rem">FAQ</FootText>
                </Link>
                <Link to="/askMB">
                    <FootText fontSize="1rem">Feedback Form</FootText>
                </Link>
            </VStack>
            <VStack alignItems="flex-start" spacing="5px">
                <FootHead>Others</FootHead>
                <Link to="/partner-register">
                    <FootText fontSize="1rem">Be a partner</FootText>
                </Link>
                <Link to="/partner-login">
                    <FootText fontSize="1rem">Partner Login</FootText>
                </Link>
                <Link to="/admin-login">
                    <FootText fontSize="1rem">Admin Login</FootText>
                </Link>
            </VStack>
            <Spacer />
            <VStack width="500px" alignItems="flex-start">
                <Image
                    objectFit='cover'
                    src={logoImg}
                />
                <FootText fontSize="1rem" textAlign="justify">
                    Malaysia Buses System (MBS) is the Malaysia largest online bus ticket booking service. 
                    Whether you want to go back to your hometown or planning for a vacation, we are here to 
                    make your journey hassle-free.
                </FootText>
            </VStack>
        </HStack>
    )
}


export default Footer