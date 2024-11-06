import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: import.meta.env.Razorpay_Key,
      amount: order.id,
      currency: "INR",
      name: "HyLearn",
      description: "Elivate with us...",
      order_id: order.id,

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="text-center mx-auto my-10 mb-14 rounded-lg p-6 w-11/12 md:w-2/5 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
              <div className="flex flex-col items-center justify-center md:flex-row gap-5 mb-10">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="w-48 h-36 object-cover rounded-lg"
                />
                <div className="text-left">
                  <h2 className="text-xl font-bold text-white">
                    {course.title}
                  </h2>
                  <p className="text-sm text-white">
                    Instructor: {course.createdBy}
                  </p>
                  <p className="text-sm text-white">
                    Duration: {course.duration} weeks
                  </p>
                </div>
              </div>
              <p className="text-white text-sm max-w-2xl mx-auto">
                {course.description}
              </p>
              <p className="mt-2 text-lg text-white">
                Let's get started with the course at ₹{course.price}
              </p>

              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="mt-5 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={checkoutHandler}
                  className="mt-5 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
                >
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
