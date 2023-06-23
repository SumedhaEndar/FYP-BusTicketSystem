import { 
    Box, 
    VStack,
    HStack,
    FormControl,
    Input, 
    Button,
    useToast
} from "@chakra-ui/react"
import FormHeader from "../molecules/FormHeader"
import { MyFormLabel } from "../atoms/WorldwideText" 
import { useFormik } from "formik"
import Axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCarouselsContext } from "../../hooks/useCarouselsContext";

function AddCarouselForm(){
    const { user } = useAuthContext()
    const { dispatch } = useCarouselsContext()
    const toast = useToast()
    const {values, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues: {
            carouselName: "",
            image: null
        },
        onSubmit: async (values, {resetForm}) => {
            const formData = new FormData()
            formData.append("image", values.image)
            formData.append("carouselName", values.carouselName)
            try {
                const response = await Axios.post("/api/adminDashboard/carousels", formData,{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const {data} = response

                dispatch({
                    type: 'ADD_CAROUSEL',
                    payload: data
                })

                toast({
                    title: 'Successful',
                    description: `Added ${data.carousel_name} Successful`,
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
        <Box bg="fypBG.1" px="40px" mb="36px" pt="30px" pb="40px" rounded="lg" boxShadow='md' w="740px">
            <FormHeader 
                formTitle = "Add Carousels"
            />
            <form autoComplete="off" onSubmit={handleSubmit}>
                <VStack width="100%" spacing="1rem" alignItems="center">
                    <HStack width="100%" spacing="40px" > 
                        <FormControl isRequired>
                            <MyFormLabel htmlFor="carouselName" color="fypBlue.1" mb="0px">Carousel Name</MyFormLabel>
                            <Input 
                                id="carouselName"
                                name="carouselName"
                                type="text"
                                size="sm"
                                bg="fypBG.1"
                                value={values.carouselName}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <MyFormLabel htmlFor="image" color="fypBlue.1" mb="0px">Carousel Name</MyFormLabel>
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
    )
}

export default AddCarouselForm