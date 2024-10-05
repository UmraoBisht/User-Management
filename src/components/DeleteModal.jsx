import { CircleAlert, X } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteUserAsync } from "../features/userSlice";

function DeleteModal({ id, setIsDeleteModal }) {
  const { error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    console.log(id);
    
    try {
      dispatch(deleteUserAsync(id));
    } catch (error) {
      toast.error(`Error deleting user: ${error.message}`);
    }
    // Close the modal after deletion
    setIsDeleteModal(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error deleting user: ${error.message}`);
    }
  }, [error]);

  return (
    <div
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden backdrop-brightness-70 absolute top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  md:h-full"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setIsDeleteModal(false)}
          >
            <X />
            <span className="sr-only">Close modal</span>
          </button>
          <CircleAlert />
          <p className="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to delete this user?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              data-modal-toggle="deleteModal"
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setIsDeleteModal(false)}
            >
              No, cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={handleDelete}
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
