import {
    Box,
    FormControl,
    Input,
    Button,
    Flex,
    FormErrorMessage,
    useToast
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect } from "react";
import Axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { MyFormLabel } from "../components/atoms/WorldwideText"
import FormHeader from "../components/molecules/FormHeader"
import { customerProfileSchema } from "../schemas/customerSchema";

function CustomerDashProfile() {
    const { user } = useAuthContext()
    const toast = useToast()
    const {values, errors, touched, handleChange, handleSubmit, setValues, setFieldValue} = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: customerProfileSchema,
        onSubmit: async (values) => {
            try {
                if(values.oldPassword === undefined){
                    values.oldPassword = ""
                }
                await Axios.put(`api/customerDashboard/profile/${user.id}`, values, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                toast({
                    title: 'Successful',
                    description: "Account updated",
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                });

                // Retrieve the existing data from localStorage
                const existingDataString = localStorage.getItem('user');

                // Parse the existing data from a string to an object
                const existingData = JSON.parse(existingDataString);
                
                // Modify the properties
                existingData.name = values.name;
                existingData.email = values.email;

                // Convert the modified object back to a string
                const updatedDataString = JSON.stringify(existingData);

                // Update the item in localStorage
                localStorage.setItem('user', updatedDataString)

                setFieldValue('oldPassword', "")
                setFieldValue('newPassword', "")
                setFieldValue('confirmPassword', "")

                console.log(values)
            }
            catch(error) {
                toast({
                    title: 'Error',
                    description: "Updated Unsuccessful",
                    status: 'error',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
    })

    useEffect(()=>{
        const getProfile = async()=>{
            const response = await Axios.get(`api/customerDashboard/profile/${user.id}`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setValues(response.data)
        }
        getProfile()
    },[user, setValues])

    return(
        <Flex bg="fypBG.2" pt="40px" pb="40px" alignItems="center" direction="column">
            <Box bg="fypBG.1" px="40px" mb="10px" py="30px" rounded="lg" boxShadow='md' w="380px">
                <FormHeader 
                    formTitle = "My Profile"
                />
                <form autoComplete="off" onSubmit={handleSubmit} noValidate>
                    <FormControl mb="20px" isInvalid={errors.name && touched.name}>
                        <MyFormLabel htmlFor="name" color="fypBlue.1" mb="0px">Name</MyFormLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            size="sm"
                            value={values.name}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isInvalid={errors.email && touched.email}>
                        <MyFormLabel htmlFor="email" color="fypBlue.1" mb="0px">Email Address</MyFormLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            size="sm"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isInvalid={errors.mobile && touched.mobile}>
                        <MyFormLabel htmlFor="mobile" color="fypBlue.1" mb="0px">Contact</MyFormLabel>
                        <Input
                            id="mobile"
                            name="mobile"
                            type="text"
                            size="sm"
                            value={values.mobile}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isInvalid={errors.oldPassword && touched.oldPassword}>
                        <MyFormLabel htmlFor="oldPassword" color="fypBlue.1" mb="0px">Current Password</MyFormLabel>
                        <Input
                            id="oldPassword"
                            name="oldPassword"
                            type="password"
                            size="sm"
                            value={values.oldPassword}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.oldPassword}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isInvalid={errors.newPassword && touched.newPassword}>
                        <MyFormLabel htmlFor="oldPassword" color="fypBlue.1" mb="0px">New Password</MyFormLabel>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            size="sm"
                            value={values.newPassword}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isInvalid={errors.confirmPassword && touched.confirmPassword}>
                        <MyFormLabel htmlFor="oldPassword" color="fypBlue.1" mb="0px">Confirmation Password</MyFormLabel>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            size="sm"
                            value={values.confirmPassword}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="full" mt="10px" mb="10px">
                        Update
                    </Button>
                </form>
            </Box>
        </Flex>
    )
}

export default CustomerDashProfile