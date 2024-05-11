import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Assignments = () => {
  const loadedAssignment = useLoaderData();
  const [assignments, setAssignments] = useState([]);

  const handleDelete = (id) => {
    // console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("delete confirm");

        fetch(`http://localhost:5000/study/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Art has been deleted.",
                icon: "success",
              });

              const remaining = assignments.filter(
                (assignment) => assignment._id !== id
              );
              setAssignments(remaining);
            }
          });
      }
    });
  };

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
                <td>{index + 1}</td>
                <td>
                  <img
                    className="w-20 rounded-lg"
                    src={assignment.photo}
                    alt=""
                  />
                </td>
                <td>{assignment.title}</td>
                <td>{assignment.date}</td>
                <td>{assignment.level}</td>
                <td>
                  <Link to={`/view/${assignment._id}`}>
                    <button className="btn bg-blue-800 text-white">
                      View Details
                    </button>
                  </Link>
                </td>
                <td>
                  <Link to={`/update/${assignment._id}`}>
                    <button className="btn bg-green-600 text-white">
                      Update
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(assignment._id)}
                    className="btn bg-red-500"
                  >
                    Delete
                  </button>
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
//<div className="p-4">
{
  /* <Link to={`/update/${craft._id}`}>
<button className="btn bg-green-600 text-white">
  Update
</button>
</Link>

<button
onClick={() => handleDelete(craft._id)}
className="btn text-white bg-orange-600"
>
Delete
</button> */
}
