import {
    Box,
    Text,
    HStack,
    Input,
    FormControl,
    Button,
    Flex,
    Select,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { SectionTitle } from "../atoms/WorldwideText"
import { searchStationSchema } from "../../schemas/searchStationSchema"
import { ArrowForwardIcon } from "@chakra-ui/icons"
// import { useEffect, useState } from "react"

function SearchSection(){
    // const [stations, setStations] = useState([])
    // useEffect(()=>{

    // })
    const {values, errors, touched, handleChange, handleSubmit} = useFormik({
        initialValues: {
            depart: "",
            arrive: "",
            date: ""
        },
        validationSchema: searchStationSchema,
        onSubmit: (values)=>{
            console.log(values)
        }
    })
    return(
        <Box bg="fypBG.2" pt="20px" pb="40px">
            <SectionTitle textAlign="center">
                Search Buses
            </SectionTitle>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}> 
                <Flex 
                    w="75%" h="30vh" bg="#C8CFE2" 
                    m="15px auto 0px auto" 
                    border="4px solid #2D77CD"
                    direction="column"
                    justifyContent="center"
                >
                    <Box 
                        backgroundColor="#0A468C" 
                        width="100px" p="10px"
                        position="relative"
                        ml="50px"
                        mb="15px"
                    >
                        <Text color="white" textAlign="center" m="0px">Single Trip</Text>
                    </Box>
                    <HStack spacing="10px" px="50px" pb="10px"> 
                        <FormControl 
                            isRequired
                            isInvalid={touched.depart && errors.depart}
                        >
                            <Select 
                                id="depart"
                                name="depart"
                                size="md"
                                bg="fypBG.1"
                                placeholder="From"
                                value={values.depart}
                                onChange={handleChange}
                            >

                            </Select>
                        </FormControl>
                        <ArrowForwardIcon fontSize="xl"/>
                        <FormControl 
                            isRequired
                            isInvalid={touched.arrive && errors.arrive}
                        >
                            <Input 
                                id="arrive"
                                name="arrive"
                                type="text"
                                size="md"
                                bg="fypBG.1"
                                placeholder="To"
                                value={values.arrive}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl 
                            isRequired
                            isInvalid={touched.date && errors.date}
                        >
                            <Input 
                                id="date"
                                name="date"
                                type="date"
                                size="md"
                                bg="fypBG.1"
                                value={values.date}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" p="10px 25px" width="200px">
                            Search
                        </Button>
                    </HStack>
                </Flex>
            </form>
        </Box>
    )
}

export default SearchSection