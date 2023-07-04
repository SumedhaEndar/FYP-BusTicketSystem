import { 
    Image, 
    HStack, 
    Box, 
    Text
} from '@chakra-ui/react'    
// import { useState } from 'react';
import Seat from '../atoms/Seat';
import steering from "../../assets/others/steering.jpg"

function BusSeats({occupiedSeats, onSeatsSelected}){
    // const [clickedSeats, setClickedSeats] = useState([]);

    const row1 = [3, 6, 9, 12, 15, 18, 21, 24, 27]
    const row2 = [2, 5, 8, 11, 14, 17, 20, 23, 26]
    const row3 = [1, 4, 7, 10, 13, 16, 19, 22, 25]

    const handleSeatClicked = (seat) => {
        onSeatsSelected(seat);
    }

    const renderedRow1 = row1.map((item, index)=> {
        const disabled = occupiedSeats.includes(item)
        return (
            <Seat 
                key={`row1_${index}`}
                item={item}
                onSeatClick={handleSeatClicked}
                disabled={disabled}
            />
        )
    })

    const renderedRow2 = row2.map((item, index)=> {
        const disabled = occupiedSeats.includes(item)
        return (
            <Seat 
                key={`row2_${index}`}
                item={item}
                onSeatClick={handleSeatClicked}
                disabled={disabled}
            />
        )
    })

    const renderedRow3 = row3.map((item, index)=> {
        const disabled = occupiedSeats.includes(item)
        return (
            <Seat 
                key={`row3_${index}`}
                item={item}
                onSeatClick={handleSeatClicked}
                disabled={disabled}
            />
        )
    })

    // console.log(clickedSeats)

    return(
        <>
            <Box border="1px" width="450px" borderRadius="4px" p="15px" m="25px auto" background="fypBG.2">
                <HStack>
                    <Image
                        mb="25%" mr="10px"
                        src={steering}
                        boxSize="25px"
                    />
                    <Box backgroundColor="gray" h="140px" w="15px"></Box>
                    <Box pl="10px">
                        <HStack> 
                            {renderedRow1}
                        </HStack>
                        <HStack mt="10px">
                            {renderedRow2}
                        </HStack>
                        <HStack mt="40px">
                            {renderedRow3}    
                        </HStack>
                    </Box>
                </HStack>
            </Box>
            <HStack justifyContent="center" mb="10px">        
                <Box border="1px" width="30px" height="30px" textAlign="center" py="3px" backgroundColor="fypBG.2"></Box>
                <Text pr="20px">Available</Text>
            
                <Box border="1px" width="30px" height="30px" textAlign="center" py="3px" backgroundColor="#CED4DA"></Box>
                <Text pr="20px">Occupied</Text>
                
                <Box border="1px" width="30px" height="30px" textAlign="center" py="3px" backgroundColor="blue.400"></Box>
                <Text pr="20px">Selected</Text>
            </HStack> 
            {/* <p>Clicked Seat: {clickedSeats.join(', ')}</p> */}
        </>
    )
}

export default BusSeats