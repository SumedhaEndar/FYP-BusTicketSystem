import { 
    Card, 
    CardHeader, 
    CardBody, 
    Stack,
    Heading,
    Text,
    HStack,
} from '@chakra-ui/react'
import { convertToTime } from '../../utils/convertTimeUtils';

function BookingInfo({eachSchedule, bookingSeats}) {
    return(      
        <Card mb="20px">
            <CardHeader bg="gray.200" py="15px">
                <Heading fontSize='1.15rem' mb="0px">Booking Info</Heading>
            </CardHeader>
            <CardBody pt="15px"> 
                <Stack spacing='15px'>
                    <HStack>
                        <Text mb="0px" fontWeight="bold">Departure Date: </Text><Text>{eachSchedule.plan_date}</Text>
                    </HStack>
                    <HStack>
                        <Text mb="0px" fontWeight="bold">Departure Time: </Text><Text>{convertToTime(eachSchedule.plan_time)}</Text>
                    </HStack>
                    <HStack>
                        <Text mb="0px" fontWeight="bold">Depart From: </Text><Text>{eachSchedule.plan_origin}</Text>
                    </HStack>
                    <HStack>
                        <Text mb="0px" fontWeight="bold">Arrive At: </Text><Text>{eachSchedule.plan_destination}</Text>
                    </HStack>
                    <HStack>
                        <Text mb="0px" fontWeight="bold">Bus Operator: </Text><Text>{eachSchedule.partner_name}</Text>
                    </HStack>
                    <HStack>
                        <Text mb="0px" fontWeight="bold">Seats: </Text><Text>{bookingSeats.join(', ')}</Text>
                    </HStack>
                    <HStack>
                        <Text mb="0px" fontWeight="bold">Ticket Unit Price: </Text><Text>RM {eachSchedule.plan_price}.00</Text>
                    </HStack>
                </Stack>
            </CardBody>
        </Card>
    )
} 

export default BookingInfo;