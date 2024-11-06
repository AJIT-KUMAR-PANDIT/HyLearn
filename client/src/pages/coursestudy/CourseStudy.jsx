import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <>
      {course && (
        <div
          className="p-8  flex flex-col items-center min-h-[50%] w-[30%] mx-auto mt-12 mb-12 rounded-lg shadow-xl
        bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
        "
        >
          <img
            src={`${server}/${course.image}`}
            alt="Course"
            className=" mb-4"
          />
          <h2 className="text-2xl text-white text-center mb-[-16px]">
            {course.title}
          </h2>
          <h5 className="text-sm text-white text-center mt-2 mb-4">
            {course.description}
          </h5>
          <h6 className="text-sm text-white text-center mb-4">
            by - {course.createdBy}
          </h6>
          <h5 className="text-sm text-white text-center mt-[-18px] mb-[-12px]">
            Duration - {course.duration} weeks
          </h5>
          <br />
          <br />
          <Link
            to={`/lectures/${course._id}`}
            className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300 mt-[-15px] block text-center"
          >
            Lectures
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
