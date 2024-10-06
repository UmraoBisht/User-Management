// userApi.js

export const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};
export const fetchUserById = async (userId) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/"+userId);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

export const createUser = async (newUser) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    return true; // or return a message indicating success
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
};
