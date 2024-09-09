import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const PendingAssignment = () => {
  const loadedAssignment = useLoaderData();
  const [assignments, setAssignments] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [assignmentsPerPage] = useState(8); 

  useEffect(() => {
    setAssignments(loadedAssignment);

    fetch("https://group-study-server-eight.vercel.app/submit/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        return response.json();
      })
      .then((data) => setAssignments(data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, [loadedAssignment]);

  // Calculate the index of the first and last assignment on the current page
  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = assignments.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (e, assignmentId) => {
    e.preventDefault();
    const form = e.target;
    const giveMark = form.giveMark.value;
    const feedBack = form.feedBack.value;

    const submit = {
      giveMark,
      feedBack,
    };

    // Update the assignment status to "Completed"
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, status: "Completed", giveMark, feedBack }
          : assignment
      )
    );

    // update the assignment status in the backend
    fetch(`https://group-study-server-eight.vercel.app/submit/${assignmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Completed", ...submit }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update assignment");
        }
        return response.json();
      })
      .then(() => {
        Swal.fire("Success", "Assignment marked as completed", "success");

        // Close the modal
        const modal = document.getElementById(`modal_${assignmentId}`);
        modal.close();
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update assignment", "error");
      });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-white text-black bg:text-black p-4">
      <h1 className="text-4xl font-bold text-center mt-10 ">
        Pending Assignment
      </h1>
      <div className="overflow-x-auto mt-6">
        <table className="table font-medium">
          <thead>
            <tr className="border border-emerald-600 bg-emerald-600 text-white text-center">
              <th>#</th>
              <th>Title</th>
              <th>Mark</th>
              <th>Examinee Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAssignments.map((assignment, index) => (
              <tr key={assignment._id} className="border border-black text-center">
                <td className="border border-black">{index + 1}</td>
                <td className="border border-black">{assignment.title}</td>
                <td className="border border-black">{assignment.marks}</td>
                <td className="border border-black">{assignment.name}</td>
                <td className="border border-black">{assignment.status}</td>
                <td className="border border-black">
                  <div>
                    <button
                      onClick={() =>
                        document
                          .getElementById(`modal_${assignment._id}`)
                          .showModal()
                      }
                      className="btn rounded-3xl bg-blue-600 hover:bg-blue-800 text-white"
                    >
                      Give Mark
                    </button>
                    <dialog id={`modal_${assignment._id}`} className="modal">
                      <div className="modal-box">
                        <div className="modal-action">
                          <button
                            onClick={() =>
                              document
                                .getElementById(`modal_${assignment._id}`)
                                .close()
                            }
                            className="btn btn-circle btn-outline"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e, assignment._id)}>
                          <div className="flex sm:flex-col md:justify-between mb-8 p-4">
                            <h1 className="text-2xl text-gray-500">Give mark</h1>
                            <div className="form-control gap-2">
                              <label className="label">
                                <span className="label-text">PDF/Doc:</span>
                              </label>
                              <label className="input-group">
                                <input
                                  type="text"
                                  placeholder={assignment.pdf}
                                  className="input input-bordered border-black w-full"
                                  readOnly
                                />
                              </label>
                            </div>
                            <div className="form-control gap-2">
                              <label className="label">
                                <span className="label-text">Note:</span>
                              </label>
                              <label className="input-group">
                                <input
                                  type="text"
                                  placeholder={assignment.note}
                                  className="input input-bordered border-black w-full"
                                  readOnly
                                />
                              </label>
                            </div>
                            <div className="form-control gap-2">
                              <label className="label">
                                <span className="label-text">Give Mark:</span>
                              </label>
                              <label className="input-group">
                                <input
                                  type="text"
                                  name="giveMark"
                                  placeholder="Mark"
                                  className="input input-bordered border-black w-full"
                                />
                              </label>
                              <div>
                              <label className="label">
                                <span className="label-text">Feed Back:</span>
                              </label>
                              
                                <textarea
                                  name="feedBack"
                                  placeholder="Feedback"
                                  className="rounded-lg text-gray-400 p-2 w-full border border-black mt-2 mb-4"
                                ></textarea>
                              </div>
                            </div>
                            <input
                              type="submit"
                              value="Submit"
                              className="btn bg-green-500 hover:bg-green-800 text-white"
                            />
                          </div>
                        </form>
                      </div>
                    </dialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(assignments.length / assignmentsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PendingAssignment;
