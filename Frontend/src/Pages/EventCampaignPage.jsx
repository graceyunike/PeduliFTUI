import React, { useState } from 'react';
import EventBox from '../Components/EventBox.jsx';
import { eventData } from './eventData';

const EventCampaignPage = () => {
  const [selectedDept, setSelectedDept] = useState('All'); // default filter

  // Daftar departemen
  const departments = [
    'All',
    'PENGMAS IME FTUI',
    'PENGMAS IMA FTUI',
    'PENGMAS IMM FTUI',
    'PENGMAS IMMt FTUI',
    'SOSMA IMtK FTUI',
    'SOSMA IMPI FTUI',
    'SOSMA IMS FTUI',
    'PENGMAS IMtI FTUI'
  ];

  // Filter data berdasarkan departemen
  const filteredData = selectedDept === 'All' 
    ? eventData 
    : eventData.filter(item => item.created_by === selectedDept); 

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-2xl md:text-3xl font-bold text-[#005384]">
            Event Campaign
          </h1>

          {/* Sort by Dept Dropdown */}
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by Dept:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#005384]"
            >
              {departments.map((created_by) => (
                <option key={created_by} value={created_by}>
                  {created_by}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <EventBox
              key={item.campaign_id}
              campaign_id={item.campaign_id}
              picture={item.picture}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default EventCampaignPage;