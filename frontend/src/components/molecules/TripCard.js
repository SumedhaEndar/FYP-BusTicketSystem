import { 
    Box, 
    VStack, 
    HStack,
    IconButton 
} from '@chakra-ui/react'
import { 
    ChevronRightIcon,
    ChevronLeftIcon,
    ArrowForwardIcon
} from '@chakra-ui/icons';
import { 
    TripCardTitle,
    TripCardText 
} from '../atoms/WorldwideText';

function TripCard(props) {
    return(
        <Box bg='rgb(33, 32, 32, 0.7)' w="95%" pl='5%' py="20px" color="white" borderRadius="15px" >
            <TripCardTitle mb="5px">Depart Trip</TripCardTitle>
            <VStack>
                <HStack w="100%"  spacing="35px">
                    <TripCardText mb="0px">{props.departLocation}</TripCardText>
                    <ArrowForwardIcon />
                    <TripCardText>{props.arriveLocation}</TripCardText>
                    <HStack pl="20px">
                        <IconButton 
                            icon={<ChevronLeftIcon/>}
                            onClick = {props.OnDecreaseDate}
                            colorScheme="none"
                        />
                        <TripCardText>{props.departDate}</TripCardText>    
                        <IconButton 
                            icon={<ChevronRightIcon/>}
                            onClick = {props.OnIncreaseDate}
                            colorScheme="none"
                        />
                    </HStack>
                </HStack>
            </VStack>
        </Box> 
    )
} 

export default TripCard;