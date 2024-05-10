import { Link, useLoaderData } from "react-router-dom";


const Assignments = () => {
     const loadedAssignment = useLoaderData();

   

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
              {loadedAssignment.map((assignment, index) => (
              <tr key={assignment._id}>
                <td>{index+1}</td>
                <td><img className="w-20 rounded-lg" src={assignment.photo} alt="" /></td>
                <td>{assignment.title}</td>
                <td>{assignment.date}</td>
                <td>{assignment.level}</td>
                <td>
                  <Link to={`/view/${assignment._id}`}>
                  <button className="btn bg-blue-800 text-white">View Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default Assignments;

