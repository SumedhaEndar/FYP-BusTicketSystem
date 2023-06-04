import { 
    Flex, 
    Text, 
    HStack,
    Avatar,
    useColorModeValue 
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";


function AdminNavbar(){
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
                            to="/admin-dash-employee"
                            textAlign="center"
                            p={4}
                            w="121px"
                            fontWeight="bold"
                            display="inline-block"
                            bg={isActive('/admin-dash-employee') ? navItemBgColor : 'transparent'}
                            color={isActive('/admin-dash-employee') ? navItemColor : 'fypBlue.2'}
                            _hover={{
                                bg: navItemHoverBgColor,
                                color: navItemHoverColor,
                            }}
                        >
                            Employee
                        </Text>
                    </li>
                    <li>
                        <Text
                            as={RouterLink}
                            to="/admin-dash-profile"
                            textAlign="center"
                            p={4}
                            w="121px"
                            fontWeight="bold"
                            display="inline-block"
                            bg={isActive('/admin-dash-profile') ? navItemBgColor : 'transparent'}
                            color={isActive('/admin-dash-profile') ? navItemColor : 'fypBlue.2'}
                            _hover={{
                                bg: navItemHoverBgColor,
                                color: navItemHoverColor,
                            }}
                        >
                            Profile
                        </Text>
                    </li>
                </HStack>
            </HStack>
        </Flex>
    )
}

export default AdminNavbar