import {
    Box
} from "@chakra-ui/react"
import { SectionTitle } from "../components/atoms/WorldwideText"
import ExpEachSection from "../components/organisms/ExpEachSection"

function Experience(){
    return(
        <Box bg="fypBG.2" pt="20px" pb="50px">
            <SectionTitle textAlign="center">Experiences</SectionTitle>
            <ExpEachSection 
                styleSelection={1}
                eachTitle="We Make It Easy For You"
                eachText="You can easily check schedule, tickets availability and 
                compare prices online on our website."
            />
            <ExpEachSection 
                styleSelection={2}
                eachTitle="Trustworthy"
                eachText="With over 13 years of experience within the transportation 
                industry, we have established a strong background history through 
                our success and is always aiming to deliver only quality services."
            />
            <ExpEachSection 
                styleSelection={1}
                eachTitle="Honest Price"
                eachText="What you see is what you pay. No price inflation. No 
                hidden fees. We offer quality services and amazing deals at 
                affordable prices."
            />
        </Box>
    )
}

export default Experience