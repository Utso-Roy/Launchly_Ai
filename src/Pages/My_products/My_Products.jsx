import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { axiosSecure } from '../../Services/products_Api/Featured_Products_Api';

const My_Products = () => {
  const { data: postProducts = [], isLoading, error } = useQuery({
    queryKey: ['post_products'],
    queryFn: async () => {
      const res = await axiosSecure('add_products_data');
      console.log('data:', res.data); // ✅ Check console
      return res.data || [];
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Products</h2>
      {postProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Product Name</th>
              <th className="p-2 text-left">Votes</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {postProducts.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.votes || 0}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      product.status === 'Accepted'
                        ? 'bg-green-200 text-green-800'
                        : product.status === 'Rejected'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {product.status || 'Pending'}
                  </span>
                </td>
                <td className="p-2 space-x-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded">
                    Update
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default My_Products;
