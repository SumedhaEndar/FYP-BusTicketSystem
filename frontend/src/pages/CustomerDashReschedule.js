import Axios from "axios";
import { useLocation } from "react-router-dom"
import { HStack,VStack, Box, Button, Text, Input } from '@chakra-ui/react' 
import CurrentBookingInfo from "../components/molecules/CurrentBookingInfo"
import { useState, useEffect } from "react";
import ScheduleItem from "../components/organisms/ScheduleItem2";

const today = new Date().toISOString().split('T')[0];

function CustomerDashReschedule(){
    const location = useLocation()
    const booking = location.state.booking

    const [schedules, setSchedules] = useState([])
    const [departDate, setDepartDate] = useState(booking.plan_date)

    useEffect(()=>{
        const getSchedule = async() =>{
            const response = await Axios.get(`api/customers/schedules?date=${departDate}&origin=${booking.plan_origin}&destination=${booking.plan_destination}`)
            setSchedules(response.data)
        }
        getSchedule()
    },[departDate, booking.plan_origin, booking.plan_destination])

    const filteredSchedule = schedules.filter(schedule=>schedule.partner_id === booking.partner_id)

    function handleDate(e){
        console.log(e.target.value)
        setDepartDate(e.target.value)
    }

    return(
        <Box bg="fypBG.2" pt="20px" pb="80px" minH="100vh">
            <HStack mx="5%" align="top">
                <Box w="25%">
                    <VStack align="left">
                        <Button mt="5px" mb="10px" h="30px" w="100px" border="2px" borderRadius="4px" color='green'> Back </Button>
                        <CurrentBookingInfo booking={booking}/>
                    </VStack>
                </Box>
                <Box w="75%" >
                    <VStack spacing="20px">
                        <Text mb="10px" h="30px" pr="550px" fontWeight="bold" fontSize='25px' textColor="#0A468C" >Reschedule Booking</Text>
                        <HStack spacing="30px" >
                            <Input 
                                backgroundColor="white"
                                placeholder="Select Date and Time"
                                size="md"
                                type="date"
                                borderRadius="30px"
                                w="800px"
                                onChange={handleDate}
                                min={today}
                            />
                        </HStack>
                        <Box bg='#F7DB48' w="95%" px='5%' py='2%' color="black" borderRadius={8} >
                            <b>
                                Reschedule Policy
                                <br />
                                <br />
                                1. Reschedule with same bus operator and same route.<br />
                                2. Reschedule fee = (New ticket fare - Old ticket fare) + Processing fee<br />
                                3. No refund will be given if the new ticket fare is cheaper than the old ticket<br />
                            </b>
                        </Box>
                        <Box >
                            {
                            filteredSchedule.map((item, index) => 
                                    <ScheduleItem  key={index} eachSchedule={item}/>
                                )
                            }
                        </Box>
                    </VStack>
                </Box>
            </HStack>
        </Box>
    )
}

export default CustomerDashReschedule