import {
    Flex,
    Box,
    Text,
    Image
} from "@chakra-ui/react"

import benefitsImg from '../../assets/Img/benefits.png';

function ExpEachSection(props){
    return(
        <Flex justifyContent="center" gap={20} pt="20px" pb="30px" >
            {
                props.styleSelection === 1 &&
                <Box width="40%" alignSelf="center">
                    <Text fontSize="2xl" fontWeight="bold" color="fypBlue.1">
                        {props.eachTitle}
                    </Text>
                    <Text>
                        {props.eachText}
                    </Text>
                </Box>
            }
            <Image 
                objectFit='cover'
                src={benefitsImg}
                boxSize="35%"
            />
            {
                props.styleSelection === 2 &&
                <Box width="40%" alignSelf="center">
                    <Text fontSize="2xl" fontWeight="bold" color="fypBlue.1">
                        {props.eachTitle}
                    </Text>
                    <Text>
                        {props.eachText}
                    </Text>
                </Box>
            }
        </Flex>
    )
}

export default ExpEachSection