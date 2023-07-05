import { 
    Box, 
    VStack,
    HStack,
    FormControl,
    Input, 
    Button,
    useToast
} from "@chakra-ui/react"
import FormHeader from "../components/molecules/FormHeader"
import { MyFormLabel } from "../components/atoms/WorldwideText" 
import { useFormik } from "formik"
import Axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

function PartnerDashLogo(){
    const { user } = useAuthContext()
    const toast = useToast()
    const { handleSubmit, setFieldValue} = useFormik({
        initialValues: {
            image: null
        },
        onSubmit: async (values, {resetForm}) => {
            const formData = new FormData()
            formData.append("image", values.image)
            try {
                await Axios.post("/api/partnerDashboard/logoImg", formData,{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                toast({
                    title: 'Successful',
                    description: `Added Logo Successful`,
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                });
                // console.log(values)
                resetForm()
            } catch (error) {
                // Handle upload error
                console.log("Error")
            }
        }
    })
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFieldValue("image", file);
    };
    return(
        <Box bg="fypBG.2" minH="70vh" pt="30px">
        <Box bg="fypBG.1" px="40px" m="36px auto" pt="30px" pb="40px" rounded="lg" boxShadow='md' w="740px">
            <FormHeader 
                formTitle = "Add Logo"
            />
            <form autoComplete="off" onSubmit={handleSubmit}>
                <VStack width="100%" spacing="1rem" alignItems="center">
                    <HStack width="100%" spacing="40px" > 
                        <FormControl isRequired>
                            <MyFormLabel htmlFor="image" color="fypBlue.1" mb="0px">Logo File</MyFormLabel>
                            <Input 
                                id="image"
                                name="image"
                                type="file"
                                accept="/image/*"
                                size="sm"
                                bg="fypBG.1"
                                onChange={handleFileChange}
                            />
                        </FormControl>
                    </HStack>
                    <Button type="submit" colorScheme="blue" p="10px 25px" alignSelf="flex-end">
                        Add
                    </Button>
                </VStack>
            </form>
        </Box>
        </Box>
    )
}

export default PartnerDashLogo