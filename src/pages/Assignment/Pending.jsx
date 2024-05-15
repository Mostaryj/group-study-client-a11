import { Link, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Pending = () => {
  const loadedAssignment = useLoaderData();

  const [assignments, setAssignments] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const giveMark = form.giveMark.value;
    const feedBack = form.feedBack.value;

    const submit = {
      giveMark,
      feedBack,
    };

    console.log(submit);

    //   // send data to the server
    //   fetch("https://group-study-server-eight.vercel.app/submit/", {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify(submit),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);

    //       if (data.message) {
    //         Swal.fire({
    //           title: "Success!",
    //           text: "request added successfully",
    //           icon: "success",
    //           confirmButtonText: "Cool",
    //         });
    //       }

    //       document.getElementById("my_modal_4").close();
    //     });
    // };

    // const handleDelete = (id) => {
    //   // console.log(_id);
    
    //   Swal.fire({
    //     title: "Are you sure?",
    //     text: "You won't be able to revert this!",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, delete it!",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       console.log("delete confirm");
  
        //   fetch(`https://group-study-server-eight.vercel.app/study/${id}`, {
        //     method: "DELETE",
        //   })
        //     .then((res) => res.json())
        //     .then((data) => {
        //       console.log(data);
        //       if (data.deletedCount > 0) {
        //         Swal.fire({
        //           title: "Deleted!",
        //           text: "Your Art has been deleted.",
        //           icon: "success",
        //         });
  
        //         const remaining = assignments.filter(
        //           (assignment) => assignment._id !== id
        //         );
        //         setAssignments(remaining);
  
        //       }
        //     });
        // }
      // });
    // };


  };

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

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-6">
        Pending Assignment
      </h1>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Mark</th>
              <th>Examinee Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {assignments.map((assignment, index) => (
              <tr key={assignment._id}>
                <td>{index + 1}</td>
                <td>{assignment.title}</td>
                <td>{assignment.marks}</td>
                <td>{assignment.name}</td>
                <td>
                  <div>
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_4").showModal()
                      }
                      className="btn bg-blue-700 text-white"
                    >
                      Give Mark
                    </button>
                    <dialog id="my_modal_4" className="modal ">
                      <div className="modal-box bg-red-200">
                        
                <div className="modal-action"></div>
                        <div className="modal-action ">
                          <div method="dialog">
                            <form onSubmit={handleSubmit} className=" mr-20">
                              <div className="flex sm:flex-col md:justify-between mb-8">
                                <div className="form-control gap-2 md:w-1/2">
                                  <label className="label">
                                    <span className="label-text">
                                      PDF/Doc: 
                                    </span>
                                  </label>

                                  <label className="input-group">
                                    <input
                                      type="text"
                                      name=""
                                      placeholder={assignment.pdf}
                                      className="input input-bordered w-full "
                                      
                                    />
                                  </label>
                                 
                                </div>
                                <div className="form-control gap-2 md:w-1/2">
                                  <label className="label">
                                    <span className="label-text">
                                      Note:
                                    </span>
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
                                    <span className="label-text">
                                      Give Mark & Feedback:
                                    </span>
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
                                    <textarea
                                      name="feedBack"
                                      id=""
                                      className="rounded-lg text-gray-400  p-2 w-full"
                                    >
                                      Feedback
                                    </textarea>
                                  </div>
                                </div>

                                <input
                                  type="submit"
                                  value="Request"
                                  className="btn btn-block bg-green-300"
                                />
                              </div>
                            <Link to='/'>  <button className="btn">Go Back</button></Link>
                            </form>
                          </div>
                        </div>
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
