import {
    Box, 
    HStack
} from "@chakra-ui/react"
import AskCard from "../molecules/AskCard"

import image1 from "../../assets/Img/FAQ.png";
import image2 from "../../assets/Img/ContactDetail.png";
import image3 from "../../assets/Img/Feedback.png";

function AskCardSection(){
    return(
        <Box bg="fypBG.1" py="40px" justifyContent="center">
            <HStack justifyContent="center" spacing="30px">
                <AskCard 
                    cardImage={image1}
                    cardTitle="FAQ"
                    cardText="Help yourself to the frequently ask questions at your convenience."
                    toId = "faq"
                />
                <AskCard 
                    cardImage={image2}
                    cardTitle="Contact Details"
                    cardText="Need to get in touch with us ? We are all ears."
                    toId = "contact"
                />
                <AskCard 
                    cardImage={image3}
                    cardTitle="Feedback Form"
                    cardText="Your feedback is  important to us in improving our services."
                    toId = "feedback"
                />
            </HStack>
        </Box>
    )
}

export default AskCardSection