import { useLoaderData } from "react-router-dom";
import Banner from "./Banner";
import Faq from "./Faq";
import Cards from "./CardSection/Cards";
import PopularSection from "./PopularSection.jsx";
const Home = () => {
  const cards = useLoaderData();
  return (
    <div className="">
      <Banner></Banner>
      <div className="">
        <h1 className="text-2xl md:text-4xl font-bold text-center mt-8 lg:mt-16 ">
          Assignment Section
        </h1>
        <p className="text-center mt-2 mb-6">
          Expand your horizons with our challenging assignments designed to push
          your limits <br /> and enhance your knowledge
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto ">
        {cards.map((card) => (
          <Cards key={card.id} card={card}></Cards>
        ))}
      </div>
      <PopularSection></PopularSection>

      <Faq></Faq>
    </div>
  );
};

export default Home;
