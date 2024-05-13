import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";

const Assignments = () => {
  // const loadedAssignment = useLoaderData();
  const [assignments, setAssignments] = useState([]);
  const [filters, setFilters] = useState([]);
  const {user} = useAuth();

  const handleFilter = (e) => {
    const selectedValue = e.target.value;

    const newFiltered = filters.filter(
      (newAssignment) => newAssignment.customization === selectedValue
    );
     setFilters(newFiltered);
    console.log(newFiltered)
  };

  useEffect(() => {
    fetch('https://group-study-server-eight.vercel.app/study/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAssignments(data);
        setFilters(data);

       
      })
     
      .catch((err) => console.log(err.message));
  }, [user]);

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

        fetch(`https://group-study-server-eight.vercel.app/study/${id}`, {
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

              setFilters(remaining);
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
        {/* filter */}
        <div className="flex items-center justify-center p-2 gap-4 mb-6">
          <span>Customization filter:</span>
          <select
            name="sort"
            onChange={handleFilter}
            className="border min-w-0 px-4 py-2 rounded-md bg-gray-200"
            defaultValue={""}
          >
            <option value="" disabled>
              Select Customization
            </option>
            <option value="Hard">Hard</option>
            <option value="Medium">Medium</option>
            <option value="Easy">Easy</option>
          </select>
        </div>
        {/*  */}
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
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filters.map((assignment, index) => (
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
                <td>{assignment.marks}</td>

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
