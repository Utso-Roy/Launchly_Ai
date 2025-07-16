import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Loading from "../../Context/Auth/Loader/Loading";

const Statistics = () => {
  const [users, setUsers] = useState([]);
  const [totalVote, setTotalVote] = useState([]);
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/mangeUser").then((res) => res.json()),
      fetch("http://localhost:3000/totalVotesProducts").then((res) =>
        res.json()
      ),
      fetch("http://localhost:3000/all_pending_products").then((res) =>
        res.json()
      ),
      fetch("http://localhost:3000/all_Accepted_products").then((res) =>
        res.json()
      ),
    ])
      .then(([usersData, votesData, pendingData, acceptedData]) => {
        setUsers(usersData);
        setTotalVote(votesData);
        setPending(pendingData);
        setAccepted(acceptedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  const totalUsers = users.length;
  const acceptedCount = accepted.length;
  const pendingCount = pending.length;
  const votesCount = totalVote.reduce((a, b) => a + (b.votes || 0), 0);

  const chartData = [
    { name: "Total Users", value: totalUsers },
    { name: "Accepted Products", value: acceptedCount },
    { name: "Pending Products", value: pendingCount },
    { name: "Total Votes", value: votesCount },
  ];

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

  if (loading) {
    return (
      <div >
<Loading></Loading>
        </div>
    );
  }

  return (
    <div className="p-6 w-full ">
      <h2 className="text-3xl  text-center font-extrabold mb-8 text-[#201571] dark:text-white">
        Platform Summary Bar Chart
      </h2>

     <div className="overflow-x-auto">
  <div className="min-w-[700px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={14} tick={{ fill: "#4B5563" }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value">
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

    </div>
  );
};

export default Statistics;
