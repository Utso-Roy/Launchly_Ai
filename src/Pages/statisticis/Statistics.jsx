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
  PieChart,
  Pie,
} from "recharts";
import Loading from "../../Context/Auth/Loader/Loading";
import { FaUsers, FaCheckCircle, FaClock, FaVoteYea } from "react-icons/fa";

const Statistics = () => {
  const [users, setUsers] = useState([]);
  const [totalVote, setTotalVote] = useState([]);
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://launchly-server-side.vercel.app/mangeUser").then((res) =>
        res.json()
      ),
      fetch("https://launchly-server-side.vercel.app/totalVotesProducts").then(
        (res) => res.json()
      ),
      fetch(
        "https://launchly-server-side.vercel.app/all_pending_products"
      ).then((res) => res.json()),
      fetch(
        "https://launchly-server-side.vercel.app/all_Accepted_products"
      ).then((res) => res.json()),
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

  const COLORS = ["#21BEDA", "#10B981", "#F59E0B", "#EF4444"];

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <FaUsers />,
      color: "from-[#21BEDA] to-[#101960]",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-[#21BEDA] dark:text-blue-400",
    },
    {
      title: "Accepted Products",
      value: acceptedCount,
      icon: <FaCheckCircle />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-500 dark:text-green-400",
    },
    {
      title: "Pending Products",
      value: pendingCount,
      icon: <FaClock />,
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      iconColor: "text-yellow-500 dark:text-yellow-400",
    },
    {
      title: "Total Votes",
      value: votesCount,
      icon: <FaVoteYea />,
      color: "from-red-400 to-pink-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-500 dark:text-red-400",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#101960] dark:text-white mb-3">
          Platform Statistics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Overview of your platform's performance and metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
          >
            <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.bgColor} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className={`${stat.iconColor} text-3xl`}>
                    {stat.icon}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-[#101960] dark:text-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-[#21BEDA] to-[#101960] rounded-full"></div>
            Platform Overview
          </h3>
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                  <defs>
                    {COLORS.map((color, index) => (
                      <linearGradient
                        key={index}
                        id={`gradient${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                        <stop
                          offset="100%"
                          stopColor={color}
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    className="dark:stroke-gray-700"
                  />
                  <XAxis
                    dataKey="name"
                    fontSize={12}
                    tick={{ fill: "#6B7280" }}
                    angle={-15}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis fontSize={12} tick={{ fill: "#6B7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#gradient${index})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-[#101960] dark:text-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-[#21BEDA] to-[#101960] rounded-full"></div>
            Distribution View
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-8 bg-[#21BEDA] dark:from-yellow-400 dark:to-yellow-600 rounded-2xl shadow-xl p-6 text-white dark:text-gray-900">
        <h3 className="text-2xl font-bold mb-4">Quick Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/20 dark:bg-black/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm opacity-90 mb-1">Product Approval Rate</p>
            <p className="text-3xl font-bold">
              {pendingCount + acceptedCount > 0
                ? Math.round(
                    (acceptedCount / (pendingCount + acceptedCount)) * 100
                  )
                : 0}
              %
            </p>
          </div>
          <div className="bg-white/20 dark:bg-black/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm opacity-90 mb-1">Average Votes per Product</p>
            <p className="text-3xl font-bold">
              {acceptedCount > 0
                ? Math.round(votesCount / acceptedCount)
                : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;