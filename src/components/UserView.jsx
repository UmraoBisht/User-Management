import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync } from "../features/userSlice";
import { Eye, Plus, Search, Trash, UserPen } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import UserFormModal from "./UserFormModal";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

function UserView() {
  const { users, status, error } = useSelector((state) => state.users);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deletedUser, setDeletedUser] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const dispatch = useDispatch();

  const handleOpenModal = (user = null) => {
    setSelectedUser(user); // If user is passed, it's for updating, otherwise for creating
    setModalOpen(true);
  };

  const handleDeleteModal = (user) => {
    setIsDeleteModal(true);
    setDeletedUser(user);
  };

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  // Notify if there's an error
  useEffect(() => {
    if (error) {
      toast.error("Error fetching users. Please try again.");
    }
  }, [error]);

  useEffect(() => {
    if (isModalOpen || isDeleteModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen, isDeleteModal]);

  // Handle search input change
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on the search query
  const filteredUsers = searchQuery
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users; // If searchQuery is empty, show all users

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <h1 className="font-bold text-lg">User Management</h1>
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="user-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search />
                  </div>
                  <input
                    type="text"
                    id="user-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchInput} // Handle search input change
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                onClick={() => handleOpenModal()}
              >
                <Plus />
                Add User
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white dark:text-gray-400">
              <thead className="text-xs font-bold uppercase bg-slate-500 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    City
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Company Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Website
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {status === "loading" ? (
                  [...Array(10)].map((_, idx) => (
                    <tr key={idx}>
                      <td>
                        <Skeleton height={40} />
                      </td>
                      <td>
                        <Skeleton height={40} />
                      </td>
                      <td>
                        <Skeleton height={40} />
                      </td>
                      <td>
                        <Skeleton height={40} />
                      </td>
                      <td>
                        <Skeleton height={40} />
                      </td>
                      <td>
                        <Skeleton height={40} />
                      </td>
                      <td>
                        <Skeleton height={40} />
                      </td>
                      <td>
                        <Skeleton height={40} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className={`border-b ${
                          user.id % 2 === 0 ? "bg-slate-500" : "bg-zinc-500"
                        } dark:border-gray-700`}
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium whitespace-nowrap dark:text-white"
                        >
                          {user.id}
                        </th>
                        <td className="px-4 py-3">{user.name}</td>
                        <td className="px-4 py-3">{user?.address?.city}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.phone}</td>
                        <td className="px-4 py-3">{user?.company?.name}</td>
                        <td className="px-4 py-3">
                          {user?.website ? user?.website : null}
                        </td>
                        <td className="px-4 py-3 gap-2 flex items-center justify-center">
                          <Link to={`/user/${user.id}`}>
                            <Eye />
                          </Link>
                          {isModalOpen && (
                            <UserFormModal
                              user={selectedUser}
                              setModalOpen={setModalOpen}
                            />
                          )}
                          <UserPen
                            className="hover:cursor-pointer"
                            onClick={() => handleOpenModal(user)}
                          />
                          {isDeleteModal && deletedUser.id === user.id ? (
                            <DeleteModal
                              id={user.id}
                              setIsDeleteModal={setIsDeleteModal}
                            />
                          ) : null}
                          <Trash
                            className="hover:cursor-pointer"
                            onClick={() => handleDeleteModal(user)}
                          />
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserView;
