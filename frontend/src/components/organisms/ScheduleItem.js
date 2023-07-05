import { 
    HStack, 
    Image, 
    Divider, 
    Box, 
    Button, 
    Text,
    useDisclosure 
} from "@chakra-ui/react";
import { convertToTime } from "../../utils/convertTimeUtils";
import { ArrowForwardIcon } from "@chakra-ui/icons"

import defaultLogo from "../../assets/busOperator/defaultLogo.png"
import starFill from "../../assets/others/star-fill.png"
import starEmpty from "../../assets/others/star-empty.png"
import ChooseSeatModal from "./ChooseSeatModal";

function ScheduleItem({eachSchedule}){
    const {isOpen, onOpen, onClose} = useDisclosure()

    return(
        <>
            <Box w="850px" border="1px" borderRadius="4px" borderColor="gray.400" boxShadow="lg" mt="20px" bg="white">
                <HStack py="15px" px="10px" alignItems="center" justifyContent="space-around">
                    <Text fontSize="1.25rem" mb="0px" fontWeight="semibold">
                        {convertToTime(eachSchedule.plan_time)}
                    </Text>
                    <Text fontSize="1rem">
                        {eachSchedule.plan_origin}
                    </Text>
                    <ArrowForwardIcon />
                    <Text fontSize="1rem">
                        {eachSchedule.plan_destination}
                    </Text>
                    <Text fontSize="1rem">{30-eachSchedule.total_bookings} Seats</Text>
                    <Text fontSize="1rem" fontWeight="bold">RM {eachSchedule.plan_price}</Text>
                    <Button colorScheme="blue" size="md" onClick={onOpen}>
                        Select
                    </Button>
                </HStack>
                <Divider w="95%" m="5px auto"/>
                <HStack py="10px" px="25px" spacing={10} >
                    <Image 
                        src={eachSchedule.partner_logoImg ? eachSchedule.partner_logoImg : defaultLogo}
                    />
                    <HStack>
                        <Text mb="0px">Rate: </Text>
                        {Array.from({ length: eachSchedule.partner_rating}).map((_, index) => (
                            <Image key={`starFill${index}`} objectFit='cover' src={starFill}/>
                        ))}
                        {Array.from({ length: 5 - eachSchedule.partner_rating}).map((_, index) => (
                            <Image key={`starEmpty${index}`} objectFit='cover' src={starEmpty}/>
                        ))}
                    </HStack>
                    <HStack>
                        <Box border="1px" borderRadius="4px" color="blue.400" backgroundColor="#EBE5FC" px="10px" textAlign="center">Refundable</Box>
                        <Box border="1px" borderRadius="4px" color="blue.400" backgroundColor="#EBE5FC" px="10px" textAlign="center">Reschedulable</Box>
                    </HStack>
                </HStack>
            </Box>
            {isOpen && (
                <ChooseSeatModal 
                    isOpen={isOpen} 
                    onClose={onClose} 
                    eachSchedule = {eachSchedule}
                />
            )}
        </>
    )
}

export default ScheduleItem