import {
    TableContainer,
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th,
    Td,
    IconButton,
    Box
} from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons'
import { useEffect } from "react";
import Axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCarouselsContext } from "../../hooks/useCarouselsContext";
import FormHeader from "../molecules/FormHeader"

function ViewCarouselList(){
    const { user } = useAuthContext()
    const { carousels, dispatch} = useCarouselsContext()

    useEffect(()=> {
        const getCarousels = async()=>{
            const response = await Axios.get('api/adminDashboard/carousels', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data  = response.data.results

            if(response.statusText === 'OK'){
                dispatch({type: 'SET_CAROUSELS', payload: data})
            }
        }
        getCarousels()
    }, [user, dispatch] )

    const handleDeleteClick = async(id) => {
        const response = await Axios.delete(`api/adminDashboard/carousels/${id}`,{
            headers:{
                'Authorization': `Bearer ${user.token}`
            } 
        })
        console.log(response.statusText)
        if(response.statusText === 'OK'){
            dispatch({type: 'DELETE_CAROUSEL', payload: id})
        }
        // console.log(response)
        // console.log(id)
    }


    return(
        <Box bg="fypBG.1" px="40px" mb="36px" pt="30px" pb="40px" rounded="lg" boxShadow='md' w="740px">
            <FormHeader 
                formTitle = "Manage Carousels"
            />
            <TableContainer w="740px" rounded="lg" boxShadow='md' mb="10px">
                <Table variant="simple" bg="white">
                    <Thead>
                        <Tr>
                            <Th fontSize="1rem">Name</Th>
                            <Th fontSize="1rem">Filename</Th>
                            <Th fontSize="1rem">Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {carousels && carousels.map((row) => (
                            <Tr key={row.carousel_id}>
                                <Td>{row.carousel_name}</Td>
                                <Td>{row.carousel_filename}</Td>
                                <Td>
                                    <IconButton 
                                        icon={<DeleteIcon />}
                                        ml="10px"
                                        onClick={()=>handleDeleteClick(row.carousel_id)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ViewCarouselList