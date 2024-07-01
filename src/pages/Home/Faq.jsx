const Faq = () => {
  return (
    <section className="mt-8 dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        <h2 className="text-2xl text-center font-semibold sm:text-4xl">
           Asked Questions 
        </h2>
        <p className="mt-4 mb-8 text-center dark:text-gray-600">
          Here are some common questions about StudyHub. If you do not find your answer, feel free to reach out to us.
        </p>
        <div className="space-y-4">
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              How do I submit an assignment?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              To submit an assignment, log in to your StudyHub account, navigate to the Assignments section, and click on the assignment you want to submit. Follow the instructions provided to upload your assignment file.
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              Can I edit my submitted assignment?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              Once you have submitted an assignment, you cannot edit it. Make sure to review your assignment carefully before submitting it.
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              How do I view my grades and feedback?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              You can view your grades and feedback by accessing the My Assignments section in your StudyHub account. Click on the assignment you want to view the grades for, and you will see your grade along with any feedback provided by your instructor.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Faq;

