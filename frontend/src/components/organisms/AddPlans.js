import {
    Box,
    Flex,
    // FormControl,
    HStack,
    Select,
    // Text,
    Input,
    Button,
} from "@chakra-ui/react"
import TimePicker from 'react-bootstrap-time-picker';
import { useState, useEffect } from "react"
import Axios from "axios";
import FormHeader from "../molecules/FormHeader"
import { MyFormLabel } from "../atoms/WorldwideText"

const today = new Date().toISOString().split('T')[0];

function AddPlans(props){
    const [stations, setStations] = useState({})

    useEffect(()=>{
        const getStations = async()=>{
            const response = await Axios.get('api/customers/stations')
            setStations(response.data)
        }
        getStations()
    }, [])

    return(
        <Box bg="fypBG.1" px="30px" mb="36px" pt="30px" pb="40px" rounded="lg" boxShadow='md' w="800px">
            <FormHeader 
                formTitle = "Plan Trips"
            />
            <Flex direction="column">
                <HStack spacing="10px" pb="10px">
                    <Box width="40%">
                        <MyFormLabel htmlFor="depart" color="fypBlue.1" mb="0px" fontWeight="bold">Depart From:</MyFormLabel>
                        {   !props.set ?
                            <Select
                                name="depart"
                                size="md"
                                bg="fypBG.1"
                                placeholder="From"
                                value={props.departFrom}
                                onChange={props.handleChangeDepartFrom}
                            >
                                {Object.entries(stations)
                                        .map(([state, districts]) => (
                                        <optgroup key={state} label={state}>
                                            {districts.map((district) => (
                                                <option key={district} value={district}>{district}</option>
                                            ))}
                                        </optgroup>
                                ))}
                            </Select>
                            :
                            <Input 
                                value={props.departFrom}
                                isReadOnly
                            />
                        }
                    </Box>
                    <Box width="40%">
                        <MyFormLabel htmlFor="arrive" color="fypBlue.1" mb="0px" fontWeight="bold">Arrive To:</MyFormLabel>
                        {   !props.set ?
                            <Select
                                name="arrive"
                                size="md"
                                bg="fypBG.1"
                                placeholder="To"
                                value={props.arriveTo}
                                onChange={props.handleChangeArriveTo}
                            >
                                {Object.entries(stations)
                                        .map(([state, districts]) => (
                                        <optgroup key={state} label={state}>
                                            {districts.map((district) => (
                                                <option key={district} value={district}>{district}</option>
                                            ))}
                                        </optgroup>
                                ))}
                            </Select>
                            :
                            <Input 
                                value={props.arriveTo}
                                isReadOnly
                            />
                        }
                    </Box>
                    <Box width="20%">
                        <MyFormLabel htmlFor="price" color="fypBlue.1" mb="0px" fontWeight="bold">Price:</MyFormLabel>
                        <Input 
                            name="price"
                            type="number"
                            size="md"
                            bg="fypBG.1"
                            placeholder="0"
                            value={props.price}
                            onChange={props.handleChangePrice}
                        />             
                    </Box>
                </HStack>
                <HStack mt="10px">
                    <Box width="40%">
                        <MyFormLabel htmlFor="fromDate" color="fypBlue.1" mb="0px" fontWeight="bold">Start:</MyFormLabel>
                        <Input 
                            name="fromDate"
                            type="date"
                            size="md"
                            bg="fypBG.1"
                            min={today}
                            value={props.fromDate}
                            onChange={props.handleChangeFromDate}
                            isReadOnly={props.set}
                        />             
                    </Box>
                    <Box width="40%">
                        <MyFormLabel htmlFor="toDate" color="fypBlue.1" mb="0px" fontWeight="bold">End:</MyFormLabel>
                        <Input 
                            name="toDate"
                            type="date"
                            size="md"
                            bg="fypBG.1"
                            min={today}
                            value={props.toDate}
                            onChange={props.handleChangeToDate}
                            isReadOnly={props.set}
                        />             
                    </Box>
                    <Box width="20%">
                        <MyFormLabel color="fypBlue.1" mb="0px" fontWeight="bold">Time:</MyFormLabel>
                        <TimePicker 
                            value={props.selectedTime} 
                            onChange={props.handleChangeTime}
                        />
                    </Box>
                </HStack>
                <HStack mt="30px">
                    {
                        !props.set ?
                        <Button colorScheme="blue" p="10px 40px" onClick={props.handleClickSet}>
                            Set
                        </Button>
                        :
                        <>
                            <Button colorScheme="blue" p="10px 40px" onClick={props.handleClickAdd}>
                                Add
                            </Button>
                            <Button colorScheme="red" p="10px 40px" onClick={props.handleClickReset}>
                                Reset
                            </Button>
                        </>
                    }
                </HStack>
            </Flex>
        </Box>
    )
}

export default AddPlans