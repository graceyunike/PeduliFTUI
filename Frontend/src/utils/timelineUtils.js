// // Timeline utility functions
// import { timelineData } from '../Pages/timelineData';

// /**
//  * Get all timeline posts untuk sebuah campaign
//  * @param {number} campaign_id - ID dari campaign
//  * @returns {Array} Array of timeline posts untuk campaign tersebut
//  */
// export const getTimelinePostsByCampaign = (campaign_id) => {
//   return timelineData.filter(post => post.campaign_id === campaign_id);
// };

// /**
//  * Get single timeline post by post_id
//  * @param {number} post_id - ID dari post
//  * @returns {Object|null} Post object atau null jika tidak ditemukan
//  */
// export const getTimelinePostById = (post_id) => {
//   return timelineData.find(post => post.post_id === post_id);
// };

// /**
//  * Get all timeline posts
//  * @returns {Array} All timeline posts
//  */
// export const getAllTimelinePosts = () => {
//   return timelineData;
// };
