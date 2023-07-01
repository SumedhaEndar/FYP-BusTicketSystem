import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react"
import { SectionTitle } from "../components/atoms/WorldwideText"
import { useEffect, useState } from "react";
import Axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { convertToTime } from "../utils/convertTimeUtils";

function PartnerDashRoutes(){
    const { user } = useAuthContext()
    const [ routes, setRoutes ] =useState([])

    useEffect(()=>{
        const getRoutes = async()=>{
            const response = await Axios.get('api/partnerDashboard/routes', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setRoutes(response.data)
        }
        getRoutes()
    }, [user])

    return(
        <Flex bg="fypBG.2" pt="20px" pb="40px" alignItems="center" direction="column" minH="100vh">
            <SectionTitle textAlign="center">Routes Info</SectionTitle>
            <TableContainer w="740px" rounded="lg" boxShadow='md' mt="15px">
                <Table size='md' variant="simple" bg="white">
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Depart</Th>
                            <Th>Arrive</Th>
                            <Th>Time</Th>
                            <Th>Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            routes.map((item) => 
                                item.routes.map((route, index) => (
                                <Tr key={index}>
                                    <Td>{item.plan_date}</Td>
                                    <Td>{route.plan_origin}</Td>
                                    <Td>{route.plan_destination}</Td>
                                    <Td>{convertToTime(route.plan_time)}</Td>
                                    <Td>RM {route.plan_price}</Td>
                                </Tr>
                                ))
                            )
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}

export default PartnerDashRoutes