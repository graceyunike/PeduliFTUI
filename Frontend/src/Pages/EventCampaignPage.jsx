import React, { useState, useEffect } from 'react';
import EventBox from '../Components/EventBox.jsx';
import Navbar from '../Components/Navbar.jsx';
import { eventData } from './eventData';
import { fetchUsers } from '../services/api';

const EventCampaignPage = () => {
  const [selectedDept, setSelectedDept] = useState('All'); // default filter
  const [departments, setDepartments] = useState(['All']);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [adminsError, setAdminsError] = useState(null);

  // Load admin users and use their names as dropdown options
  useEffect(() => {
    let mounted = true;
    const loadAdmins = async () => {
      setLoadingAdmins(true);
      setAdminsError(null);
      try {
        const users = await fetchUsers();
        // users is expected to be an array of user objects with `role` and `name`
        const adminNames = users
          .filter((u) => u.role && u.role.toLowerCase() === 'admin')
          .map((u) => u.name);
        if (mounted) setDepartments(['All', ...adminNames]);
      } catch (err) {
        console.error('Failed to load admins', err);
        if (mounted) setAdminsError(err.message || 'Failed to load admins');
      } finally {
        if (mounted) setLoadingAdmins(false);
      }
    };
    loadAdmins();
    return () => { mounted = false; };
  }, []);

  // Filter data berdasarkan departemen
  const filteredData = selectedDept === 'All' 
    ? eventData 
    : eventData.filter(item => item.created_by === selectedDept); 

  return (
    <>
    <Navbar />
    
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-2xl md:text-3xl font-bold text-[#005384]">
            Event Campaign
          </h1>

          {/* Sort by Dept Dropdown (admins) */}
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by Dept:</span>
            {loadingAdmins ? (
              <div className="px-3 py-2 text-sm">Loading admins...</div>
            ) : adminsError ? (
              <div className="px-3 py-2 text-sm text-red-500">{adminsError}</div>
            ) : (
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
            )}
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
    </>
  );
};

export default EventCampaignPage;