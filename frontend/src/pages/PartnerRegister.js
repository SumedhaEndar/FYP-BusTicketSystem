import {
    Box,
    FormControl,
    Input,
    Textarea,
    Button,
    Flex,
    FormErrorMessage,
    useToast
} from "@chakra-ui/react"
import { useFormik } from "formik"
import Axios from "axios";

import { SectionTitle, MyFormLabel } from "../components/atoms/WorldwideText"
import FormHeader from "../components/molecules/FormHeader"
import { partnerRegisterSchema } from "../schemas/partnerSchema"

function PartnerRegister(){
    const toast = useToast()
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            name: "",
            email: "",
            contact: "",
            address: "",
        },
        validationSchema: partnerRegisterSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                await Axios.post("api/partners/register", values)
                toast({
                    title: 'Successful',
                    description: "Register Sent",
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                });
                resetForm()
            }
            catch(error) {
                // console.log("Error")
                toast({
                    title: 'Error',
                    description: "An Error Occured",
                    status: 'error',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
    })
    return(
        <Flex bg="fypBG.2" pt="20px" pb="40px" alignItems="center" direction="column">
            <SectionTitle textAlign="center" mb="0.75rem">Partner Registration</SectionTitle>
            <Box bg="fypBG.1" px="40px" mb="10px" py="30px" rounded="lg" boxShadow='md' w="380px">
                <FormHeader 
                    welcomeText = "Welcome new partner"
                    formTitle = "Become a partner"
                />
                <form autoComplete="off" onSubmit={handleSubmit} noValidate>
                    <FormControl mb="20px" isRequired isInvalid={errors.name && touched.name}>
                        <MyFormLabel htmlFor="name" color="fypBlue.1" mb="0px">Company Name</MyFormLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            size="sm"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isRequired isInvalid={errors.email && touched.email}>
                        <MyFormLabel htmlFor="email" color="fypBlue.1" mb="0px">Company Email</MyFormLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            size="sm"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isRequired isInvalid={errors.contact && touched.contact}>
                        <MyFormLabel htmlFor="contact" color="fypBlue.1" mb="0px">Company Contact</MyFormLabel>
                        <Input
                            id="contact"
                            name="contact"
                            type="tel"
                            size="sm"
                            placeholder="Contact"
                            value={values.contact}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage> {errors.contact}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isRequired isInvalid={errors.address && touched.address}>
                        <MyFormLabel htmlFor="address" color="fypBlue.1" mb="0px">Station Address</MyFormLabel>
                        <Textarea
                            id="address"
                            name="address"
                            placeholder="Company Address"
                            size="sm"
                            h="150px"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.address}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="full" mt="10px" mb="10px">
                        Register
                    </Button>
                </form>
            </Box>
        </Flex>
    )
}

export default PartnerRegister