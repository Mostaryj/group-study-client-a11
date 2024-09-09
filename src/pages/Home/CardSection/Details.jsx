import { Link, useLoaderData, useParams } from "react-router-dom";

const Details = () => {
  const cards = useLoaderData();
  //  console.log(cards);
  const { id } = useParams();
  const card = cards.find((card) => card.id == id);
  return (
    <div>
         <h2 className="md:text-4xl text-2xl font-bold text-center mb-8 mt-12">Details of Assignment</h2>
    <div className="grid  md:grid-cols-2 bg-base-100 shadow-xl md:mt-12 mt-4">
     <div>
          
      <figure>
        <img
          src={card.img}
          alt={card.title}
          className="p-2 rounded-lg"
        />
      </figure>
     </div>
      <div className="card-body">
        <h2 className="card-title">{card.title}</h2>
        <h4><span className="font-semibold">Time:</span> {card.time}</h4>
        <p><span className="font-semibold">Category:</span> {card.category}</p>
        <p><span className="font-semibold">Description:</span> {card.description}</p>
        <div className="card-actions ">
         <Link to='/'>
         <button className="btn bg-emerald-600 text-white hover:bg-emerald-800">Go Back</button>
         </Link>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default Details;
