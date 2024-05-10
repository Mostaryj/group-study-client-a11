 import {  useLoaderData } from "react-router-dom";
 import useAuth from "../../Hook/useAuth";
 import { useState, useEffect } from "react";


const Pending = () => {
   const loadedAssignment = useLoaderData();
   const {user} = useAuth();

  //  const [assignments, setAssignments] = useState([]);

 

  //  useEffect(() => {
  //   setAssignments(loadedAssignment);

  //   fetch("http://localhost:5000/study")
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch assignments");
  //       }
  //       return response.json();
  //     })
  //     .then(data => setAssignments(data))
  //     .catch(error => console.error("Error fetching assignments:", error));
  // }, [loadedAssignment]);
   
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-6">Pending Assignment</h1>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Examinee</th>
              <th>Email</th>
              <th>PDF/Doc Link</th>
              <th>Note</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {loadedAssignment.map((assignment, index) => (
              <tr key={assignment._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    className="w-20 rounded-lg"
                    src={assignment.photo}
                    alt=""
                  />
                </td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>
                  <a
                    href={assignment.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  
                  </a>
                </td>
                <td>{assignment.note}</td>
                <td>{assignment.title}</td>
                <td>{assignment.date}</td>
                <td>{assignment.level}</td>
                
                <td>{assignment.mark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pending;
