import { 
    Box, 
} from '@chakra-ui/react'   
import { useState } from 'react';

function Seat({item, onSeatClick, disabled}){
    const [backgroundColor, setBackgroundColor] = useState('none');
    
    const handleClick = () => {
        if(backgroundColor === 'blue.400'){
            setBackgroundColor('none')
        }
        else{
            setBackgroundColor('blue.400')
        }
        onSeatClick(item);
    };

    return(
        <Box
            border="1px" 
            width="30px" 
            height="30px" 
            textAlign="center" 
            pt="3px"
            onClick={handleClick}
            disabled={disabled}
            cursor= "pointer"
            bg={disabled ? '#CED4DA' : backgroundColor}
        >
            {item}
        </Box>
    )
}

export default Seat