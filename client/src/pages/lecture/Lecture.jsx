import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server, frontend } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { SiGoogledisplayandvideo360 } from "react-icons/si";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [notes, setNotes] = useState("");

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  const viewQuiz = () => {
    window.open(`${frontend}/quiz`, "_blank");
  };
  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const changeNotesHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];

      if (allowedTypes.includes(file.type)) {
        setNotes(file);
      } else {
        toast.error("Please select a valid file (PDF, DOC, PPT).");
      }
    }
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("video", video);
    if (notes) {
      myForm.append("notes", notes);
    }
    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.message);
      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(progress);

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);

  const viewNotes = () => {
    window.open(`${server}/${lecture.notes}`, "_blank");
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="text-center p-4 bg-gray-800 text-white rounded-md mb-4">
            Lecture completed - {completedLec} out of {lectLength} <br />
            <progress
              value={completed}
              max={100}
              className="w-full mt-2"
            />{" "}
            {completed} %
          </div>
          <div className="flex flex-col md:flex-row justify-between min-h-[80vh] space-y-4 md:space-y-0 md:space-x-4">
            <div className=" md:w-7/12 w-full p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <div className="flex flex-wrap">
                      <video
                        src={`${server}/${lecture.video}`}
                        style={{
                          WebkitProgressBar: { backgroundColor: "#ff0000" },
                          MozProgressBar: { backgroundColor: "#00ff00" },
                        }}
                        width="100%"
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                        onEnded={() => addProgress(lecture._id)}
                      ></video>
                      <h1 className="text-white text-2xl mt-4">
                        {lecture.title}

                        {lecture.notes === "" ? (
                          <></>
                        ) : (
                          <button
                            onClick={viewNotes}
                            className="bg-[#bfbc2a] p-3 rounded-md absolute right-1"
                          >
                            View Notes
                          </button>
                        )}
                      </h1>
                      <br />
                      <br />
                      <br />
                      <br />
                      <h3 className="text-white mt-4">{lecture.description}</h3>
                    </div>
                  ) : (
                    <h1 className="text-white text-xl">
                      Please Select a Lecture
                    </h1>
                  )}
                </>
              )}
            </div>
            <div className="md:w-4/12 w-full p-4">
              {user && user.role === "admin" && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Close" : "Add Lecture +"}
                </button>
              )}
              {show && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl mb-4">Add Lecture</h2>
                  <form onSubmit={submitHandler}>
                    <label className="block text-sm mb-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full p-3 mb-4 border rounded-md"
                    />
                    <label className="block text-sm mb-2">Description</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="w-full p-3 mb-4 border rounded-md"
                    />
                    <label className="block text-sm mb-2">Choose Video</label>
                    <input
                      type="file"
                      placeholder="choose video"
                      onChange={changeVideoHandler}
                      required
                      className="w-full p-3 mb-4 border rounded-md"
                    />
                    <label className="block text-sm mb-2">
                      Choose Lecture Notes
                    </label>
                    <input
                      type="file"
                      placeholder="choose Lecture Notes"
                      onChange={changeNotesHandler}
                      className="w-full p-3 mb-4 border rounded-md"
                      accept=".pdf, .doc, .docx, .ppt, .pptx"
                    />

                    {videoPrev && (
                      <video
                        src={videoPrev}
                        alt=""
                        width={300}
                        controls
                        className="my-4"
                      ></video>
                    )}
                    <button
                      disabled={btnLoading}
                      type="submit"
                      className="w-full bg-blue-500 text-white py-3 rounded-md"
                    >
                      {btnLoading ? "Please Wait..." : "Add"}
                    </button>
                  </form>
                </div>
              )}
              <h4 className="text-white text-xl mt-4">PlayList</h4>
              <div className="max-h-[628px] overflow-y-auto p-4">
                {lectures && lectures.length > 0 ? (
                  lectures.map((e, i) => (
                    <div key={i}>
                      <div
                        onClick={() => fetchLecture(e._id)}
                        className={`p-3 border mb-2 rounded-md cursor-pointer flex justify-between hover:bg-blue-500 hover:text-white ${
                          lecture._id === e._id
                            ? "bg-blue-500 text-white"
                            : "bg-white"
                        }`}
                      >
                        {i + 1}. {e.title}
                        {progress[0] &&
                          progress[0].completedLectures.includes(e._id) && (
                            <span className="text-green-500 ml-2">
                              <TiTick />
                            </span>
                          )}
                        <span className="relative right-1">
                          <SiGoogledisplayandvideo360 />
                        </span>
                      </div>
                      {user && user.role === "admin" && (
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                          onClick={() => deleteHandler(e._id)}
                        >
                          Delete {e.title}
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center">No Lectures</p>
                )}
              </div>{" "}
              <button
                className="text-white bg-[#07abf2] text-4xl p-2 w-full"
                onClick={viewQuiz}
              >
                Give Quiz
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
