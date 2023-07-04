import { 
    Flex,
    Card, 
    CardHeader, 
    CardBody, 
    Text,
    Button,
    HStack,
} from '@chakra-ui/react'
import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import Axios from "axios";
import TripCard from "../components/molecules/TripCard"
import FilterOptions from '../components/molecules/FilterOptions'
import { formatDate } from "../utils/convertTimeUtils";
import ScheduleItem from '../components/organisms/ScheduleItem';

const departTimeOptions = ["Morning", "Afternoon", "Evening"]

function BusSchedule(){
    const location = useLocation()
    const searchData = location.state.searchData
    const [departDate, setDepartDate] = useState(searchData.date)
    const [selectedDepartTime, setSelectedDepartTime] = useState(0);
    const [selectedBus, setSelectedBus] = useState('')
    const [busSchedule, setBusSchedule] = useState([])
    const [busOperator, setBusOperator] = useState([])

    const increaseDate = () => {
        const nextDay = new Date(departDate)
        nextDay.setDate(nextDay.getDate()+1)
        setDepartDate(formatDate(nextDay))
        handleReset()
    }
    const decreaseDate = () => {
        const prevDay = new Date(departDate)
        prevDay.setDate(prevDay.getDate()-1)
        
        const today = new Date()
        
        if(prevDay > today){
            setDepartDate(formatDate(prevDay))
        }
        else {
            setDepartDate(formatDate(today))
        }
        handleReset()
    }
    const handleDepartTime = (value) => {
        setSelectedDepartTime(value);
    };
    const handleSelectedBus = (value) => {
        setSelectedBus(value)
    }
    const handleReset = () => {
        setSelectedBus('')
        setSelectedDepartTime(0)
    }
    useEffect(()=>{
        const getSchedule = async() => {
            const response = await Axios.get(`api/customers/schedules?date=${departDate}&origin=${searchData.depart.split(',')[0]}&destination=${searchData.arrive.split(',')[0]}`)
            setBusOperator([...new Set(response.data.map(obj => obj.partner_name))])
            if(selectedBus === '' && selectedDepartTime === 0){
                setBusSchedule(response.data)
            }
            if(selectedBus !== '' && selectedDepartTime === 0){
                const schedule = response.data
                setBusSchedule(schedule.filter((busSchedule)=> busSchedule.partner_name === selectedBus))
            }
            // 18000 = 06:00 
            // 43200 = 12:00 
            // 64800 = 18:00 
            // 82800 = 22:00
            if(selectedBus === '' && selectedDepartTime !== 0){
                const schedule = response.data
                if(selectedDepartTime === "Morning"){
                    setBusSchedule(schedule.filter((busSchedule)=> busSchedule.plan_time >= 18000 && busSchedule.plan_time < 43200))
                }
                else if(selectedDepartTime === "Afternoon"){
                    setBusSchedule(schedule.filter((busSchedule)=> busSchedule.plan_time >= 43200 && busSchedule.plan_time < 64800))
                }
                else {
                    setBusSchedule(schedule.filter((busSchedule)=> busSchedule.plan_time >= 64800 && busSchedule.plan_time < 82800))
                }
            }
            if(selectedBus !== '' && selectedDepartTime !== 0){
                const schedule = response.data
                const scheduleByBus = schedule.filter((busSchedule)=> busSchedule.partner_name === selectedBus)
                if(selectedDepartTime === "Morning"){
                    setBusSchedule(scheduleByBus.filter((busSchedule)=> busSchedule.plan_time >= 18000 && busSchedule.plan_time < 43200))
                }
                else if(selectedDepartTime === "Afternoon"){
                    setBusSchedule(scheduleByBus.filter((busSchedule)=> busSchedule.plan_time >= 43200 && busSchedule.plan_time < 64800))
                }
                else {
                    setBusSchedule(scheduleByBus.filter((busSchedule)=> busSchedule.plan_time >= 64800 && busSchedule.plan_time < 82800))
                }
            }
        }
        getSchedule()
    },[searchData, departDate, selectedBus, selectedDepartTime])

    const sortedBusSchedule = busSchedule.sort((a,b) => a.plan_time - b.plan_time)

    return(
        <Flex direction="column" alignItems="center" bg="fypBG.2" minH="100vh" py="20px">
            <TripCard 
                departLocation = {searchData.depart}
                arriveLocation = {searchData.arrive}
                departDate = {departDate}

                OnIncreaseDate = {increaseDate}
                OnDecreaseDate = {decreaseDate}
            />
            {
                busSchedule.length !== 0 
                ?
                <Flex alignItems="flex-start" width="95%" justifyContent="center" gap="30px">
                    <Card width="300px" mt="20px" borderRadius="5px">
                        <CardHeader p="10px" mb="0px" bg="#E7ECF0">
                            <HStack justifyContent="space-between">
                                <Text fontSize="1rem" mb="0px">
                                    Filter
                                </Text>
                                <Button p="0px" fontSize="0.85rem" fontWeight="normal" colorScheme="none" color="blue" onClick={handleReset}>
                                    Reset
                                </Button>
                            </HStack>
                        </CardHeader>
                        <CardBody p="0px 15px 15px 15px">
                            <FilterOptions 
                                filterTitle="Depart Time"
                                options={departTimeOptions} 
                                selectedOption={selectedDepartTime} 
                                onOptionChange={handleDepartTime}
                            />
                            <FilterOptions 
                                filterTitle="Bus Operators"
                                options={busOperator} 
                                selectedOption={selectedBus} 
                                onOptionChange={handleSelectedBus}
                            />
                        </CardBody>
                    </Card>
                    <Flex direction="column">
                        {sortedBusSchedule.map((eachSchedule, index) => (
                            <ScheduleItem 
                                key={index}
                                eachSchedule = {eachSchedule}
                            />
                        ))}
                    </Flex>         
                </Flex>       
                :
                <Flex alignItems="center" mt="15px">No Bus Schedule</Flex>
            }
            
        </Flex>
    )
}

export default BusSchedule