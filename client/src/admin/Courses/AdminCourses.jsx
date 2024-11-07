import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-center flex-wrap gap-4 py-4 px-4 md:px-8 lg:px-16">
        <div className="md:absolute md:right-0 w-full md:w-1/3" id="hideInPc">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white mt-10 md:mt-0">
            <h2 className="text-xl text-green-500 font-bold mb-4 text-center">
              Add Course
            </h2>
            <form onSubmit={submitHandler} className="space-y-4 text-left">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md bg-yellow-100 text-black"
                />
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md bg-yellow-100 text-black"
                />
              </div>

              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md bg-yellow-100 text-black"
                />
              </div>

              <div>
                <label className="block mb-1">Created By</label>
                <input
                  type="text"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md bg-yellow-100 text-black"
                />
              </div>

              <div>
                <label className="block mb-1">Category</label>
                <select
                  id="select-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md bg-yellow-100 text-black"
                >
                  <option value="">Select Category</option>
                  {categories.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Duration</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md bg-yellow-100 text-black"
                />
              </div>

              <div>
                <label className="block mb-1">Image</label>
                <input
                  type="file"
                  required
                  onChange={changeImageHandler}
                  className="w-full text-white"
                />
                {imagePrev && (
                  <img src={imagePrev} alt="" width={300} className="mt-4" />
                )}
              </div>

              <button
                type="submit"
                disabled={btnLoading}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
              >
                {btnLoading ? "Please Wait..." : "Add"}
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-semibold mb-4">All Courses</h1>
          <div className="flex flex-wrap justify-around gap-5 mt-10 ml-1">
            {courses && courses.length > 0 ? (
              courses.map((e) => <CourseCard key={e._id} course={e} />)
            ) : (
              <p className="text-center text-lg">No Courses Yet</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
