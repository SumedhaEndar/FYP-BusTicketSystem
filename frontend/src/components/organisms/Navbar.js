import { Link } from "react-router-dom"
import {
    Flex, 
    Spacer, 
    HStack, 
    Image, 
    Text,
    forwardRef,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Button
} from "@chakra-ui/react"
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

import logoImg from '../../assets/logo/logo.png';

const NavText = forwardRef((props, ref) =>(
    <Text color="fypBlue.1" fontSize="1rem" fontWeight="bold" mb="0" ref={ref} {...props}/>
))

function Navbar() {
    
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
    }

    return(
        <Flex as="header" alignItems="center" p="10px 15px 15px 10px">
            <Image 
                objectFit='cover'
                src={logoImg}
            />
            <Spacer />
            <HStack spacing="25px">
                <Link to="/">
                    <NavText>Home</NavText>
                </Link>
                <Link to="/experience">
                    <NavText>Experience</NavText>
                </Link>
                <Link to="/enrich">
                    <NavText>Enrich</NavText>
                </Link>
                <Link to="/about-us">
                    <NavText>About Us</NavText>
                </Link>
                <Link>
                    <NavText>|</NavText>
                </Link>
                <Link to="/askMB">
                    <NavText>AskMB</NavText>
                </Link>
            </HStack>
            <Spacer />
            <Flex alignItems="center">
                {user ? (
                    <Popover>
                        <PopoverTrigger>
                            <Button color="fypBlue.1">My Account</Button>
                        </PopoverTrigger>
                        <PopoverContent  w="200px">
                            <PopoverBody >
                                <Button w="100%" colorScheme='blue'>Dashboard</Button>
                            </PopoverBody>
                            <PopoverBody>
                                <Button w="100%" colorScheme='blue' onClick={handleLogout}>Logout</Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <Link to="/customer-login">
                        <NavText>Login / Register</NavText>
                    </Link>
                )}
            </Flex>
        </Flex>
    )
}

export default Navbar