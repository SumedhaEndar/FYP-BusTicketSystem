import { 
    Flex, 
    Text, 
    HStack,
    Avatar,
    useColorModeValue 
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";

function PartnerNavbar(){
    const { user } = useAuthContext()
    const location = useLocation();
    const isActive = (pathname) => location.pathname === pathname;

    const navItemBgColor = useColorModeValue('fypBlue.2');
    const navItemColor = useColorModeValue('white');
    const navItemHoverBgColor = useColorModeValue('fypBlue.2');
    const navItemHoverColor = useColorModeValue('white');

    return(
        <Flex 
            as="nav" alignItems="center" p="0px 20px"  m="0px 2px 3px 2px"
            boxShadow='xl' border="1px" borderColor='gray.300'>
            <HStack spacing="30px" height="auto">
                <Avatar size='md' name={user.name} ml="30px"/>
                <HStack as="ul" listStyleType="none" >
                    <li>
                        <Text
                            as={RouterLink}
                            to="/partner-dash-profile"
                            textAlign="center"
                            p={4}
                            w="121px"
                            fontWeight="bold"
                            display="inline-block"
                            bg={isActive('/partner-dash-profile') ? navItemBgColor : 'transparent'}
                            color={isActive('/partner-dash-profile') ? navItemColor : 'fypBlue.2'}
                            _hover={{
                                bg: navItemHoverBgColor,
                                color: navItemHoverColor,
                            }}
                        >
                            Profile
                        </Text>
                    </li>
                    <li>
                        <Text
                            as={RouterLink}
                            to="/partner-dash-routes"
                            textAlign="center"
                            p={4}
                            w="121px"
                            fontWeight="bold"
                            display="inline-block"
                            bg={isActive('/partner-dash-routes') ? navItemBgColor : 'transparent'}
                            color={isActive('/partner-dash-routes') ? navItemColor : 'fypBlue.2'}
                            _hover={{
                                bg: navItemHoverBgColor,
                                color: navItemHoverColor,
                            }}
                        >
                            Routes
                        </Text>
                    </li>
                </HStack>
            </HStack>
        </Flex>
    )
}

export default PartnerNavbar