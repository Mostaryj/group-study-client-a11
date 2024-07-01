import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Pending = () => {
  const loadedAssignment = useLoaderData();
  const [assignments, setAssignments] = useState([]);

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

  const handleSubmit = (e, assignmentId) => {
    e.preventDefault();
    const form = e.target;
    const giveMark = form.giveMark.value;
    const feedBack = form.feedBack.value;

    const submit = {
      giveMark,
      feedBack,
    };

    console.log(submit);

    // Update the assignment status to "Completed"
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, status: "Completed", giveMark, feedBack }
          : assignment
      )
    );

    // Make an API call to update the assignment status in the backend
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
      .then((data) => {
        console.log("Assignment updated successfully:", data);
        Swal.fire("Success", "Assignment marked as completed", "success");

        // Close the modal
        const modal = document.getElementById(`modal_${assignmentId}`);
        modal.close();
      })
      .catch((error) => {
        console.error("Error updating assignment:", error);
        Swal.fire("Error", "Failed to update assignment", "error");
      });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-6 ">
        Pending Assignment
      </h1>
      <div className="overflow-x-auto mt-6">
        <table className="table ">
          <thead>
            <tr className="">
              <th>#</th>
              <th>Title</th>
              <th>Mark</th>
              <th>Examinee Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment._id}>
                <td>{index + 1}</td>
                <td>{assignment.title}</td>
                <td>{assignment.marks}</td>
                <td>{assignment.name}</td>
                <td>{assignment.status}</td>
                <td>
                  <div>
                    <button
                      onClick={() =>
                        document
                          .getElementById(`modal_${assignment._id}`)
                          .showModal()
                      }
                      className="btn bg-blue-700 text-white"
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
                          <div className="flex sm:flex-col md:justify-between mb-8">
                            <div className="form-control gap-2 md:w-1/2">
                              <label className="label">
                                <span className="label-text">PDF/Doc:</span>
                              </label>
                              <label className="input-group">
                                <input
                                  type="text"
                                  name=""
                                  placeholder={assignment.pdf}
                                  className="input input-bordered w-full"
                                />
                              </label>
                            </div>
                            <div className="form-control gap-2 md:w-1/2">
                              <label className="label">
                                <span className="label-text">Note:</span>
                              </label>
                              <label className="input-group">
                                <input
                                  type="text"
                                  name=""
                                  placeholder={assignment.note}
                                  className="input input-bordered w-full"
                                />
                              </label>
                            </div>
                            <div className="form-control gap-2 md:w-1/2">
                              <label className="label">
                                <span className="label-text">Give Mark:</span>
                              </label>
                              <label className="input-group">
                                <input
                                  type="text"
                                  name="giveMark"
                                  placeholder="mark"
                                  className="input input-bordered w-full"
                                />
                              </label>
                              <div>
                                <p>FeedBack:</p>
                                <textarea
                                  name="feedBack"
                                  id=""
                                  placeholder="feedBack"
                                  className="rounded-lg text-gray-400 p-2 w-full border-2 mt-2 mb-4"
                                ></textarea>
                              </div>
                            </div>
                            <input
                              type="submit"
                              value="Request"
                              className="btn btn-block bg-green-300"
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
    </div>
  );
};

export default Pending;
