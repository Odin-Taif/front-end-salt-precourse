import React from "react";
import { fetchUsers } from "../lib/fetchUsers";

export const Users = async () => {
  const users = await fetchUsers();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {users &&
        users.map((user) => (
          <div key={user.id} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        ))}
    </div>
  );
};

export default Users;
