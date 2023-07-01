import {
    Text,
    FormLabel,
    forwardRef
} from "@chakra-ui/react"

// Section
const SectionTitle = forwardRef((props, ref)=> (
    <Text color="fypBlue.1" fontSize="2rem" as="h2" ref={ref} {...props}/>
))


// Form Label
const MyFormLabel = forwardRef((props, ref)=> (
    <FormLabel fontSize="1rem" mb="5px" ref={ref} {...props}/>
))


// FormTitle
const FormTitle = forwardRef((props, ref)=> (
    <Text color="fypBlue.1" fontSize="1.5rem" fontWeight="bold" mb="1.5rem" ref={ref} {...props}/>
))


// Plans List Text
const PlanListTitle = forwardRef((props, ref) => (
    <Text fontSize="1.25rem" fontWeight="bold" mb="0px" ref={ref} {...props}/>
))

export {
    SectionTitle,
    MyFormLabel,
    FormTitle,
    PlanListTitle
}