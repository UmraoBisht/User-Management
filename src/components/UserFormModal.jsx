import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, updateUserAsync } from "../features/userSlice";

function UserFormModal({ user, setModalOpen }) {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.users);

  // Set default values based on whether user data is passed
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      username: user?.username ? `USER-${user?.username}` : "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      companyName: user?.company?.name || "",
      website: user?.website || "",
    },
  });

  const onSubmit = async (formData) => {
    const address = {
      street: formData.street,
      city: formData.city,
    }; // Create new address object
    const company = {
      name: formData.companyName,
    }; // Create new company object
    delete formData.street;
    delete formData.city;
    delete formData.companyName;

    if (user) {
      // Update user
      const updatedUser = { ...user, ...formData, address, company }; // Merge user data with form data
      dispatch(updateUserAsync(updatedUser));
    } else {
      dispatch(createUserAsync({ ...formData, address, company }));
    }
    setModalOpen(false);
    reset(); // Reset form fields after submit
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error, status]);

  return (
    <>
      {/* Main modal */}
      <div
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden backdrop-brightness-70 absolute top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  md:h-full"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* Modal content */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user ? "Edit User" : "Add User"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setModalOpen(false)}
              >
                <X />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: 3,
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message ||
                        "Name must be at least 3 characters."}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Username (non-editable) */}
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    {...register("username")}
                    placeholder="Your username"
                    readOnly={user?.username ? true : false}
                    className={`${
                      user?.username ? "bg-gray-200" : "bg-gray-100"
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white`}
                  />
                </div>

                {/* Address (Street) */}
                <div>
                  <label
                    htmlFor="street"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    {...register("street", { required: "Street is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your street address"
                  />
                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.street.message}
                    </p>
                  )}
                </div>

                {/* Address (City) */}
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register("city", { required: "City is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Company Name (Optional) */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    {...register("companyName", {
                      minLength: {
                        value: 3,
                        message:
                          "Company name must be at least 3 characters, if provided",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your company name"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                {/* Website (Optional) */}
                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Website (Optional)
                  </label>
                  <input
                    type="text"
                    id="website"
                    {...register("website", {
                      pattern: {
                        value:
                          /^(https?:\/\/)?([\w-]+\.){1,3}[a-zA-Z]{2,}(\/.*)?(\?.*)?$/,
                        message: "Please enter a valid URL",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your website URL"
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.website.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserFormModal;
