import { 
    HStack,
    VStack, 
    Box, 
    Flex, 
    Text,
    Image
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext"
import { convertToTime } from "../../utils/convertTimeUtils";

import RightArrow from '../../assets/others/RightArrow.jpg'
import defaultLogo from '../../assets/busOperator/defaultLogo.png'


function CancelBookingContent({bookingId}){
    const { user } = useAuthContext()
    const [thisBooking, setThisBooking] = useState('')

    useEffect(()=>{
        const getThisBooking = async() => {
            const response = await Axios.get('api/customerDashboard/bookings',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setThisBooking(response.data.bookings[0])
        }
        getThisBooking()
    },[user])

    return(
        <Box>
            <Flex border="1px" borderRadius="4px" borderColor="gray.300" boxShadow="lg" my="20px" direction="column">
                <HStack py="15px" px="10px" spacing="20px" fontWeight="bold">
                    <Image 
                        src={thisBooking.partner_logoImg ? thisBooking.partner_logoImg : defaultLogo}
                    />

                    <Text m="0px">{thisBooking.plan_date}</Text>

                    <Text>{convertToTime(thisBooking.plan_time)}</Text>

                    <Text m="0px">
                        {thisBooking.plan_origin}
                    </Text>
                    <Image
                        src={RightArrow}
                        h="24px"
                    />
                    <Text>
                        {thisBooking.plan_destination}
                    </Text>
                    <Text>
                        Seats: {thisBooking.booking_seat}
                    </Text>
                </HStack> 
            </Flex>
            <VStack pl="10px" alignItems="flex-start" spacing="5px">
                <Text mb="0px">Refund Rules</Text>
                <Text>1. The refund will be in term of MBS E-wallet.</Text>
                <Text>2. Refund value = Ticket Price - Processing Fee.</Text>
            </VStack>   
        </Box>
    )
}

export default CancelBookingContent