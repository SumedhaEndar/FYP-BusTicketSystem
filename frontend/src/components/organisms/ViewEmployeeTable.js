import {
    TableContainer,
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td,
    IconButton
} from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons'
import { useEffect } from "react";
import Axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEmployeesContext } from "../../hooks/useEmployeesContext";


function ViewEmployeeTable(){
    const { user } = useAuthContext()
    // const [employees, setEmployees] = useState([])
    const { employees, dispatch} = useEmployeesContext()

    useEffect(()=> {
        const getAllEmployees = async()=>{
            const response = await Axios.get('api/adminDashboard/employees', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data  = response.data.results

            if(response.statusText === 'OK'){
                dispatch({type: 'SET_EMPLOYEES', payload: data})
            }

        }
        getAllEmployees()
    }, [user, dispatch] )

    const handleDeleteClick = async(id) => {
        const response = await Axios.delete(`api/adminDashboard/employees/${id}`,{
            headers:{
                'Authorization': `Bearer ${user.token}`
            } 
        })
        console.log(response.statusText)
        if(response.statusText === 'OK'){
            dispatch({type: 'DELETE_EMPLOYEE', payload: id})
        }
        // console.log(response)
        // console.log(id)
    }

    return(
        <TableContainer w="740px" rounded="lg" boxShadow='md' mb="10px">
            <Table variant="simple" bg="white">
                <Thead>
                    <Tr>
                        <Th fontSize="1rem">Name</Th>
                        <Th fontSize="1rem">Mobile</Th>
                        <Th fontSize="1rem">Email</Th>
                        <Th fontSize="1rem">Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {employees && employees.map((row) => (
                        <Tr key={row.employee_id}>
                            <Td>{row.employee_name}</Td>
                            <Td>{row.employee_contact}</Td>
                            <Td>{row.employee_email}</Td>
                            <Td>
                                <IconButton 
                                    icon={<DeleteIcon />}
                                    ml="10px"
                                    onClick={()=>handleDeleteClick(row.employee_id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default ViewEmployeeTable