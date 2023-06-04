import {
    Box,
    FormControl,
    Input,
    Button,
    Flex,
    useToast,
    FormErrorMessage
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import Axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'

import { SectionTitle, MyFormLabel } from "../components/atoms/WorldwideText"
import FormHeader from "../components/molecules/FormHeader"
import { adminLoginSchema } from "../schemas/adminSchema";

function AdminLogin() {
    const toast = useToast()
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: adminLoginSchema,
        onSubmit: async (values) => {
            try {
                const response = await Axios.post("api/admins/login", values)
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
                navigate('/admin-dash-profile')
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
        <Flex bg="fypBG.2" pt="20px" pb="40px" alignItems="center" direction="column">
            <SectionTitle textAlign="center" mb="0.75rem">Admin Login</SectionTitle>
            <Box bg="fypBG.1" px="40px" mb="10px" py="30px" rounded="lg" boxShadow='md' w="380px">
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
            </Box>
        </Flex>
    )
}


export default AdminLogin