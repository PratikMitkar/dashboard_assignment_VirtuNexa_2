import React from "react";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-md w-auto bg-white p-4 mr-5">
      <div className="flex flex-col items-center">
        {/* User Image */}
        <img
          src={user.image}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        {/* User Name */}
        <h3 className="mt-2 text-lg font-semibold">{user.name}</h3>
        {/* User Title */}
        <p className="text-sm text-gray-500">{user.title}</p>
        {/* Badge */}
        <span className="mt-2 inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {user.role}
        </span>
        {/* Action Buttons */}
        <div className="flex mt-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 peer-checked:text-blue-600">
            </span>
          </label>
        </div>
        {/* Edit and Delete Buttons */}
        <div className="flex mt-2 space-x-4">
          <button
            onClick={onEdit}
            className="text-yellow-500 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
