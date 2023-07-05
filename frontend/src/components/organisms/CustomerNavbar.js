import { 
    Flex, 
    Text, 
    HStack,
    Avatar,
    useColorModeValue 
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from 'react';
import Axios from "axios";


function CustomerNavbar(){
    const { user } = useAuthContext()
    const location = useLocation();
    const [ pointsTokens, setPointsTokens ] = useState([])
    const isActive = (pathname) => location.pathname === pathname;

    const navItemBgColor = useColorModeValue('fypBlue.2');
    const navItemColor = useColorModeValue('white');
    const navItemHoverBgColor = useColorModeValue('fypBlue.2');
    const navItemHoverColor = useColorModeValue('white');

    useEffect(()=>{
        const getPointsTokens = async() => {
            const response = await Axios.get(`api/customerDashboard/enrich-points`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setPointsTokens(response.data)
        }
        getPointsTokens()
    },[user])

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
                            to="/customer-dash-booking"
                            textAlign="center"
                            p={4}
                            w="121px"
                            fontWeight="bold"
                            display="inline-block"
                            bg={isActive('/customer-dash-booking') ? navItemBgColor : 'transparent'}
                            color={isActive('/customer-dash-booking') ? navItemColor : 'fypBlue.2'}
                            _hover={{
                                bg: navItemHoverBgColor,
                                color: navItemHoverColor,
                            }}
                        >
                            Booking
                        </Text>
                    </li>
                    <li>
                        <Text
                            as={RouterLink}
                            to="/customer-dash-profile"
                            textAlign="center"
                            p={4}
                            w="121px"
                            fontWeight="bold"
                            display="inline-block"
                            bg={isActive('/customer-dash-profile') ? navItemBgColor : 'transparent'}
                            color={isActive('/customer-dash-profile') ? navItemColor : 'fypBlue.2'}
                            _hover={{
                                bg: navItemHoverBgColor,
                                color: navItemHoverColor,
                            }}
                        >
                            Profile
                        </Text>
                    </li>
                </HStack>
                <Text fontWeight="bold" color="fypBlue.2">Enrich Points: {pointsTokens.customer_enrich} </Text>
                <Text fontWeight="bold" color="fypBlue.2">Refund Tokens: RM {pointsTokens.customer_refund}</Text>
            </HStack>
        </Flex>
    )
}

export default CustomerNavbar