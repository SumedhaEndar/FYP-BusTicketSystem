import { 
    Box, 
    VStack, 
    Text,
} from '@chakra-ui/react'    
import Axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import ManageBooking from '../components/molecules/ManageBooking';
import {v4 as uuidv4} from 'uuid';

function TitleText(props) {
    return(
        <Text as="b" fontSize="2rem" textColor="#0A468C">
            {props.children}
        </Text>
    )
}

function CustomerDashBooking(){
    const { user } = useAuthContext()
    const [myBookings, setMyBookings] = useState([])

    useEffect(()=>{
        const getBookings = async() => {
            const response = await Axios.get('api/customerDashboard/bookings',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setMyBookings(response.data.bookings)
            console.log(response.data.bookings)
        }
        getBookings()
    },[user])

    myBookings.sort((a,b) => {
        const dateA = new Date(a.plan_date)
        const dateB = new Date(b.plan_date)
        
        // Compare dates
        if (dateA < dateB) {
            return -1;
        } 
        else if (dateA > dateB) {
            return 1;
        } 
        else {
            return 0;
        }
    } ).sort((a,b) => a.plan_time - b.plan_time)

    return(
        <Box bg="fypBG.2" pt="10px" pb="40px" align="center" minH="100vh">
            <Box ml="5%" textAlign="left" my="20px">
                <TitleText>Upcoming Trips</TitleText>
            </Box>
            <VStack my="20px" w="90%" spacing="15px">
                {
                    myBookings.map((myBooking)=>(
                        <ManageBooking 
                            key={uuidv4()}
                            booking = {myBooking}
                        />
                    ))
                }
            </VStack> 
        </Box>
    )
}

export default CustomerDashBooking