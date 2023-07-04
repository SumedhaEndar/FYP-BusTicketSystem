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
import { useState } from 'react';
import CustomerLoginModal from '../molecules/CustomerLoginModal'
import { useAuthContext } from "../../hooks/useAuthContext";
import BusSeats from '../molecules/BusSeats';

function ChooseSeatModal({isOpen, onClose, eachSchedule}){
    const { user } = useAuthContext()
    const [clickedSeats, setClickedSeats] = useState([]);
    
    const handleSeatsSelected = (data) => {
        if(!eachSchedule.seats_occupied.includes(data)){
            if(clickedSeats.includes(data)){
                setClickedSeats((prevClickedSeats) => prevClickedSeats.filter((clickedSeat) => clickedSeat !== data))
            }
            else {
                setClickedSeats((prevClickedSeats) => [...prevClickedSeats, data])
            }
        }
    }

    const handleContinue = () => {
        console.log(clickedSeats)
    }
    
    return(
        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg="gray.300" py="10px" fontSize="1.25rem">
                    Choose Seats
                    <ModalCloseButton fontSize="0.75rem"/>
                </ModalHeader>
                <ModalBody>
                    {
                        (user && user.role === "Customer") ?
                        <BusSeats 
                            occupiedSeats={eachSchedule.seats_occupied}
                            onSeatsSelected={handleSeatsSelected}
                        /> :
                        <CustomerLoginModal />
                    }
                    {/* <p>{clickedSeats.join(',')}</p> */}
                </ModalBody>
                <ModalFooter py="10px" mt="5px">
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    {
                        (user && user.role === "Customer") &&
                        (clickedSeats.length > 0) &&
                        <Button colorScheme="blue" onClick={handleContinue}>
                            Continue
                        </Button>
                    }
                </ModalFooter>
            </ModalContent>
           
        </Modal>
    )
}

export default ChooseSeatModal