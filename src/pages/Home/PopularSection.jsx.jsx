import ai from "../../assets/AI.png"
import programming from "../../assets/programming.png"
import physics from "../../assets/physics.png"
import chemistry from "../../assets/chemistry.png"
import math from "../../assets/math.png"
import probability from "../../assets/probability.png"
import english from "../../assets/english.png"
import computer from "../../assets/computer.png"




const topics = [
    { title: "Artificial intelligence", imgSrc: ai },
  { title: "Programming", imgSrc: programming },
  { title: "Probability", imgSrc: probability },
  { title: "Physics", imgSrc: physics },
  { title: "Math", imgSrc: math },
  { title: "Chemistry", imgSrc: chemistry },
  { title: "English", imgSrc: english },
  { title: "Computer Science", imgSrc: computer },
  ];
  
  const PopularSection = () => {
    return (
      <div className="max-w-6xl mx-auto py-10 px-2 ">
        <h2 className="text-3xl text-center font-semibold mb-2 ">Popular topics</h2>
        <p className="text-center font-medium">Here are some popular topic for our members</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-10 dark:text-black">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-gray-100 border shadow-lg rounded-lg p-6 text-center hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={topic.imgSrc}
                alt={topic.title}
                className="w-16 h-16 mx-auto mb-4 transform transition-transform duration-300 hover:scale-110"
              />
              <h3 className="text-lg font-medium">{topic.title}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default PopularSection;
  