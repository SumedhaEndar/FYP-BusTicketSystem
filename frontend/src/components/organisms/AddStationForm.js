import { 
    Box, 
    VStack,
    HStack,
    FormControl,
    FormErrorMessage,
    Input, 
    Button,
    Select,
    useToast
} from "@chakra-ui/react"
import FormHeader from "../molecules/FormHeader"
import { MyFormLabel } from "../atoms/WorldwideText" 
import { useFormik } from "formik"
import { stationSchema } from "../../schemas/stationSchema"
import Axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

function AddStationForm(){
    const { user } = useAuthContext()
    const toast = useToast()
    const {values, errors, touched, handleChange, handleSubmit} = useFormik({
        initialValues: {
            name: "",
            state: "",
            district: "",
            address: ""
        },
        validationSchema: stationSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                await Axios.post("api/adminDashboard/stations", values, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                toast({
                    title: 'Successful',
                    description: `Added ${values.name} Successful`,
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                });
                resetForm()
            }
            catch(error){
                toast({
                    title: 'Error',
                    description:  "Fail to add",
                    status: 'error',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                })
            }
            console.log(values)
        }
    })
    return(
        <Box bg="fypBG.1" px="40px" mb="36px" pt="30px" pb="40px" rounded="lg" boxShadow='md' w="740px">
            <FormHeader 
                formTitle = "Add Stations"
            />
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <VStack width="100%" spacing="1rem" alignItems="center">
                    <HStack width="100%" spacing="40px" > 
                        <FormControl 
                            isRequired
                            isInvalid={touched.name && errors.name}
                        >
                            <MyFormLabel htmlFor="name" color="fypBlue.1" mb="0px">Station Name</MyFormLabel>
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
                            isInvalid={touched.state && errors.state}
                        >
                            <MyFormLabel htmlFor="state" color="fypBlue.1" mb="0px">Station State</MyFormLabel>
                            <Select
                                id="state"
                                name="state"
                                size="sm"
                                bg="fypBG.1"
                                value={values.state}
                                onChange={handleChange}
                            >
                                <option value="" disabled></option>
                                <option value="Johor">Johor</option>
                                <option value="Kedah">Kedah</option>
                                <option value="Kelantan">Kelantan</option>
                                <option value="Kuala Lumpur">Kuala Lumpur</option>
                                <option value="Melaka">Melaka</option>
                                <option value="Negeri Sembilan">Negeri Sembilan</option>
                                <option value="Pahang">Pahang</option>
                                <option value="Penang">Penang</option>
                                <option value="Perak">Perak</option>
                                <option value="Perlis">Perlis</option>
                                <option value="Putrajaya">Putrajaya</option>
                                <option value="Selangor">Selangor</option>
                                <option value="Terengganu">Terengganu</option>
                            </Select>
                            {touched.state && errors.state && (
                                <FormErrorMessage>{errors.state}</FormErrorMessage>
                            )}
                        </FormControl>
                    </HStack>
                    <HStack width="100%" spacing="40px"> 
                        <FormControl 
                            isRequired
                            isInvalid={touched.district && errors.district}
                        >
                            <MyFormLabel htmlFor="district" color="fypBlue.1" mb="0px">Station District</MyFormLabel>
                            <Input 
                                id="district"
                                name="district"
                                type="text"
                                size="sm"
                                bg="fypBG.1"
                                value={values.district}
                                onChange={handleChange}
                            />
                            {touched.district && errors.district && (
                                <FormErrorMessage>{errors.district}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl 
                            isRequired
                            isInvalid={touched.address && errors.address}
                        >
                            <MyFormLabel htmlFor="address" color="fypBlue.1" mb="0px">Station Address</MyFormLabel>
                            <Input 
                                id="address"
                                name="address"
                                type="text"
                                size="sm"
                                bg="fypBG.1"
                                value={values.address}
                                onChange={handleChange}
                            />
                            {touched.address && errors.address && (
                                <FormErrorMessage>{errors.address}</FormErrorMessage>
                            )}
                        </FormControl>
                    </HStack>
                    <Button type="submit" colorScheme="blue" p="10px 25px" alignSelf="flex-end">
                        Submit
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}

export default AddStationForm