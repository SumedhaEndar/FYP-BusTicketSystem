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
import { useEffect, useState } from "react"
import Axios from "axios";

const today = new Date().toISOString().split('T')[0];

function SearchSection(){
    const [stations, setStations] = useState({})
    
    useEffect(()=>{
        const getStations = async()=>{
            const response = await Axios.get('api/customers/stations')
            setStations(response.data)
        }
        getStations()
    }, [])

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
                                {Object.entries(stations)
                                    .map(([state, districts]) => (
                                    <optgroup key={state} label={state}>
                                        {districts.map((district) => (
                                            <option key={district}>{district}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Select>
                        </FormControl>
                        <ArrowForwardIcon fontSize="xl"/>
                        <FormControl 
                            isRequired
                            isInvalid={touched.arrive && errors.arrive}
                        >
                            <Select 
                                id="arrive"
                                name="arrive"
                                size="md"
                                bg="fypBG.1"
                                placeholder="To"
                                value={values.arrive}
                                onChange={handleChange}
                            >
                                {Object.entries(stations)
                                    .map(([state, districts]) => (
                                    <optgroup key={state} label={state}>
                                        {districts.map((district) => (
                                            <option key={district}>{district}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Select>
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
                                min={today}
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