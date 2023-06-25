import {
    Box,
    forwardRef
} from "@chakra-ui/react"

// function EnrichBox(props){
//     return(
//         <Box boxShadow='xs' p='1' rounded='md' bg='white' textAlign='center' border='1px' borderColor='blue.500'>
//             {props.children}
//         </Box>
//     )
// }

const EnrichBox = forwardRef((props, ref)=> (
    <Box boxShadow='xs' px='12px' py="10px" rounded='md' bg='white' textAlign='center' border='1px' borderColor='blue.500' ref={ref} {...props}/>
))

export {
    EnrichBox
}