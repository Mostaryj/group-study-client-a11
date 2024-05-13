import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth"
import { useLoaderData } from "react-router-dom";
const My = () => {
     const [mySubmit, setMySubmit] = useState();
   const { user } = useAuth() || {};
   const loadedAssignment=useLoaderData();

   useEffect(() => {
    fetch(`https://group-study-server-eight.vercel.app/submit-email/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
         setMySubmit(data);

       
      })
     
       .catch((err) => console.log(err.message));
   }, []);
 

    return (
        <div>
               <h1 className="lg:text-4xl text-2xl font-bold font-pop text-center mt-4">
     My Submitted Assignments{" "}
      </h1>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
            {/* <th></th> */}
              {/* <th>Thumbnail</th> */}
              <th>Title</th>
              <th>Date</th>
              <th>Level</th>
              
              <th>User</th>

             
            </tr>
          </thead>
          <tbody>
              {/* row 1 */}
              {loadedAssignment && loadedAssignment.map((assignment, index) => ( 
    <tr key={assignment._id}> 
        <td>{index+1}</td> 
        {/* <td><img className="w-20 rounded-lg" src={assignment.photo} alt="" /></td>  */}
        <td>{assignment.title}</td>
        <td>{assignment.date}</td>
        <td>{assignment.level}</td>
        <td>{assignment.name}</td> 
    </tr> 
))} 
          </tbody>
        </table>  
      </div>
        </div>
    );
};

export default My;