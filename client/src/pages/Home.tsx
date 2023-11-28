import Carousal from "../components/Carousal"
import Explore from "../components/Explore"
const Home = () => {
  return (
    <div>
      <Carousal/>
      <div className="flex flex-col justify-center ">
        <h1 className=" pl-6 text text-2xl font-bold w-full">Explore</h1>
        <Explore/>
      </div>
    </div>
  )
}

export default Home
