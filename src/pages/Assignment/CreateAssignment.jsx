import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";

const CreateAssignment = () => {
  const [dueDate, setDueDate] = useState(new Date());
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth() || {};

  const handleAssignment = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const marks = form.marks.value;
    const description = form.description.value;
    const level = form.level.value;
    const photoFile = form.photo.files[0]; // Get the selected image file

    // Create form data for imgbb
    const formData = new FormData();
    formData.append("image", photoFile);

    const imgbbApiKey = import.meta.env.VITE_imgbbApiKey; 

    setUploading(true);

    // Upload image to imgbb
    fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const photo = imgData.data.display_url; 

          const newAssignment = {
            photo,
            name: user.displayName,
            email: user.email,
            title,
            marks,
            date: dueDate,
            description,
            level,
          };

          console.log(newAssignment);

          // Send data to the server
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
                  title: "Created!",
                  text: "Your assignment has been added.",
                  icon: "success",
                });
              }
              setUploading(false);
            });
        } else {
          setUploading(false);
          Swal.fire({
            title: "Image upload failed",
            text: "Please try again.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Image upload failed", error);
        setUploading(false);
        Swal.fire({
          title: "Image upload failed",
          text: "Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="lg:max-w-3xl max-w-md mx-auto bg-emerald-100">
      <div className=" p-4  dark:text-black">
        <h2 className="text-xl md:text-3xl text-center font-bold mb-8">
          Create a new assignment
        </h2>
        <form onSubmit={handleAssignment} className="font-medium">
          {/* Photo file input */}
          <div className="mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-black">
                  Upload Thumbnail Image:
                </span>
              </label>
              <label className="input-group">
                <input
                  type="file"
                  name="photo"
                  className="input input-bordered w-full dark:text-gray-400 py-2"
                  required
                />
              </label>
            </div>
          </div>

          {/* form title, name, and marks */}
          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2">
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
            <div className="form-control md:w-1/2 ml-4">
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
              <select
                name="level"
                className="select text-gray-800 dark:text-gray-400"
              >
                <option disabled selected>
                  Select One
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
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
            value={uploading ? "Creating..." : "Create Assignment"}
            className="btn btn-block bg-emerald-600 text-white hover:bg-emerald-800"
            disabled={uploading}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
