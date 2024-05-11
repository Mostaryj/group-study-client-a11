import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const Update = () => {
    const [dueDate, setDueDate] = useState(new Date());
    const [assignments, setAssignments] = useState([]);


    const updatedAssignment = useLoaderData();

    const { _id, photo, title, marks, description, date, level} =
      updatedAssignment;
  
     
  
    const handleUpdate = (event) => {
       event.preventDefault();
      const form = event.target;
      const photo = form.photo.value;
      const title = form.title.value;
      const marks = form.marks.value;
      const description = form.description.value;
      const date = form.date.value;
      const level = form.level.value;
     
  
      const updated = {
        photo,
        title,
        marks,
        date,
        description,
        level,
       
      };
  
      console.log(updated);
  
      //send data to server
      fetch(`http://localhost:5000/study/${_id}`, {
         
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updated),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: " Updated Successfully",
              icon: "success",
              confirmButtonText: "Cool",
            });
            
            const remaining = assignments.filter(
              (assignment) => assignment.id !== _id
            );
            setAssignments(remaining);
          }
        })
    };


    return (
        <div>
        <div className="bg-sky-100 p-4 md:p-24">
          <h2 className="text-3xl  font-pop text-center font-extrabold">
            Update Assignment
          </h2>
          <form onSubmit={handleUpdate}>
            {/* photo url */}
            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Thumbnail Image URL:</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="photo"
                    placeholder="Image URL"
                    className="input input-bordered w-full"
                    defaultValue={photo}
                   
                  />
                </label>
              </div>
            </div>
            {/* form title name and marks */}
            <div className="md:flex mb-8">
              <div className="form-control  md:w-1/2">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="input input-bordered w-full"
                    defaultValue={title}
                  />
                </label>
              </div>
              <div className="form-control  md:w-1/2 ml-4">
                <label className="label">
                  <span className="label-text">Marks: </span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="marks"
                    placeholder="Marks"
                    className="input input-bordered w-full"
                   defaultValue={marks}
                  />
                </label>
              </div>
            </div>
  
            {/* form date and level */}
            <div className="md:flex mb-8">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Due Date:</span>
                </label>
                <DatePicker
                  name="date"
                  className="w-full p-3 rounded-lg"
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  defaultValue={date}
                />
              </div>
              <div className="form-control md:w-1/2 ml-4">
                <label className="label">
                  <span className="label-text">Difficulty Level</span>
                </label>
                <select name="level" defaultValue={level} className="select text-gray-800">
                  <option disabled selected>
                    Select One
                  </option>
  
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
            {/* description */}
            <div>
              <h3>Description:</h3>
              <textarea
                className="textarea textarea-bordered h-[150px] w-full"
                placeholder="About your assignment"
                name="description"
                defaultValue={description}
              ></textarea>
            </div>
  
            <input
              type="submit"
              value="Update"
              className="btn btn-block bg-emerald-600 text-white"
            />
          </form>
        </div>
      </div>
    );
};

export default Update;