import { 
    Portal, 
    HStack, 
    Box, 
    Button, 
    Text, 
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useDisclosure
} from '@chakra-ui/react'    
import CancelBookingModal from '../organisms/CancelBookingModal'
import { convertToTime } from "../../utils/convertTimeUtils";
import RightArrow from "../../assets/others/RightArrow.jpg"
import defaultLogo from "../../assets/busOperator/defaultLogo.png"


function ManageText1(props) {
    return(
        <Text as="b" fontSize="lg" >
            {props.children}
        </Text>
    )
}

function ManageText2(props) {
    return(
        <Text fontSize="lg">
            {props.children}
        </Text>
    )
}

function ManageBooking({booking}) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return(
        <>
            <HStack border="1px" borderColor="gray.200" py="15px" px="30px" spacing="30px" w="100%" borderRadius="10px" bgColor="white" boxShadow='2xl'>
                <Image 
                    src={booking.partner_logoImg ? booking.partner_logoImg : defaultLogo}
                />

                <Box w="10%">
                    <ManageText1>{booking.plan_date}</ManageText1>
                </Box>

                <Box w="10%">
                    <ManageText1>{convertToTime(booking.plan_time)}</ManageText1>
                </Box>

                <Box w="60%">
                    <HStack textAlign="center">
                        <Box pt="10px" fontSize="sm" w="40%">
                            <ManageText2>{booking.plan_origin}</ManageText2>
                        </Box>
                        <Box>
                            <Image
                                src={RightArrow}
                                h="24px"
                                w="48px"
                            />
                        </Box>
                        <Box fontSize="sm" pt="10px" w="40%"> 
                            <ManageText2>{booking.plan_destination}</ManageText2>
                        </Box>
                        <Box w="25%" fontSize="sm" pt="10px">
                            <ManageText2>Seats: {booking.booking_seat}</ManageText2>
                        </Box>
                    </HStack>
                </Box>

                <Box h="50px" w="10%" textAlign="20px" px="1px" pt="6px">
                    <Popover>
                        <PopoverTrigger>
                            <Button backgroundColor="#0A468C" textColor="white" borderRadius="5px" _hover={{background: "blue.400",color: "white", }} >Manage</Button>
                        </PopoverTrigger>

                        <Portal>
                            <PopoverContent w="200px" colorscheme="blue">
                                <Button 
                                    borderRadius="0px" 
                                    backgroundColor="#0A468C" 
                                    textColor="white" 
                                    _hover={{background: "blue.400",color: "white", }}
                                    onClick={onOpen}
                                >
                                    Cancel Booking
                                </Button>
                                <Button 
                                    borderRadius="0px" 
                                    backgroundColor="#0A468C" 
                                    textColor="white" 
                                    _hover={{background: "blue.400",color: "white", }}
                                >
                                    Edit Booking
                                </Button>
                                {/* <Button borderRadius="0px" backgroundColor="#0A468C" textColor="white" _hover={{background: "blue.400",color: "white", }}>Print Booking Ticket</Button> */}
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </Box>         
            </HStack> 
            {isOpen && (
                <CancelBookingModal 
                    isOpen={isOpen}
                    onClose={onClose}
                    bookingPrice={booking.plan_price}
                    bookingId = {booking.booking_id}
                />
            )}
        </>
    )
}
    
export default ManageBooking;