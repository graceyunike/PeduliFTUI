import React, { useState, useEffect } from 'react';
import EventBox from '../Components/EventBox.jsx';
import Navbar from '../Components/Navbar.jsx';
import { fetchUsers, fetchCampaigns } from '../services/api';

const EventCampaignPage = () => {
  const [selectedDept, setSelectedDept] = useState('All'); // default filter
  const [departments, setDepartments] = useState(['All']);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [adminsError, setAdminsError] = useState(null);

  // Load users + campaigns; map organizer_id to user.name and build admin list
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  const [campaignsError, setCampaignsError] = useState(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      setLoadingAdmins(true);
      setAdminsError(null);
      setLoadingCampaigns(true);
      setCampaignsError(null);
      try {
        const [users, campaignsData] = await Promise.all([fetchUsers(), fetchCampaigns()]);

        // Build lookup from user_id to name
        const userIdToName = {};
        users.forEach(u => {
          if (u.user_id) userIdToName[u.user_id] = u.name || '';
        });

        // Map campaigns to include organizerName and normalize fields used by UI
        const mappedCampaigns = campaignsData.map(c => ({
          campaign_id: c.campaign_id,
          title: c.title,
          description: c.description,
          picture: c.image_url || c.picture || '',
          organizer_id: c.organizer_id,
          organizer_name: userIdToName[c.organizer_id] || 'Unknown'
        }));

        // admin names from users with role 'admin'
        const adminNames = users
          .filter((u) => u.role && u.role.toLowerCase() === 'admin')
          .map((u) => u.name);

        if (mounted) {
          setDepartments(['All', ...adminNames]);
          setCampaigns(mappedCampaigns);
        }
      } catch (err) {
        console.error('Failed to load data', err);
        if (mounted) {
          setAdminsError(err.message || 'Failed to load admins');
          setCampaignsError(err.message || 'Failed to load campaigns');
        }
      } finally {
        if (mounted) {
          setLoadingAdmins(false);
          setLoadingCampaigns(false);
        }
      }
    };
    loadData();
    return () => { mounted = false; };
  }, []);

  // Filter data berdasarkan selectedDept (which is an organizer name)
  const filteredData = selectedDept === 'All'
    ? campaigns
    : campaigns.filter(item => item.organizer_name === selectedDept);

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
              <div className="px-3 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-t-transparent border-[#005384] rounded-full animate-spin" />
                  <span>Loading admins...</span>
                </div>
              </div>
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
        {loadingCampaigns ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-t-transparent border-[#005384] rounded-full animate-spin" />
          </div>
        ) : campaignsError ? (
          <div className="text-red-500 py-10">{campaignsError}</div>
        ) : (
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
        )}

      </div>
    </div>
    </>
  );
};

export default EventCampaignPage;