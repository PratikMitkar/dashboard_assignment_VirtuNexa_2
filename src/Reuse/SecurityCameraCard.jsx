import React from "react";

const SecurityCameraCard = ({ camera, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-md w-auto bg-white p-4 mr-5 relative h-80">

      
      {/* Recording Status Dot */}
      <div 
        className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
          camera.isRecording ? 'bg-red-500' : 'bg-gray-500'
        }`} 
      />

      <div className="flex flex-col items-center">

        <div className="rounded-full object-cover">
        <img
          src={camera.image || '/placeholder-thermostat.png'}
          alt={camera.name || 'Thermostat'}
          className="w-20 h-20 "
        />
        </div>

        {/* Camera Name */}
        <h3 className="mt-2 text-lg font-semibold">{camera.name || 'Unnamed Camera'}</h3>
        {/* Location */}
        <p className="text-sm text-gray-500">{camera.location || camera.title || 'Unknown Location'}</p>
        {/* Status Badge */}
        <span className="mt-2 inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {camera.status || 'Unknown Status'}
        </span>
        {/* Recording Toggle */}
        <div className="flex mt-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={camera.isRecording}
              onChange={() => {
                if (camera.onToggleRecording) {
                  camera.onToggleRecording(camera.id);
                } else {
                  console.warn('Toggle recording function not provided for camera:', camera.id);
                }
              }}
              aria-label={`Toggle recording for ${camera.name}`}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              {camera.isRecording ? 'Recording' : 'Standby'}
            </span>
          </label>
        </div>
        {/* Edit and Delete Buttons */}
        <div className="flex mt-2 space-x-4">
          <button
            onClick={() => onEdit(camera.id)}
            className="text-yellow-500 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(camera.id)}
            className="text-red-500 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityCameraCard;
