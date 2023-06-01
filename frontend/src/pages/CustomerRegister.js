import {
    Box,
    FormControl,
    Input,
    Button,
    Flex,
    Text,
    FormErrorMessage,
    useToast
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import Axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'

import { SectionTitle, MyFormLabel } from "../components/atoms/WorldwideText"
import FormHeader from "../components/molecules/FormHeader"
import { customerRegisterSchema } from "../schemas/customerSchema"

function CustomerRegister() {
    const toast = useToast()
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: customerRegisterSchema,
        onSubmit: async (values) => {
            try {
                const response = await Axios.post("api/customers/register", values)
                const {data} = response
                toast({
                    title: 'Successful',
                    description: "Account created",
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                });
                localStorage.setItem('user', JSON.stringify(data))
                dispatch({type: 'LOGIN', payload: data})
                navigate('/customer-dash-profile')
            }
            catch(error) {
                console.log("Error")
                toast({
                    title: 'Error',
                    description: "Email already existed",
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
            <SectionTitle textAlign="center" mb="0.75rem">Customer Register</SectionTitle>
            <Box bg="fypBG.1" px="40px" mb="10px" py="30px" rounded="lg" boxShadow='md' w="380px">
                <FormHeader 
                    welcomeText = "Welcome new Customer"
                    formTitle = "Create your account"
                />
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <FormControl mb="20px" isRequired isInvalid={errors.name && touched.name}>
                        <MyFormLabel htmlFor="name" color="fypBlue.1" mb="0px">Name</MyFormLabel>
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
                    <FormControl mb="20px"  isRequired isInvalid={errors.email && touched.email}>
                        <MyFormLabel htmlFor="email" color="fypBlue.1" mb="0px">Email Address</MyFormLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            size="sm"
                            placeholder="Email"
                            values={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isRequired isInvalid={errors.mobile && touched.mobile}>
                        <MyFormLabel htmlFor="mobile" color="fypBlue.1" mb="0px">Contact</MyFormLabel>
                        <Input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            size="sm"
                            placeholder="Contact"
                            value={values.mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isRequired isInvalid={errors.password && touched.password}>
                        <MyFormLabel htmlFor="password" color="fypBlue.1" mb="0px">Password</MyFormLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            size="sm"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isRequired isInvalid={errors.confirmPassword && touched.confirmPassword}>
                        <MyFormLabel htmlFor="confirmPassword" color="fypBlue.1" mb="0px">Confirm Password</MyFormLabel>
                        <Input
                            id="confirmPassword" 
                            name="confirmPassword"
                            type="password"
                            size="sm" 
                            placeholder="Confirm Password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="full" mt="10px" mb="30px">
                        Register
                    </Button>
                </form>
                <Text fontSize="0.8rem" textAlign="center" mb="0px">Already have an account ?
                    <Link to="/customer-login"> 
                        <Text as="span" color="fypBlue.1" ml="10px" fontWeight="bold">Login</Text>
                    </Link>
                </Text>
            </Box>
        </Flex>
    )
}


export default CustomerRegister