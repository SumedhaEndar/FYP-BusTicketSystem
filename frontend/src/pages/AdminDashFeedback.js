import { 
    Flex, 
    Box, 
    VStack,
    HStack,
    FormControl,
    Input,
    Textarea,
    Button,
} from "@chakra-ui/react"
import { MyFormLabel } from "../components/atoms/WorldwideText";
import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate'
import FormHeader from "../components/molecules/FormHeader";
import Axios from "axios";

function AdminDashFeedback(){
    const [pageSelected, setPageSelected] = useState(0)
    const [feedbackReviewItem, setFeedbackReviewItem] = useState({})
    const [totalPage, setTotalPage] = useState(0)

    const handlePageChange = (data) => {
        setPageSelected(data.selected)
    };

    const handleClick = async() => {
        await Axios.delete(`/api/customers/feedback/${feedbackReviewItem.feedback_id}`)
        setPageSelected((prevPage)=> prevPage-1)
        // console.log(pageSelected)
        // console.log(totalPage)
    }

    useEffect(()=>{
        const fetchFeedback = async() => {
            const response = await Axios.get( `/api/customers/feedback?page=${pageSelected+1}`)
            const {data} = response

            setFeedbackReviewItem(data.items[0])
            setTotalPage(data.totalPages)

        }
        fetchFeedback()
    },[pageSelected, totalPage])

    /*------- Need to perfect this one ------*/
    if(feedbackReviewItem === undefined) {
        return(
            <Flex as="section" bg="fypBG.2" pt="40px" pb="20px" alignItems="center" direction="column" height="100vh">
                <div>No data available.</div>;
            </Flex>
        ) 
    }
    /*--------------------------------------*/

    return(
        <Flex as="section" bg="fypBG.2" pt="40px" pb="20px" alignItems="center" direction="column">
            <Box bg="fypBG.1" px="40px" mb="36px" py="30px" rounded="lg" boxShadow='md' w="740px">
                <FormHeader 
                    formTitle = "Feedback"
                />
                <form>
                    <VStack width="100%" spacing="1rem" alignItems="center">
                        <HStack width="100%" spacing="40px" > 
                            <FormControl>
                                <MyFormLabel htmlFor="name" color="fypBlue.1" mb="0px">Name</MyFormLabel>
                                <Input 
                                    id="name"
                                    name="name"
                                    type="text"
                                    size="sm"
                                    bg="fypBG.1"
                                    value={feedbackReviewItem.feedback_name}
                                    isReadOnly = {true}
                                />
                            </FormControl>
                            <FormControl>
                                <MyFormLabel htmlFor="email" color="fypBlue.1" mb="0px">Email</MyFormLabel>
                                <Input 
                                    id="email"
                                    name="email"
                                    type="text"
                                    size="sm"
                                    bg="fypBG.1"
                                    value={feedbackReviewItem.feedback_email}
                                    isReadOnly = {true}
                                />
                            </FormControl>
                        </HStack>
                        <HStack width="100%" spacing="40px" > 
                            <FormControl>
                                <MyFormLabel htmlFor="mobile" color="fypBlue.1" mb="0px">Contact</MyFormLabel>
                                <Input 
                                    id="mobile"
                                    name="mobile"
                                    type="text"
                                    size="sm"
                                    bg="fypBG.1"
                                    value={feedbackReviewItem.feedback_mobile}
                                    isReadOnly = {true}
                                />
                            </FormControl>
                            <FormControl>
                                <MyFormLabel htmlFor="feedback" color="fypBlue.1" mb="0px">Type of Feedback</MyFormLabel>
                                <Input 
                                    id="feedback"
                                    name="feedback"
                                    type="text"
                                    size="sm"
                                    bg="fypBG.1"
                                    value={feedbackReviewItem.feedback_type}
                                    isReadOnly = {true}
                                />
                            </FormControl>
                        </HStack>
                        <FormControl>
                            <MyFormLabel htmlFor="subject" color="fypBlue.1" mb="0px">Subject</MyFormLabel>
                            <Input 
                                id="subject"
                                name="subject"
                                type="text"
                                size="sm"
                                bg="fypBG.1"
                                value={feedbackReviewItem.feedback_subject}
                                isReadOnly = {true}
                            />
                        </FormControl>
                        <FormControl pb="10px">
                            <MyFormLabel htmlFor="message">Message</MyFormLabel>
                            <Textarea 
                                id="message" 
                                name="message"
                                bg="fypBG.1"
                                size="sm"
                                h="150px"
                                value={feedbackReviewItem.feedback_message}
                                isReadOnly = {true}
                            />
                        </FormControl>
                        <Button 
                            colorScheme='blue' size='sm' p="15px 25px" fontSize="1rem" fontWeight="bold"
                            onClick={handleClick}
                        >
                            Resolve
                        </Button>
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

export default AdminDashFeedback