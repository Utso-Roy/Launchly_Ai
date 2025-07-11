import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { axiosSecure } from '../../Services/products_Api/Featured_Products_Api';
import Loading from '../../Context/Auth/Loader/Loading';
import { useQuery } from '@tanstack/react-query';

const ReportDetails = () => {
    const paramsId = useParams()
    const navigate = useNavigate()
    const { id } = paramsId
    console.log(id)

     const { data: report = [], isLoading } = useQuery({
    queryKey: ["reported_contents"],
    queryFn: () => axiosSecure("reported"),
  });

    if (isLoading) return <Loading> </Loading>;

    console.log(report)
    const reportDetails = report.find(item => item._id == id)
    console.log(reportDetails)

    return (
       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-md sm:mx-5 lg:mx-10 my-6 overflow-hidden">
      <img
        src={reportDetails?.productImage}
        alt={reportDetails?.productName}
        className="w-full h-52 object-cover"
      />

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {reportDetails?.productName}
        </h2>

        <div className="space-y-2 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-gray-800 dark:text-gray-100">Reported By:</span> {reportDetails?.reporterName}
          </p>

          <p className="text-gray-700 dark:text-gray-300 break-all">
            <span className="font-semibold text-gray-800 dark:text-gray-100">User ID:</span> {reportDetails?.reporterId}
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-gray-800 dark:text-gray-100">Reported At:</span> {reportDetails?.
reportedAt}
          </p>
        </div>
            </div>
<button onClick={() => navigate(-1)} className="btn bg-[#21CAD2] hover:bg-[#77d5da] text-white mx-auto block">
  Back to Reported Contents
</button>
    </div>
    );
};

export default ReportDetails;