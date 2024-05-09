import { useLoaderData } from "react-router-dom";
import Banner from "./Banner";
import Faq from "./Faq";
import Cards from "./section/Cards";
const Home = () => {
    const cards = useLoaderData();
    return (
        <div>
      
            <Banner></Banner>
           <div>
           <h1 className="text-2xl md:text-4xl font-bold text-center mt-8">Assignment Section</h1>
           </div>
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              cards.map(card => <Cards
              key={card.id}
              card={card}
              ></Cards>)
            }
           </div>
               
         
            <Faq></Faq>
        </div>
    );
};

export default Home;