import React, { useState } from "react";

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("Tom Cook");
  const [userImage, setUserImage] = useState("https://via.placeholder.com/32");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsOpen(false);
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving user data:', error);
      setIsSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2 justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={userImage}
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="hidden sm:inline-block font-medium">{userName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-4 z-10">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-2 px-2 py-1 border rounded"
            placeholder="Enter name"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mb-2"
          />
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
}
