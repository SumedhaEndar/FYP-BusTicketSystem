import { 
    RadioGroup, 
    Stack, 
    Radio,
} from '@chakra-ui/react';
import { 
   RadioTitle
} from '../atoms/WorldwideText';

function FilterOptions(props){
    const handleRadioChange = (value) => {
        props.onOptionChange(value);
    }

    return(
        <RadioGroup value={props.selectedOption} onChange={handleRadioChange} borderBottom="1px" pb="10px" mb="5px">
            <Stack spacing={2}>
                <RadioTitle mt="5px" mb="0px">{props.filterTitle}</RadioTitle>
                {props.options.map((option) => (
                    <Radio key={option} value={option}>
                        {option}
                    </Radio>
                ))}
            </Stack>
        </RadioGroup>
    )
}

export default FilterOptions