import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]); 
  const {user} = useAuth() || {};

  const handleFilter = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setFilteredAssignments(assignments);
      return;
    }

    const newFiltered = assignments.filter(
      (assignment) => assignment.level === selectedValue
    );

    setFilteredAssignments(newFiltered);
     console.log(newFiltered)
  };

  useEffect(() => {
    fetch('https://group-study-server-eight.vercel.app/study/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAssignments(data);
        setFilteredAssignments(data);

       
      })
     
      .catch((err) => console.log(err.message));
  }, [user]);

  const handleDelete = (id,email) => {
     //console.log(id);
    if(email !== user?.email){
      return toast.error("You can only delete your own assignments.");
    }
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
                text: "Your Assignment has been deleted.",
                icon: "success",
              });

              const remaining = assignments.filter(
                (assignment) => assignment._id !== id
              );
              setAssignments(remaining);

              setFilteredAssignments(remaining);
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
            name="level"
            onChange={handleFilter}
            className="border min-w-0 px-4 py-2 rounded-md bg-gray-200"
            defaultValue={""}
          >
            <option value="" disabled>
              Select Customization
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
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
            {filteredAssignments.map((assignment, index) => (
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
                    onClick={() => handleDelete(assignment._id, assignment.email)}
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
