import { Link } from "react-router-dom";


const Cards = ({card}) => {
    const {id, img, title, description, time, category} = card;
  return (
    <div>
      <div className=" p-4 shadow-md dark:bg-gray-50 dark:text-gray-800 mt-6">
       
        <div className="space-y-4">
          <div className="space-y-2">
            <img
              src={img}
              alt=""
              className="block object-cover object-center w-full rounded-md h-[200px] dark:bg-gray-500"
            />
            
          </div>
          <div className="space-y-2">
            <a rel="noopener noreferrer" href="#" className="block">
              <h3 className="text-xl font-bold dark:text-violet-600">
                {title}
              </h3>
            </a>
            <div className="flex justify-between">
            <p className="leading-snug dark:text-gray-600">
             {category}
            </p>
            <p>Time: {time}</p>
            </div>
           <Link to={`/details/${id}`}>
           <button className="btn w-full bg-emerald-600 text-white mt-4">Details</button>
           </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
