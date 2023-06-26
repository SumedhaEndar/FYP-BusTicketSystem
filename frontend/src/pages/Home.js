import BenefitSection from "../components/organisms/BenefitSection"
import PopularRoutesSection from "../components/organisms/PopularRoutesSection"
import SearchSection from "../components/organisms/SearchSection"
import CarouselSection from "../components/organisms/CarouselSection"

function Home() {
    return(
        <>
            <CarouselSection />
            <SearchSection />
            <PopularRoutesSection />
            <BenefitSection />
        </>
    )
}


export default Home