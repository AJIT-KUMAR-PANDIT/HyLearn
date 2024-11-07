import React, { useState } from "react";
import { Search } from "lucide-react";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  // Filter courses based on search term in title, description, or category
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-20 text-center min-h-[60vh]">
      <h2 className="text-2xl font-extrabold text-[#0060ca] mb-8">
        Available Courses
      </h2>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full md:w-[50vw] p-2 pl-10 text-sm text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500
            bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border 
            "
          />
          <button
            type="submit"
            className="p-2 text-gray-500 hover:text-white bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-8 text-white">
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Courses Found!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
