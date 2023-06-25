import CreateFeedbackSection from "../components/organisms/CreateFeedbackSection"
import HeroSection from "../components/organisms/HeroSection"

import heroImage from "../assets/HeroImg/askMB-hero-img.png"
import FaqSection from "../components/organisms/FaqSection"
import AskCardSection from "../components/organisms/AskCardSection"
import ContactDetailsSection from "../components/organisms/ContactDetailsSection"

function AskMB() {
    return(
        <>
            <HeroSection 
                heroImage = {heroImage}
                heroText1 = "AskMB"
                heroText2 = "Everything you need to know about Malaysia Buses services, just a search way."
                width = {400}
            />
            <AskCardSection />
            <FaqSection />
            <ContactDetailsSection />
            <CreateFeedbackSection />
        </>
    )
}


export default AskMB