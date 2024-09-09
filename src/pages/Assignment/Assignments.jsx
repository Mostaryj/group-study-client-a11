import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
 
  const { user } = useAuth();
  
  const handleFilter = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "" || selectedValue === "all") {
      setFilteredAssignments(assignments);
    } else {
      const newAssignment = assignments.filter(
        (assignment) => assignment.level === selectedValue
      );
      setFilteredAssignments(newAssignment);
    }
    setCurrentPage(1); // Reset the page 1 after filtering
  };

  useEffect(() => {
    fetch("https://group-study-server-eight.vercel.app/study/")
      .then((res) => res.json())
      .then((data) => {
        setAssignments(data);
        setFilteredAssignments(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch((err) => console.log(err.message));
  }, [user]);

  const handleDelete = (id, email) => {
    if (email !== user?.email) {
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
        fetch(
          `https://group-study-server-eight.vercel.app/study/${id}?email=${user.email}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => {
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
              setTotalPages(Math.ceil(remaining.length / itemsPerPage));
            }
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
      }
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssignments.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white text-black p-4">
      <h1 className="lg:text-4xl text-2xl font-bold font-pop text-center  mt-4">
        All Assignments
      </h1>

      {/* Filter */}
      <div className="flex items-center justify-center p-2 gap-4 mb-6 font-medium">
        <span>Customization filter:</span>
        <select
          name="level"
          onChange={handleFilter}
          className="border border-black bg-white min-w-0 px-4 py-2 rounded-md  "
          defaultValue={""}
        >
          <option value="" disabled>
            Select Customization
          </option>
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table text-black border-black font-medium">
          <thead>
            <tr className="font-bold bg-emerald-600 text-white border border-emerald-600 text-center">
              <th className="">SL</th>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Date</th>
              <th>Level</th>
              <th>Marks</th>
              <th>View</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="border border-black">
            {currentItems.map((assignment, index) => (
              <tr
                key={assignment._id}
                className="border border-black even:bg-emerald-100 text-center"
              >
                <td className="border border-black">{indexOfFirstItem + index + 1}</td>
                <td className="border border-black">
                  <img className="w-20 rounded-lg" src={assignment.photo} alt="" />
                </td>
                <td className="border border-black">{assignment.title}</td>
                <td className="border border-black">{assignment.date}</td>
                <td className="border border-black">{assignment.level}</td>
                <td className="border border-black">{assignment.marks}</td>
                <td className="border border-black">
                  <Link to={`/view/${assignment._id}`}>
                    <button className="btn rounded-3xl bg-blue-600 hover:bg-blue-800 text-white">View Details</button>
                  </Link>
                </td>
                <td className="border border-black">
                  <Link to={`/update/${assignment._id}`}>
                    <button className="btn rounded-full h-2 bg-green-600 hover:bg-green-800 text-white">Update</button>
                  </Link>
                </td>
                <td className="border border-black">
                  <button onClick={() => handleDelete(assignment._id, assignment.email)}>
                    <FaTrash className="text-red-500 w-8 h-6"></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-1 dark:text-gray-800 mt-8 mb-8">
        <button
          title="previous"
          onClick={prevPage}
          disabled={currentPage === 1}
          type="button"
          className="inline-flex items-center justify-center px-2 border rounded-md shadow-md bg-blue-300 dark:border-gray-100"
        >
          Previous
        </button>
        <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50  dark:border-emerald-600">
          {currentPage}
        </span>
        <button
          title="next"
          onClick={nextPage}
          disabled={currentPage === totalPages}
          type="button"
          className="inline-flex items-center justify-center px-2 border  rounded-md shadow-md bg-blue-300 dark:border-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Assignments;
