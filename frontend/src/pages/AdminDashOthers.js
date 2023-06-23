import {
    Flex,
} from "@chakra-ui/react"
import { CarouselsContextProvider } from "../context/CarouselsContext"
import AddStationForm from "../components/organisms/AddStationForm"
import AddCarouselForm from "../components/organisms/AddCarouselForm"
import ViewCarouselList from "../components/organisms/ViewCarouselList"

function AdminDashOthers() {
    return(
        <Flex as="main" bg="fypBG.2" p="40px" h="100%" direction="column" alignItems="center">
            <AddStationForm />
            <CarouselsContextProvider>
                <AddCarouselForm />
                <ViewCarouselList />
            </CarouselsContextProvider>
        </Flex>
    )
}

export default AdminDashOthers