import React, { useState } from "react";
import UserCard from "../Reuse/UserCard";
import { useNavigation } from "../context/NavigationContext";
import SecurityCameraCard from "../Reuse/SecurityCameraCard";
import ThermostatCard from "../Reuse/ThermostatCard";

const Dashboard = () => {
  const navTitles = [
    "Study Room",
    "Bedroom",
    "Kitchen",
    "Hall"
  ];

  const items = [
    { name: "Fan", icon: "https://cdn-icons-png.flaticon.com/512/4551/4551810.png" },
    { name: "Light", icon: "https://cdn-icons-png.flaticon.com/512/115/115743.png" },
    { 
      name: "Thermostat", 
      icon: "https://cdn-icons-png.freepik.com/512/551/551047.png",
      type: "thermostat",
      temperature: 72,
      roomTemp: 70,
      deviceTemp: 71,
      targetTemp: 72,
      mode: "Cool",
      isOn: true
    },
    { 
      name: "Camera", 
      icon: "https://cdn-icons-png.flaticon.com/512/3004/3004613.png",
      type: "camera",
      isOnline: true,
      isRecording: false,
      preview: "https://via.placeholder.com/300x200",
      status: "Active"
    },
  ];

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jane Cooper",
      title: "Kitchen",
      role: "Admin",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const images_icon =[
    {
        name : "fan", src_img: 'https://cdn-icons-png.flaticon.com/512/4551/4551810.png',
    },
    {
        name : "light", src_img: 'https://cdn-icons-png.flaticon.com/512/115/115743.png'
    }
  ]

  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [showItemsMenu, setShowItemsMenu] = useState(false);

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleEditChange = (field, value) => {
    const updatedUser = { ...editingUser, [field]: value };
    
    if (field === 'name') {
      const matchingIcon = images_icon.find(icon => 
        icon.name.toLowerCase() === value.toLowerCase()
      );
      if (matchingIcon) {
        updatedUser.image = matchingIcon.src_img;
      }
    }
    
    setEditingUser(updatedUser);
  };

  const saveEdit = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUser.id ? editingUser : user
      )
    );
    setIsModalOpen(false);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const { selectedTitle } = useNavigation();

  const filteredUsers = selectedTitle === "Dashboard" 
    ? users 
    : users.filter(user => user.title === selectedTitle);

  const addItem = (item) => {
    const newItem = {
      id: Date.now(),
      name: item.name,
      title: selectedTitle === "Dashboard" ? "Study Room" : selectedTitle,
      role: "Device",
      image: item.icon,
      ...item // Spread additional properties
    };

    setUsers([...users, newItem]);
    setShowItemsMenu(false);
  };

  const handleToggleRecording = (id) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, isRecording: !user.isRecording } : user
      )
    );
  };

  const handleToggleThermostat = (id) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, isOn: !user.isOn } : user
      )
    );
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          onClick={() => setShowItemsMenu(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>

     
      {showItemsMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-semibold mb-4">Select Item to Add</h2>
            <div className="grid grid-cols-2 gap-4">
              {items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => addItem(item)}
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img src={item.icon} alt={item.name} className="w-12 h-12 mb-2" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowItemsMenu(false)}
                className="px-4 py-2 text-gray-700 border rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user) => {
          if (user.type === 'camera') {
            return (
              <div key={user.id}>
                <SecurityCameraCard
                  camera={{
                    ...user,
                    onToggleRecording: handleToggleRecording
                  }}
                  onEdit={() => openEditModal(user)}
                  onDelete={() => deleteUser(user.id)}
                />
              </div>
            );
          } else if (user.type === 'thermostat') {
            return (
              <div key={user.id}>
                <ThermostatCard
                  thermostat={{
                    ...user,
                    onToggle: () => handleToggleThermostat(user.id)
                  }}
                  onEdit={() => openEditModal(user)}
                  onDelete={() => deleteUser(user.id)}
                />
              </div>
            );
          }
          return (
            <div key={user.id}>
              <UserCard
                user={user}
                onEdit={() => openEditModal(user)}
                onDelete={() => deleteUser(user.id)}
              />
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) => handleEditChange("name", e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <select
                value={editingUser.title}
                onChange={(e) => handleEditChange("title", e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                {navTitles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                value={editingUser.role}
                onChange={(e) => handleEditChange("role", e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
