import { Text, HStack, VStack, Box } from '@chakra-ui/react'
import { convertToTime } from "../../utils/convertTimeUtils";


function CurrentBookingInfo({booking}) {
    
    return(      
        <VStack spacing="0px" w="100%" border="1px" borderRadius="10px">
            <Box w='100%' px='12px' pt="10px" bg='gray.100' borderTopRadius="8px">
                <Text fontWeight="bold"> Current Booking Info </Text>
            </Box>

            <Box w='100%' align="left" px='10px' bg='white' py="20px" borderBottomRadius={8}>
                <VStack alignItems="flex-start" spacing="15px" fontWeight="bold">
                    <Text>{booking.partner_name}</Text>

                    <HStack mb="0px" justifyContent="space-between" alignItems="center">
                        <Text mb="0">{booking.plan_date}</Text>
                        <Text>{convertToTime(booking.plan_time)}</Text>
                    </HStack>

                    <Text>From: {booking.plan_origin}</Text>

                    <Text>To:{booking.plan_destination}</Text>

                    <Text>Seats: {booking.booking_seat}</Text>

                    <Text>Ticket Unit Price: RM{booking.plan_price}.00 </Text>
                </VStack>
            </Box>
        </VStack>
    )
} 

export default CurrentBookingInfo