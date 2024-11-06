import React from "react";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="hover:border-purple-950 hover:border-[4px] bg-white shadow-md p-5 rounded-lg text-center w-[250px] border-t border-b border-gray-300 transition-all duration-500 hover:shadow-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border ">
      <img
        src={`${server}/${course.image}`}
        alt={course.title}
        className="w-full h-[150px] object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg text-white mb-2">{course.title}</h3>
      <p className="text-sm text-white mb-1">Instructor - {course.createdBy}</p>
      <p className="text-sm text-white mb-1">
        Duration - {course.duration} weeks
      </p>
      <p className="text-sm text-white mb-2">Price - ₹{course.price}</p>

      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="common-btn"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Started
        </button>
      )}

      <br />

      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="common-btn bg-red-500 hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;
