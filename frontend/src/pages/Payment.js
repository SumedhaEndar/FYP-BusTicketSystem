import { 
    Box,
    SimpleGrid,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
import Axios from "axios";

import FormHeader from "../components/molecules/FormHeader"


import BookingInfo from "../components/molecules/BookingInfo";
import PaymentMethod from "../components/molecules/PaymentMethod";
import PaymentInfo from "../components/molecules/PaymentInfo";

function Payment(){
    const location = useLocation()
    const bookingSeats = location.state.bookingSeats
    const eachSchedule = location.state.eachSchedule

    const { user } = useAuthContext()

    //-------- Rough Safety ------------
    const navigate = useNavigate();
    if(!user){
        navigate('/customer-login')
    }
    if(user && user.role !== "Customer"){
        navigate('/customer-login')
    }
    //-----------------------------------

    const handleData = (data) => {
        const totalPrices = eachSchedule.plan_price * bookingSeats.length
        const values = { 
            planId: eachSchedule.plan_id,
            bookingSeatNumbers: bookingSeats,
            bookingCost: eachSchedule.plan_price,
            usedPointsTokens: data,
            addEnrichPoints: totalPrices
        }
        Axios.post('api/customerDashboard/bookings', values, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        // console.log(data)
        navigate('/customer-dash-booking')
    }

    // console.log(bookingSeats)
    // console.log(eachSchedule)

    return(
        <Box bg="fypBG.2" py="20px">
            <Box px="46px">
                <FormHeader 
                    formTitle = "Booking Details & Make Payment"
                />
            </Box>
            <SimpleGrid columns={2} spacing={5} mx="50px">
                <Box>
                    <BookingInfo 
                        bookingSeats={bookingSeats}
                        eachSchedule={eachSchedule}
                    />
                    <PaymentMethod /> 
                </Box>
                <PaymentInfo 
                    bookingSeatNums = {bookingSeats.length}
                    ticketPerPrice = {eachSchedule.plan_price}
                    onSendData={handleData}
                />
            </SimpleGrid>
        </Box>
    )
}

export default Payment