import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";


const Take = () => {
  const { user } = useAuth() || {};
  const [dueDate, setDueDate] = useState(new Date());


  

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const pdf = form.pdf.value;
    const note = form.note.value;
    const photo = form.photo.value;
    const name = form.name.value;
    const email = form.email.value;
    const title = form.title.value;
    const marks = form.marks.value;
    const description = form.description.value;
    const date = form.date.value;
    const level = form.level.value;


    const submitAssignment = {
        pdf,
        note,  
        photo,
        name,
        email,
        title,
        marks,
        date,
        description,
        level,   
      };
  
      console.log(submitAssignment);
      console.log(form);

    //    //send data to server
    fetch("https://group-study-server-eight.vercel.app/submit/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(submitAssignment),
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
              confirmButtonText: "Yes, submit it!",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Submitted!",
                  text: "Your assignment has been submitted.",
                  icon: "success",
                });
              }
            });
          }
        });

   
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-6">Take assignment</h1>
      <form onSubmit={handleSubmit}>
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
                  required
                />
              </label>
            </div>
          </div>

           {/* form title name and marks */}
           <div className="md:flex mb-8">
            <div className="form-control  md:w-1/2">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder={user.displayName}
                  className="input input-bordered w-full"
                 readOnly
                />
              </label>
            </div>
            <div className="form-control  md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text">Email: </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="email"
                  placeholder={user.email}
                  className="input input-bordered w-full"
               readOnly
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
                  required
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
                  required
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
                className="w-full p-3 rounded-lg border"
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
              />
            </div>
            <div className="form-control md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text">Difficulty Level</span>
              </label>
              <select name="level" className="select border text-gray-800">
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
              className="textarea textarea-bordered h-[150px] w-full"
              placeholder="About your assignment"
              name="description"
            ></textarea>
          </div>
        <div className="md:flex mb-8">
          <div className="form-control  md:w-1/2">
            <label className="label">
              <span className="label-text"> PDF/DOC</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="pdf"
                placeholder="pdf/doc"
                className="input input-bordered w-full"
                required
              
              />
           
            </label>
         
          </div>
          <div>
            <h3>Quick Note:</h3>
            <textarea
              className="textarea textarea-bordered h-[150px] w-full"
              placeholder="Note"
              name="note"
            ></textarea>
          </div>
        </div>

        <input
          type="submit"
          value="Submit Assignment"
          className="btn btn-block bg-emerald-600 text-white"
        />
      </form>
    </div>
  );
};

export default Take;
