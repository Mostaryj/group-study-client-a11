import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth"
const My = () => {
     const [mySubmit, setMySubmit] = useState();
   const { user } = useAuth() || {};


   useEffect(() => {
    if (user?.email) {
      fetch(`https://group-study-server-eight.vercel.app/submit-email/${user.email}`)
      // fetch(`http://localhost:5000/submit-email/${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch assignments");
          }
          return res.json();
        })
        .then((data) => {
        

          setMySubmit(data);
        })
        .catch((err) => console.error(err.message));
    }
  }, [user]);
 

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
              <th></th>
              <th>Title</th>
              <th>Date</th>
              <th>Level</th>
              <th>Status</th>
              <th>Mark</th>
              <th>Feedback</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>

         
              {/* row 1 */}
              {mySubmit && mySubmit.map((assignment, index) => ( 
       <tr key={assignment._id}> 
                <td>{index+1}</td> 
               <td>{assignment.title}</td>
                <td>{assignment.date}</td>
                <td>{assignment.level}</td>
                <td>{assignment.status}</td>
                <td>{assignment.giveMark || 'N/A'}</td>
                <td>{assignment.feedBack || 'N/A'}</td>
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