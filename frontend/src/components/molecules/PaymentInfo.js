import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Stack,
    Heading,
    HStack,
    Text,
    Radio,
    RadioGroup,
    Button,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import Axios from "axios";

function PaymentInfo({bookingSeatNums, ticketPerPrice, onSendData}){
    const { user } = useAuthContext()
    const [ pointsTokens, setPointsTokens ] = useState([])
    const [ pointsTokensUse, setPointsTokensUse] = useState({})

    useEffect(()=>{
        const getPointsTokens = async() => {
            const response = await Axios.get(`api/customerDashboard/enrich-points`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setPointsTokens(response.data)
        }
        getPointsTokens()
    },[user])

    const handleChange = (value) => {
        if(value === '1'){
            setPointsTokensUse({whichOne: 'Enrich', pointsUsed: 300, discounts: 6})
        }
        else if(value === '2'){
            setPointsTokensUse({whichOne: 'Enrich', pointsUsed: 600, discounts: 12})
        }
        else if(value === '3'){
            setPointsTokensUse({whichOne: 'Enrich', pointsUsed: 1200, discounts: 25})
        }
        else if(value === '4'){
            setPointsTokensUse({whichOne: 'Enrich', pointsUsed: 2400, discounts: 50})
        }
        else {
            // const refundDiscounts = {whichOne: 'Refund', tokens: 24, discounts: 50}
            const currentTotal = (bookingSeatNums*ticketPerPrice) + (1*bookingSeatNums)
            if(pointsTokens.customer_refund > currentTotal){
                setPointsTokensUse({whichOne: 'Refund', tokensUsed: currentTotal, discounts: currentTotal})
            }
            else {
                setPointsTokensUse({whichOne: 'Refund', tokensUsed: pointsTokens.customer_refund, discounts: pointsTokens.customer_refund})
            }
        }
    }
    
    const totalPrice = Object.keys(pointsTokensUse).length === 0 ? (bookingSeatNums*ticketPerPrice)+(1*bookingSeatNums) : (bookingSeatNums*ticketPerPrice)+(1*bookingSeatNums)-(pointsTokensUse.discounts)

    function hanldeClick(){
        onSendData(pointsTokensUse)
    }

    return(        
        <Card>
            <CardHeader bg="gray.200" py="15px">
                <Heading fontSize='1.15rem' mb="0px">Payment Info</Heading>
            </CardHeader>
            <CardBody pt="15px"> 
                <Stack spacing='20px'>
                    <HStack>
                        <Text mb="0px" mr="5px" fontWeight="bold">Departure Fare: </Text><Text>RM {bookingSeatNums*ticketPerPrice}.00</Text>
                    </HStack>
                    <HStack>
                        <Text mb="0px" mr="5px" fontWeight="bold">Processing Fees: </Text><Text>RM {1*bookingSeatNums}.00</Text>
                    </HStack>
                    <HStack>
                        <Text mb="0px" mr="5px" fontWeight="bold">Discount: </Text>
                        <Text>- RM {Object.keys(pointsTokensUse).length === 0 ? 0 : pointsTokensUse.discounts}.00</Text>
                    </HStack>
                    <HStack>
                        <RadioGroup onChange={handleChange} width="300px">
                            {
                                pointsTokens.customer_enrich >= 300 &&
                                <Stack 
                                    border='1px solid black' 
                                    p="10px 15px"
                                >
                                    <Text  mb="0px" mr="5px" fontWeight="bold">
                                        Use Enrich Points
                                    </Text>
                                    {
                                        pointsTokens.customer_enrich >= 300 &&
                                        <Radio value="1">
                                            <HStack>
                                                <Text mb="0px">RM 6.00</Text>
                                                <Text mb="0px" pl="30px">300 Points</Text>
                                            </HStack>
                                        </Radio>
                                    }
                                    {
                                        pointsTokens.customer_enrich >= 600 &&
                                        <Radio value='2'>
                                            <HStack>
                                                <Text mb="0px">RM 12.00</Text>
                                                <Text mb="0px" pl="23px">600 Points</Text>
                                            </HStack>
                                        </Radio>
                                    }
                                    {
                                        pointsTokens.customer_enrich >= 1200 &&
                                        <Radio value='3'>
                                            <HStack>
                                                <Text mb="0px">RM 25.00</Text>
                                                <Text mb="0px" pl="23px">1200 Points</Text>
                                            </HStack>
                                        </Radio>
                                    }
                                    {
                                        pointsTokens.customer_enrich >= 2500 &&
                                        <Radio value='4'>
                                            <HStack>
                                                <Text mb="0px">RM 50.00</Text>
                                                <Text mb="0px" pl="23px">2400 Points</Text>
                                            </HStack>
                                        </Radio> 
                                    }
                                </Stack>
                            }
                            {
                                pointsTokens.customer_refund>0 &&
                                <Stack border='1px solid black' p="10px 15px">
                                    <Text  mb="0px" mr="5px" fontWeight="bold">
                                        Use Refund Tokens 
                                    </Text>
                                    <Radio value='5'>
                                        RM {pointsTokens.customer_refund}.00
                                    </Radio>
                                </Stack>
                            }
                        </RadioGroup>
                    </HStack>
                </Stack>
            </CardBody>
            <CardFooter bg="gray.200" py="15px" alignItems="center" width="100%" justifyContent="space-between">
                <Text fontSize='1.15rem' mb="0px" fontWeight="bold">Total: &nbsp; RM {totalPrice}.00</Text>
                <Button colorScheme="blue" onClick={hanldeClick}>Proceed to Pay</Button>
            </CardFooter>
        </Card>
    )
}

export default PaymentInfo