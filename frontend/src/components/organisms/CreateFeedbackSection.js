import { 
    Box, 
    FormControl, 
    FormErrorMessage,
    HStack, 
    VStack, 
    Input, 
    Select,
    Textarea,
    Button,
    Text,
    useColorModeValue,
    useToast
} from "@chakra-ui/react"
import { useFormik } from "formik"
import Axios from "axios";

import { SectionTitle, MyFormLabel } from "../atoms/WorldwideText"
import { feedbackSchema } from "../../schemas/feedbackSchema"

function CreateFeedbackSection() {
    const toast = useToast()
    const {values, errors, touched, handleChange, handleSubmit} = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            feedback: "Inquiry",
            subject: "",
            message: "",
        },
        validationSchema: feedbackSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await Axios.post("api/customers/feedback", values)
                // console.log('Response:', response.data);
                toast({
                    title: 'Successful',
                    description: `Feedback Sent Successful`,
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                });
                resetForm()
            }
            catch (error) {
                // console.log("Error")
                toast({
                    title: 'Error',
                    description:  "Feedback Sent Failed",
                    status: 'error',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
    })

    const errorBorderColor = useColorModeValue('gray.300', 'whiteAlpha.400');
    // console.log(errors)
    return(
        <Box background="fypBG.2" pt="20px" pb="40px">
            <SectionTitle textAlign="center" mb="1rem">Feedback to Us</SectionTitle>
            <form autoComplete="off" onSubmit={handleSubmit} noValidate>
                <VStack width="45%" margin="auto" spacing="1rem">
                    <HStack width="100%" spacing="30px"> 
                        <FormControl 
                            isRequired 
                            isInvalid={touched.name && errors.name}
                            h={((touched.name && errors.name)||(touched.email && errors.email)) ? "80px" : ""}
                        >
                            <MyFormLabel htmlFor="name">Name</MyFormLabel>
                            <Input 
                                id="name"
                                name="name"
                                type="text"
                                size="sm"
                                bg="fypBG.1"
                                placeholder="Name"
                                value={values.name}
                                onChange={handleChange}
                                _invalid={{ borderColor: errorBorderColor }}
                            />
                            {touched.name && errors.name && (
                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl 
                            isRequired 
                            isInvalid={touched.email && errors.email}
                            h={((touched.name && errors.name)||(touched.email && errors.email)) ? "80px" : ""}
                        >
                            <MyFormLabel htmlFor="email">Email</MyFormLabel>
                            <Input 
                                id="email"
                                name="email"
                                type="email"
                                size="sm"
                                bg="fypBG.1"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                _invalid={{ borderColor: errorBorderColor }}
                            />
                            {touched.email && errors.email && (
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            )}
                        </FormControl>
                    </HStack>
                    <HStack width="100%" spacing="30px" >
                        <FormControl 
                            isRequired 
                            isInvalid={touched.mobile && errors.mobile}
                            h={(touched.mobile && errors.mobile) ? "80px" : ""}
                        >
                            <MyFormLabel htmlFor="mobile">Mobile No</MyFormLabel>
                            <Input 
                                id="mobile"
                                name="mobile"
                                type="text"
                                size="sm"
                                bg="fypBG.1"
                                placeholder="Mobile No"
                                value={values.mobile}
                                onChange={handleChange}
                                _invalid={{ borderColor: errorBorderColor }}
                            />
                            {touched.mobile && errors.mobile && (
                                <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            h={(touched.mobile && errors.mobile) ? "80px" : ""}
                        >
                            <MyFormLabel htmlFor="feedback">Type of Feedback</MyFormLabel>
                            <Select 
                                size="sm" 
                                bg="fypBG.1" 
                                id="feedback" 
                                name="feedback" 
                                value={values.feedback} 
                                onChange={handleChange}
                            >
                                <option value="Inquiry">Inquiry / Request</option>
                                <option value="Compliment">Compliment</option>
                                <option value="Complain">Complain</option>
                                <option value="Others">Others</option>
                            </Select>
                        </FormControl>
                    </HStack>
                    <FormControl isRequired isInvalid={touched.subject && errors.subject}>
                        <MyFormLabel htmlFor="subject">Subject</MyFormLabel>
                        <Input 
                            id="subject"
                            name="subject"
                            type="text"
                            size="sm"
                            bg="fypBG.1"
                            placeholder="Subject"
                            value={values.subject}
                            onChange={handleChange}
                            _invalid={{ borderColor: errorBorderColor }}
                        />
                        <FormErrorMessage>{errors.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl pb="10px" isRequired isInvalid={touched.message && errors.message}>
                        <MyFormLabel htmlFor="message">Message</MyFormLabel>
                        <Textarea 
                            id="message" 
                            name="message"
                            placeholder="Message" 
                            bg="fypBG.1"
                            size="sm"
                            h="150px"
                            value={values.message}
                            onChange={handleChange}
                            _invalid={{ borderColor: errorBorderColor }}
                        />
                        <FormErrorMessage>{errors.message}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" colorScheme="blue" p="10px 25px" alignSelf="flex-start" alignItems="baseline" borderRadius="30px">
                        <Text fontSize="1rem" fontWeight="semibold">Submit</Text>
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}

export default CreateFeedbackSection