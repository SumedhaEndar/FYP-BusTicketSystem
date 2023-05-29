import {
    Text
} from "@chakra-ui/react"
import { FormTitle } from "../atoms/WorldwideText"

function FormHeader(props) {
    return(
        <>
            {props.welcomeText && <Text mb="0.25rem">{props.welcomeText}</Text>}
            <FormTitle fontSize="1.5rem" color="fypBlue.1">{props.formTitle}</FormTitle>
        </>
    )
}

export default FormHeader