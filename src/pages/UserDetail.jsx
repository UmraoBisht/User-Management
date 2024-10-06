import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByIdAsync } from "../features/userSlice"; // Adjust this import according to your project structure
import { Link, useParams } from "react-router-dom"; // Import useParams to get userId from the URL
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles
import { toast } from "react-toastify";

const UserDetail = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { selectedUser, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserByIdAsync(userId)); // Fetch user details by ID
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) {
      toast.error("Error: something went wrong");
    }
  }, error);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="max-w-screen-xl mx-auto px-4">
        {selectedUser && (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {selectedUser.name}
            </h1>
            <p className="text-lg mb-2">
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p className="text-lg mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="text-lg mb-2">
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p className="text-lg mb-2">
              <strong>Address:</strong> {selectedUser.address.street},{" "}
              {selectedUser.address.suite}, {selectedUser.address.city},{" "}
              {selectedUser.address.zipcode}
            </p>
            <p className="text-lg mb-2">
              <strong>Geo Location:</strong> Latitude:{" "}
              {selectedUser.address.geo.lat}, Longitude:{" "}
              {selectedUser.address.geo.lng}
            </p>
            <p className="text-lg mb-2">
              <strong>Company:</strong> {selectedUser.company.name}
            </p>
            <p className="text-lg mb-2">
              <strong>Website:</strong>{" "}
              <Link
                to={`${selectedUser.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {selectedUser.website}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
