import {
    Flex,
} from "@chakra-ui/react"
import { EmployeesContextProvider } from "../context/EmployeeContext"
import AddEmployeeForm from "../components/organisms/AddEmployeeForm"
import ViewEmployeeTable from "../components/organisms/ViewEmployeeTable"

function AdminDashEmployee() {
    return(
        <EmployeesContextProvider>
            <Flex as="main" bg="fypBG.2" p="40px" h="100%" direction="column" alignItems="center">
                <AddEmployeeForm />
                <ViewEmployeeTable />
            </Flex>
        </EmployeesContextProvider>
    )
}

export default AdminDashEmployee