import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
const My = () => {
  const [mySubmit, setMySubmit] = useState();
  const { user } = useAuth() || {};

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://group-study-server-eight.vercel.app/submit-email/${user.email}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch assignments");
          }
          return res.json();
        })
        .then((data) => {
          setMySubmit(data);
        })
        .catch((err) => console.error(err.message));
    }
  }, [user]);

  return (
    <div className="bg-emerald-100 max-5w-xl mx-auto p-4">
      <h1 className="lg:text-4xl text-2xl font-bold font-pop text-center mt-">
        My Submitted Assignments{" "}
      </h1>
      <div className="overflow-x-auto mt-6">
        <table className="table font-medium">
          {/* head */}
          <thead>
            <tr className="bg-emerald-600 border border-emerald-600 text-white text-center">
              <th>SL</th>
              <th>Title</th>
              <th>Date</th>
              <th>Level</th>
              <th>Status</th>
              <th>Mark</th>
              <th>Feedback</th>
              <th>Examinee</th>
            </tr>
          </thead>
          <tbody className="border border-black">
            {/* row 1 */}
            {mySubmit &&
              mySubmit.map((assignment, index) => (
                <tr key={assignment._id} className="">
                  <td className="border border-black text-center">{index + 1}</td>
                  <td className="border border-black">{assignment.title}</td>
                  <td className="border border-black">{assignment.date}</td>
                  <td className="border border-black">{assignment.level}</td>
                  <td className="border border-black">{assignment.status}</td>
                  <td className="border border-black">{assignment.giveMark || "N/A"}</td>
                  <td className="border border-black">{assignment.feedBack || "N/A"}</td>
                  <td className="border border-black">{assignment.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default My;
