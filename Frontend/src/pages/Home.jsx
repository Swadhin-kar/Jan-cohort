import Hero from '../components/Hero'
import QuickTags from '../components/QuickTags'
import RecruiterCard from '../components/RecruiterCard'


export default function Home() {
    return (
        <div className="bg-white">
            <Hero />
            <QuickTags />
            <RecruiterCard />
        </div>
    )
}