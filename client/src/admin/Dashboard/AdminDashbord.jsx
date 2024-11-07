import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <Layout>
        <div className="flex justify-center items-center flex-wrap gap-4 py-4 px-4">
          <div className=" text-lime-500 rounded-lg text-center p-4 hover:bg-opacity-60 hover:text-green-400 transition-all bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
            <p>Total Courses</p>
            <p className="text-lg font-semibold">{stats.totalCoures}</p>
          </div>
          <div className=" text-lime-500 rounded-lg text-center p-4 hover:bg-opacity-60 hover:text-green-400 transition-all bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
            <p>Total Lectures</p>
            <p className="text-lg font-semibold">{stats.totalLectures}</p>
          </div>
          <div className=" text-lime-500 rounded-lg text-center p-4 hover:bg-opacity-60 hover:text-green-400 transition-all bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
            <p>Total Users</p>
            <p className="text-lg font-semibold">{stats.totalUsers}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;
