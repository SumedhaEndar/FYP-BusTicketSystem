import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
import Axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import CancelBookingContent from '../molecules/CancelBookingContent'

function CancelBookingModal({isOpen, onClose, bookingId, bookingPrice}){
    const { user } = useAuthContext()
    console.log(bookingPrice)
    const handleCancel = async() =>{
        const values = {
            refundValue: bookingPrice
        }
        await Axios.post(`/api/customerDashboard/bookings/${bookingId}`, values, {
            headers:{
                'Authorization': `Bearer ${user.token}`
            } 
        })
        onClose()
        window.location.reload();
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose} size={"3xl"} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg="gray.300" py="10px" fontSize="1.25rem">
                    Cancel Booking Confirmation
                    <ModalCloseButton fontSize="0.75rem"/>
                </ModalHeader>
                <ModalBody>
                    <CancelBookingContent 
                        bookingId={bookingId}
                    />
                </ModalBody>
                <ModalFooter py="10px" mt="5px">
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='red' onClick={handleCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CancelBookingModal