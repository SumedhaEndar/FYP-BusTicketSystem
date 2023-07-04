import {
    Flex,
    Box,
    HStack,
    VStack,
    IconButton,
} from "@chakra-ui/react"
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import Axios from "axios";
import AddPlans from "../components/organisms/AddPlans"
import { PlanListTitle } from "../components/atoms/WorldwideText";
import { convertToTime } from "../utils/convertTimeUtils";
import { DeleteIcon, CheckIcon } from '@chakra-ui/icons'

function PartnerDashPlans(){
    const { user } = useAuthContext()

    const [departFrom, setDepartFrom] = useState("")
    const [arriveTo, setArriveTo] = useState("")
    const [price, setPrice] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [selectedTime, setSelectedTime] = useState(0)
    const [set, setSet] = useState(false)
    const [plan, setPlan] = useState([])

    const handleChangeDepartFrom = (e) => {
        setDepartFrom(e.target.value)
    }
    const handleChangeArriveTo = (e) => {
        setArriveTo(e.target.value)
    }
    const handleChangePrice = (e) => {
        setPrice(e.target.value)
    }
    const handleChangeFromDate = (e) => {
        setFromDate(e.target.value)
    }
    const handleChangeToDate = (e) => {
        setToDate(e.target.value)
    }
    const handleChangeTime = (time) => {
        setSelectedTime(time)
    }
    const handleClickSet = () => {
        setSet(true)
    }
    const handleClickReset = () => {
        setSet(false)
        setDepartFrom("")
        setArriveTo("")
        setPrice("")
        setFromDate("")
        setToDate("")
        setSelectedTime(0)
        setPlan([])
    }
    const handleClickAdd = () => {
        const newPlan = {
            departFrom,
            arriveTo,
            price,
            fromDate,
            toDate,
            selectedTime,
        }
        setPlan(prev => [...prev, newPlan])
    }
    const deleteObject = (index) => {
        setPlan(prev => prev.filter((_, i)=> i !== index))
    }
    const publishPlans = async(object, index) => {
        await Axios.post(`/api/partnerDashboard/plans`, object, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        setPlan(prev => prev.filter((_, i)=> i !== index))
    }

    return(
        <Flex as="main" bg="fypBG.2" p="40px" h="100%" direction="column" alignItems="center">
            <AddPlans 
                set = {set}
                departFrom = {departFrom}
                arriveTo = {arriveTo}
                price = {price}
                fromDate = {fromDate}
                toDate = {toDate}
                selectedTime = {selectedTime}

                handleChangeDepartFrom = {handleChangeDepartFrom}
                handleChangeArriveTo = {handleChangeArriveTo}
                handleChangeFromDate = {handleChangeFromDate}
                handleChangeToDate = {handleChangeToDate}
                handleChangePrice = {handleChangePrice}
                handleChangeTime = {handleChangeTime}
                handleClickSet = {handleClickSet}
                handleClickReset = {handleClickReset}
                handleClickAdd = {handleClickAdd}
            />
            {
                plan.map((object, index)=> (
                    <Flex key={index} bg="fypBG.1" px="30px" mb="20px" py="25px" rounded="lg" boxShadow='lg' w="800px" justifyContent="space-between" alignItems="center">
                        <VStack>
                            <HStack>
                                <PlanListTitle>{object.departFrom}</PlanListTitle>
                                <ArrowForwardIcon />
                                <PlanListTitle>{object.arriveTo}</PlanListTitle>
                            </HStack>
                            <HStack>
                                <PlanListTitle>{object.fromDate}</PlanListTitle>
                                <ArrowForwardIcon />
                                <PlanListTitle>{object.toDate}</PlanListTitle>
                            </HStack>
                        </VStack>
                        <PlanListTitle>RM {object.price}</PlanListTitle>
                        <PlanListTitle>{convertToTime(object.selectedTime)}</PlanListTitle>
                        <Box>
                            <IconButton 
                                icon={<DeleteIcon />}
                                ml="10px"
                                bg="red.200"
                                onClick={()=>deleteObject(index)}
                            />
                            <IconButton 
                                icon={<CheckIcon />}
                                ml="10px"
                                bg="green.200"
                                onClick={()=>publishPlans(object,index)}
                            />
                        </Box>
                    </Flex>
                ))
            }
        </Flex>
    )
}

export default PartnerDashPlans