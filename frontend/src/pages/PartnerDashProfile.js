import {
    Box,
    FormControl,
    Input,
    Textarea,
    Button,
    Flex,
    FormErrorMessage,
    useToast,
    Text, VStack,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import Axios from "axios";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { MyFormLabel } from "../components/atoms/WorldwideText"
import FormHeader from "../components/molecules/FormHeader"
import { adminProfileSchema } from "../schemas/adminSchema";

function Title(props) {
    return (
        <Text fontSize="1.5rem" color="fypBlue.1" textAlign="center" fontWeight="bold">
            {props.children}
        </Text>
    )
}

function PartnerDashProfile() {
    const { user } = useAuthContext()
    const toast = useToast()

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setValues, setFieldValue } = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            address: "",
            description: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: adminProfileSchema,
        onSubmit: async (values) => {
            try {
                if (values.oldPassword === undefined) {
                    values.oldPassword = ""
                }
                await Axios.put(`/api/partnerDashboard/profile`, values, {
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
            catch (error) {
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

    useEffect(() => {
        const getProfile = async () => {
            const response = await Axios.get(`/api/partnerDashboard/profile`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setValues(response.data)
        }
        getProfile()
    }, [user, setValues])

    return (
        <Flex bg="fypBG.2" pt="20px" pb="40px" alignItems="center" direction="column">
            <Box bg="fypBG.1" px="40px" mb="10px" py="30px" rounded="lg" boxShadow='md' w="380px">
                <Title>My Profile</Title>
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
                    <FormControl mb="20px" isRequired isInvalid={errors.address && touched.address}>
                        <MyFormLabel htmlFor="address" color="fypBlue.1" mb="0px">Address</MyFormLabel>
                        <Textarea
                            id="address"
                            name="address"
                            placeholder="Address"
                            size="sm"
                            h="150px"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.address}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb="20px" isRequired isInvalid={errors.description && touched.description}>
                        <MyFormLabel htmlFor="description" color="fypBlue.1" mb="0px">Description</MyFormLabel>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            size="sm"
                            h="150px"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.description}</FormErrorMessage>
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
                        Save Changes
                    </Button>
                </form>
            </Box>
            <Box bg="fypBG.1" px="40px" mb="36px" pt="30px" pb="40px" rounded="lg" boxShadow='md' w="740px" mt="100px">
                <FormHeader
                    formTitle="Add a Profile Image"
                />
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <VStack width="100%" spacing="1rem" alignItems="center">

                        <FormControl isRequired>
                            <MyFormLabel htmlFor="image" color="fypBlue.1" mb="0px">Logo Image</MyFormLabel>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="/image/*"
                                size="sm"
                                bg="fypBG.1"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" p="10px 25px" alignSelf="flex-end">
                            Add
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>

    )
}

export default PartnerDashProfile