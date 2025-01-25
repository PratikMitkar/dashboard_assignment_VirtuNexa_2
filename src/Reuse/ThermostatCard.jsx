import React from "react";

const ThermostatCard = ({ thermostat, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-md w-auto bg-white p-4 mr-5">
      <div className="flex flex-col items-center">
        <img
          src={thermostat.image || '/placeholder-thermostat.png'}
          alt={thermostat.name || 'Thermostat'}
          className="w-20 h-20 rounded-full object-cover"
        />

        <h3 className="mt-2 text-lg font-semibold">{thermostat.name || 'Unnamed Device'}</h3>
        <div className="flex flex-col items-center mt-2">
          <p className="text-2xl font-bold text-gray-700">{thermostat.temperature || '--'}°F</p>
          <div className="flex gap-4 mt-2">
            <div className="text-center">
              <p className="text-xs text-gray-500">Room</p>
              <p className="text-sm font-medium">{thermostat.roomTemp || '--'}°F</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Device</p>
              <p className="text-sm font-medium">{thermostat.deviceTemp || '--'}°F</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Target: {thermostat.targetTemp || '--'}°F</p>
        <span className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {thermostat.mode || 'Unknown'}
        </span>
        <div className="flex mt-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={thermostat.isOn}
              onChange={thermostat.onToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              {thermostat.isOn ? 'ON' : 'OFF'}
            </span>
          </label>
        </div>
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

export default ThermostatCard; 