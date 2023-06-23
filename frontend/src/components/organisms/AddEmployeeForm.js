import { 
    Box, 
    VStack,
    HStack,
    FormControl,
    FormErrorMessage,
    Input, 
    Button,
    useToast
} from "@chakra-ui/react"
import { useFormik } from "formik"
import Axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEmployeesContext } from "../../hooks/useEmployeesContext";
import { adminAddSchema } from "../../schemas/adminSchema"
import FormHeader from "../molecules/FormHeader"
import { MyFormLabel } from "../atoms/WorldwideText"    

function AddEmployeeForm() {
    const { user } = useAuthContext()
    const {dispatch} = useEmployeesContext()
    const toast = useToast()
    const {values, errors, touched, handleChange, handleSubmit} = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: ""
        },
        validationSchema: adminAddSchema,
        onSubmit: async(values, { resetForm }) => {
            try {
                const response = await Axios.post('api/adminDashboard/employees', values,{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const {data} = response

                dispatch({
                    type: 'ADD_EMPLOYEE',
                    payload: data
                })

                toast({
                    title: 'Successful',
                    description: `Added ${data.employee_name} Successful`,
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                });
                // console.log(values)
                resetForm()
            }
            catch(error){
                toast({
                    title: 'Error',
                    description:  "Email already existed",
                    status: 'error',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
    })
    return(
        <Box bg="fypBG.1" px="40px" mb="36px" pt="30px" pb="40px" rounded="lg" boxShadow='md' w="740px">
            <FormHeader 
                formTitle = "New Employee"
            />
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <VStack width="100%" spacing="1rem" alignItems="center">
                    <HStack width="100%" spacing="40px" > 
                        <FormControl 
                            isRequired
                            isInvalid={touched.name && errors.name}
                        >
                            <MyFormLabel htmlFor="name" color="fypBlue.1" mb="0px">Name</MyFormLabel>
                            <Input 
                                id="name"
                                name="name"
                                type="text"
                                size="sm"
                                bg="fypBG.1"
                                value={values.name}
                                onChange={handleChange}
                            />
                            {touched.name && errors.name && (
                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={touched.email && errors.email}
                        >
                            <MyFormLabel htmlFor="email" color="fypBlue.1" mb="0px">Email</MyFormLabel>
                            <Input 
                                id="email"
                                name="email"
                                type="text"
                                size="sm"
                                bg="fypBG.1"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {touched.email && errors.email && (
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            )}
                        </FormControl>
                    </HStack>
                    <HStack width="100%" spacing="40px"> 
                        <FormControl 
                            width="50%"
                            isRequired
                            isInvalid={touched.mobile && errors.mobile}
                        >
                            <MyFormLabel htmlFor="mobile" color="fypBlue.1" mb="0px">Contact</MyFormLabel>
                            <Input 
                                id="mobile"
                                name="mobile"
                                type="text"
                                size="sm"
                                bg="fypBG.1"
                                value={values.mobile}
                                onChange={handleChange}
                            />
                            {touched.mobile && errors.mobile && (
                                <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                            )}
                        </FormControl>
                        <Button type="submit" colorScheme="blue" p="10px 25px" alignSelf="flex-end" width="50%">
                            Submit
                        </Button>
                    </HStack>
                </VStack>
            </form>
        </Box>
    )
}

export default AddEmployeeForm