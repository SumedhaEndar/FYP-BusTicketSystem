import { 
    Image, 
} from "@chakra-ui/react";

function RenderStar(props){
    return(
        <Image objectFit='cover' src={props.starFill} />
    )
}

export default RenderStar