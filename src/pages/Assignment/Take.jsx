import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";

import { useLoaderData, useParams } from "react-router-dom";


const Take = () => {
  const { user } = useAuth() || {};
  

  const cards = useLoaderData();
  //  console.log(cards);
  const { id } = useParams();
  const card = cards.find((card) => card._id == id);
console.log(card);


  const handleSubmit = (e,id) => {
    e.preventDefault();
    const form = e.target;
    const pdf = form.pdf.value;
    const note = form.note.value;
 
   

    const submitAssignment = {
        pdf,
        note,  
        //  photo:user.photoURL,
         name:user.displayName,
         email:user.email,
         _id: id,
         title:card.title,
          marks:card.marks,
         date:card.date,
         level:card.level, 
         status: 'pending'  
      };
  
      console.log(submitAssignment);

    //    //send data to server
    fetch("https://group-study-server-eight.vercel.app/submit/",{
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mt-6">Take assignment</h1>
      <form onSubmit={handleSubmit} className="font-medium">
          <div className=" mb-8">
          <div className="form-control ">
            <label className="label">
              <span className="label-text"> PDF/DOC:</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="pdf"
                placeholder="pdf/doc"
                className="input input-bordered border-black w-full"
                required
              
              />
           
            </label>
         
          </div>
          <div>
            <h3 className="mt-4">Quick Notes:</h3>
            <textarea
              className="textarea textarea-bordered border-black h-[150px] w-full"
              placeholder="Note"
              name="note"
            ></textarea>
          </div>
        </div>

        <input
          type="submit"
          value="Submit Assignment"
          className="btn btn-block bg-emerald-600 text-white hover:bg-emerald-800"
        />
      </form>
    </div>
  );
};

export default Take;
