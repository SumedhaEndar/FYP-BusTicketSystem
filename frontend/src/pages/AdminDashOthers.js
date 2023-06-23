import {
    Flex,
} from "@chakra-ui/react"
import AddStationForm from "../components/organisms/AddStationForm"

function AdminDashOthers() {
    return(
        <Flex as="main" bg="fypBG.2" p="40px" h="100%" direction="column" alignItems="center">
            <AddStationForm />
        </Flex>
    )
}

export default AdminDashOthers