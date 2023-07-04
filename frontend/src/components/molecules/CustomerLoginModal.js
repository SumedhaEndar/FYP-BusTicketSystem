import {
    Box,
    FormControl,
    Input,
    Button,
    Text,
    useToast,
    FormErrorMessage
} from "@chakra-ui/react"
import { useFormik } from "formik"
import Axios from "axios";
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from "react-router-dom"
import { MyFormLabel } from "../atoms/WorldwideText";
import FormHeader from "./FormHeader"
import { customerLoginSchema } from "../../schemas/customerSchema";

function CustomerLoginModal(){
    const toast = useToast()
    const {dispatch} = useAuthContext()
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: customerLoginSchema,
        onSubmit: async (values) => {
            try {
                const response = await Axios.post("api/customers/login", values)
                const {data} = response
                toast({
                    title: 'Login Successful',
                    description: `Welcome ${data.name}`,
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                });
                localStorage.setItem('user', JSON.stringify(data))
                dispatch({type: 'LOGIN', payload: data})
            }
            catch(error) {
                console.log("Error")
                toast({
                    title: 'Error',
                    description: "Invalid email or password",
                    status: 'error',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
    })
    return(
        <Box bg="fypBG.1" px="40px" m="5px auto" py="30px" rounded="lg" boxShadow='lg' w="380px">
            <FormHeader 
                welcomeText = "Welcome back"
                formTitle = "Login to your account"
            />
            <form autoComplete="off" onSubmit={handleSubmit} noValidate>
                <FormControl mb="20px" isRequired isInvalid={errors.email && touched.email}>
                    <MyFormLabel htmlFor="email" color="fypBlue.1" mb="0px">Email Address</MyFormLabel>
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
                <Button type="submit" colorScheme="blue" width="full" mt="10px" mb="30px">
                    Login
                </Button>
            </form>
            <Text fontSize="0.8rem" textAlign="center" mb="0px">Don't have an account ?
                <Link to="/customer-register"> 
                    <Text as="span" color="fypBlue.1" ml="10px" fontWeight="bold">Join us today</Text>
                </Link>
            </Text>
        </Box>
    )
}

export default CustomerLoginModal