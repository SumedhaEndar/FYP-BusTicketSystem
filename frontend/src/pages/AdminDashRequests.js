import { 
    Flex, 
    Box, 
    VStack,
    HStack,
    FormControl,
    Input,
    Textarea,
    Button,
    useToast
} from "@chakra-ui/react"
import { MyFormLabel } from "../components/atoms/WorldwideText";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'
import FormHeader from "../components/molecules/FormHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import Axios from "axios";

function AdminDashRequests(){
    const { user } = useAuthContext()
    const [pageSelected, setPageSelected] = useState(0)
    const [requestItem, setRequestItem] = useState({})
    const [totalPage, setTotalPage] = useState(0)
    const toast = useToast()

    const handlePageChange = (data) => {
        setPageSelected(data.selected)
    };

    function afterAction(){
        if(pageSelected === 0){
            setPageSelected((0))
        }
        else {
            setPageSelected((prev)=>prev-1)
        }
        
        setTotalPage((prev)=>prev-1)
    }

    const handleAccept = async() => {
        try{
            await Axios.post(`/api/adminDashboard/requests/${requestItem.partner_id}`,
            {
                "name": requestItem.partner_name,
                "email": requestItem.partner_email,
                "contact": requestItem.partner_contact,
                "address": requestItem.partner_address
            },
            {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                } 
            })
    
            afterAction()
        }
        catch(error){
            toast({
                title: 'Error',
                description: "Email Existed",
                status: 'error',
                position: 'top-right',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const handleDecline = async() => {
        await Axios.delete(`/api/adminDashboard/requests/${requestItem.partner_id}`,{
            headers:{
                'Authorization': `Bearer ${user.token}`
            } 
        })

        afterAction()
    }

    useEffect(()=>{
        const fetchRequests = async() => {
            const response = await Axios.get(`/api/adminDashboard/requests?page=${pageSelected+1}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const {data} = response
            setRequestItem(data.items[0])
            setTotalPage(data.totalPages)
            console.log(data)
        }
        fetchRequests()
    },[user, pageSelected, totalPage])

    /*------- Need to perfect this one ------*/
    if(requestItem === undefined) {
        return(
            <Flex as="section" bg="fypBG.2" pt="40px" pb="20px" alignItems="center" direction="column" height="80vh">
                <div>No request available.</div>;
            </Flex>
        ) 
    }
    /*--------------------------------------*/


    return(
        <Flex as="section" bg="fypBG.2" alignItems="center" direction="column" height="80vh" justifyContent="center">
            <Box bg="fypBG.1" px="40px" mb="36px" pt="30px" pb="40px" rounded="lg" boxShadow='md' w="740px">
                <FormHeader 
                    formTitle = "New Partners Request"
                />
                <form>
                    <VStack width="100%" spacing="1rem" alignItems="center">
                        <HStack width="100%" spacing="40px" > 
                            <FormControl>
                                <MyFormLabel htmlFor="name" color="fypBlue.1" mb="0px">Company Name</MyFormLabel>
                                <Input 
                                    id="name"
                                    name="name"
                                    type="text"
                                    size="sm"
                                    bg="fypBG.1"
                                    value={requestItem.partner_name}
                                    isReadOnly = {true}
                                />
                            </FormControl>
                            <FormControl>
                                <MyFormLabel htmlFor="email" color="fypBlue.1" mb="0px">Company Email</MyFormLabel>
                                <Input 
                                    id="email"
                                    name="email"
                                    type="text"
                                    size="sm"
                                    bg="fypBG.1"
                                    value={requestItem.partner_email}
                                    isReadOnly = {true}
                                />
                            </FormControl>
                        </HStack>
                        <HStack width="100%" spacing="40px">
                            <Box width="50%">
                                <FormControl>
                                    <MyFormLabel htmlFor="contact" color="fypBlue.1" mb="0px">Company Contact</MyFormLabel>
                                    <Input 
                                        id="contact"
                                        name="contact"
                                        type="text"
                                        size="sm"
                                        bg="fypBG.1"
                                        value={requestItem.partner_contact}
                                        isReadOnly = {true}
                                    />
                                </FormControl>
                                <HStack mt="20px" justifyContent="flex-start" spacing="30px">
                                    <Button 
                                        colorScheme='blue' size='sm' p="15px 25px" fontSize="1rem" fontWeight="bold"
                                        onClick={handleAccept}
                                    >
                                        Accept
                                    </Button>
                                    <Button 
                                        colorScheme='red' size='sm' p="15px 25px" fontSize="1rem" fontWeight="bold"
                                        onClick={handleDecline}
                                    >
                                        Decline
                                    </Button>
                                </HStack>
                            </Box> 
                            <FormControl width="50%"> 
                                <MyFormLabel htmlFor="address" color="fypBlue.1" mb="0px">Company Address</MyFormLabel>
                                <Textarea 
                                    id="address"
                                    name="address"
                                    type="text"
                                    size="sm"
                                    bg="fypBG.1"
                                    value={requestItem.partner_address}
                                    isReadOnly = {true}
                                />
                            </FormControl>
                        </HStack>
                    </VStack>
                </form>
            </Box>
            <ReactPaginate 
                // Settings
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={+totalPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}

                // ClassName Stuff
                containerClassName={'pagination justify-content-center'}        
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}

                // Handler Function
                onPageChange={handlePageChange}
                forcePage={pageSelected}
            />
        </Flex>
    )
}

export default AdminDashRequests