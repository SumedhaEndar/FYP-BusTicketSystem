import BenefitSection from "../components/organisms/BenefitSection"
import PopularRoutesSection from "../components/organisms/PopularRoutesSection"
import SearchSection from "../components/organisms/SearchSection"

function Home() {
    return(
        <>
            <h2>This is Home Page</h2>
            <SearchSection />
            <PopularRoutesSection />
            <BenefitSection />
        </>
    )
}


export default Home