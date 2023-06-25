import { 
    Flex,
    Text 
} from "@chakra-ui/react"

function HeroCaption(props){
    const defaultWidth = 330
    const width = props.width || defaultWidth
    return(
        <Flex 
            bg="rgba(145, 151, 157, 0.7)"
            color="white"
            width= {`${width}px `}
            height="90px"
            direction="column"
            justifyContent="center"
            p = "10px 10px 10px 20px"
            position="relative"
            top="70%"
            left="5%"
        >
            <Text fontSize="24px" fontWeight="bold" mb="0px">
                {props.heroText1}
            </Text>
            <Text fontSize="16px" fontWeight="bold" mb="0px">
                {props.heroText2}
            </Text>
        </Flex>
    )
}

export default HeroCaption