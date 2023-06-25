import { 
    Box,
    Flex,
    Button,
    Text 
} from "@chakra-ui/react";

function AskCard(props){
    return(
        <Box 
            backgroundImage={`url(${props.cardImage})`} 
            height="350px"
            backgroundSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
        >
            <Flex 
                bg="blackAlpha.600"
                color="white"
                width="20vw" 
                direction="column"
                position="relative"
                top="0%"
                height="350px"
                justifyContent="flex-end"
                p="20px"
            >
                <Text fontSize="xl" fontWeight="bold" textAlign="left" mb="10px">
                    {props.cardTitle}
                </Text>
                <Text fontSize="xs" fontWeight="bold" textAlign="left" mb="15px">
                    {props.cardText}
                </Text>
                <a href={`#${props.toId}`}>
                    <Button  ml="xs" colorScheme='blue' width="100px" size="sm" borderRadius="20px">
                        Click Me
                    </Button>
                </a>
            </Flex>
        </Box>
    )
}

export default AskCard