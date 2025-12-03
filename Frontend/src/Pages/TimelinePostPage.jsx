import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar.jsx';
import { fetchTimelinePosts } from '../services/api';

const TimelinePostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTimelinePosts();
        setPosts(data || []);
      } catch (err) {
        console.error('Failed to load timeline posts:', err);
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-8 pb-4 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-[#005384]">
              Timeline Posts
            </h1>
          </div>

          {/* Posts Container */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-t-transparent border-[#005384] rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Belum ada timeline posts
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.post_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  
                  {/* Header: Profile Picture, Creator Name, and Date */}
                  <div className="px-6 pt-4 pb-3">
                    <div className="flex items-center gap-3">
                      {post.creator_profile_picture ? (
                        <img
                          src={post.creator_profile_picture}
                          alt={post.created_by}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-[#A2FF59] to-[#13A3B5] rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                          {post.created_by?.charAt(0).toUpperCase() || 'A'}
                        </div>
                      )}
                      <div className="flex-1">
                        <h2 className="font-bold text-gray-900">
                          {post.created_by || 'Unknown Creator'}
                        </h2>
                        <p className="text-xs text-gray-500">
                          {post.createdAt ? new Date(post.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'Tanggal tidak diketahui'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Post Content/Caption */}
                  <div className="px-6 pb-3">
                    <p className="text-gray-800">
                      {post.content || ''}
                    </p>
                  </div>

                  {/* Post Image - Full Width */}
                  {post.image_url && (
                    <div className="w-full max-h-96 overflow-hidden bg-gray-200">
                      <img 
                        src={post.image_url} 
                        alt={post.created_by} 
                        className="w-full h-full object-contain p-6 bg-white"
                      />
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="px-6 py-3 border-t border-gray-200">
                    <Link
                      to={`/post-detail/${post.post_id}`}
                      className="inline-block px-4 py-2 bg-[#13A3B5] text-white rounded-lg hover:bg-[#004370] transition-colors font-semibold text-sm"
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TimelinePostPage;
