import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth"
const My = () => {
    const [mySubmit, setMySubmit] = useState();
  const { user } = useAuth() || {};

  useEffect(() => {
    fetch(`http://localhost:5000/study-email/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMySubmit(data);

       
      })
     
      .catch((err) => console.log(err.message));
  }, [user]);
 

    return (
        <div>
               <h1 className="lg:text-4xl text-2xl font-bold font-pop text-center mt-4">
        All Assignments{" "}
      </h1>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
            <th></th>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Date</th>
              <th>Level</th>
              
              <th></th>

             
            </tr>
          </thead>
          <tbody>
              {/* row 1 */}
              {/* {loadedAssignment.map((assignment, index) => ( */}
              <tr key={mySubmit._id}>
                {/* <td>{mySubmit.index+1}</td> */}
                {/* <td><img className="w-20 rounded-lg" src={mySubmit.img} alt="" /></td> */}
                <td>{mySubmit.title}</td>
                <td>{mySubmit.date}</td>
                <td>{mySubmit.level}</td>
                <td>
                  {/* <Link to={`/view/${assignment._id}`}>
                  <button className="btn bg-blue-800 text-white">View Details</button>
                  </Link>  */}
                 </td>
              </tr>
            {/* ))}  */}
          </tbody>
        </table> 
      </div>
        </div>
    );
};

export default My;