import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";

const CreateAssignment = () => {
  const [dueDate, setDueDate] = useState(new Date());

   const { user } = useAuth() || {};

  const handleAssignment = (event) => {
    event.preventDefault();
    const form = event.target;
    const photo = form.photo.value;
    // const name = form.name.value;
    // const email = form.email.value;
    const title = form.title.value;
    const marks = form.marks.value;
    const description = form.description.value;
    const date = form.date.value;
    const level = form.level.value;

    const newAssignment = {
      photo,
      name: user.displayName,
      email:user.email,
      title,
      marks,
      date,
      description,
      level,
    };

    console.log(newAssignment);
    console.log(form);

    //send data to server
    fetch("https://group-study-server-eight.vercel.app/study/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newAssignment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, create it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Created!",
                text: "Your assignment has been added.",
                icon: "success",
              });
            }
          });
        }
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-emerald-100">
      <div className=" p-4  dark:text-black">
        <h2 className="text-3xl  font-pop text-center font-extrabold">
          Create a new assignment
        </h2>
        <form onSubmit={handleAssignment} className="font-medium">
          {/* photo url */}
          <div className="mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-black">Thumbnail Image URL:</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="photo"
                  placeholder="Image URL"
                  className="input input-bordered w-full dark:text-gray-400"
                  required
                />
              </label>
            </div>
          </div>

       
          {/* form title name and marks */}
          <div className="md:flex mb-8">
            <div className="form-control  md:w-1/2">
              <label className="label">
                <span className="label-text dark:text-black">Title</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="input input-bordered w-full dark:text-gray-400"
                  required
                />
              </label>
            </div>
            <div className="form-control  md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text dark:text-black">Marks: </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="marks"
                  placeholder="Marks"
                  className="input input-bordered w-full dark:text-gray-400"
                  required
                />
              </label>
            </div>
          </div>

          {/* form date and level */}
          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text dark:text-black">Due Date:</span>
              </label>
              <DatePicker
                name="date"
                placeholderText="Date"
                className="w-full p-3 rounded-lg dark:text-gray-400"
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
              />
            </div>
            <div className="form-control md:w-1/2 ml-4 ">
              <label className="label">
                <span className="label-text dark:text-black">Difficulty Level</span>
              </label>
              <select name="level" className="select text-gray-800 dark:text-gray-400">
                <option disabled selected>
                  Select One
                </option>

                <option value='easy'>Easy</option>
                <option value ='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>
            </div>
          </div>
          {/* description */}
          <div>
            <h3>Description:</h3>
            <textarea
              className="textarea textarea-bordered h-[150px] w-full mt-2 mb-6 dark:text-gray-400"
              placeholder="About your assignment"
              name="description"
            ></textarea>
          </div>

          <input
            type="submit"
            value="Create Assignment"
            className="btn btn-block bg-emerald-600 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
