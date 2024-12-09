import React from "react";

const UserOverView: React.FC = () => {
  // Hardcoded users
  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "frans", password: "frans123", role: "speaker"},
    { username: "jan", password: "jan123", role: "organizer" },
    { username: "frits", password: "frits123", role: "participant" },
  ];

  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Password</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.password}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOverView;
