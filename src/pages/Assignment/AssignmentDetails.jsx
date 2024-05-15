import { Link, useLoaderData, useParams } from "react-router-dom";

const AssignmentDetails = () => {
  const cards = useLoaderData();
  //  console.log(cards);
  const { id } = useParams();
  const card = cards.find((card) => card._id == id);

  
  return (
    <div>
      <div className="hero  bg-yellow-50">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={card.photo}
            className=" rounded-lg "
          />
          <div>
            <h1 className="lg:text-5xl text-2xl  font-bold">{card.title}</h1>
            <p className="py-6">
             <span className="font-bold">Description:</span> {card.description}
            </p>
            <p><span className="font-bold">Difficulty Level:</span> {card.level}</p>
            <p><span className="font-bold">Marks:</span>{card.marks}</p>
            <p><span className="font-bold">Due Date:</span>{card.date}</p>
            <Link to={`/take/${card._id}`}><button className="btn bg-emerald-600 text-white">Take Assignment</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
