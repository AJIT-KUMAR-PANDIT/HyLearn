import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Web Development",
    description: "Learn to build responsive websites",
  },
  {
    id: 2,
    title: "Data Science",
    description: "Master data analysis and visualization",
  },
  {
    id: 3,
    title: "Artificial Intelligence",
    description: "Explore the world of AI and machine learning",
  },
  {
    id: 4,
    title: "Cyber Security",
    description: "Protect yourself and others from cyber threats",
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "Learn to market yourself and your business online",
  },
  {
    id: 6,
    title: "Cloud Computing",
    description: "Master the art of cloud infrastructure and migration",
  },
];

const CourseExplore = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          We Have Manny Courses, For You To Learn
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the vast range of courses available on HyLearn
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseExplore;
