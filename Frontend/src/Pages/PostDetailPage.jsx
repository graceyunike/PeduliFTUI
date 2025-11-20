import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar.jsx';
import LikeIcon from '../assets/fav_icon.svg';
import CommentIcon from '../assets/comment_icon.svg';
import { fetchPostById, fetchCommentsByPostId, createComment, getCurrentUser } from '../services/api.js';

const PostDetailPage = () => {
  const { postId } = useParams(); // Ambil ID dari URL: /post-detail/1
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // postId is UUID string from URL, don't parse as integer
        console.log('PostDetailPage - fetching post with ID:', postId);

        // Fetch post dari API berdasarkan post_id
        const foundPost = await fetchPostById(postId);
        
        console.log('Post fetched from API:', foundPost);

        setPost(foundPost);
        setLikesCount(foundPost.likes_count || 0);
        
        // Cek status like dari localStorage
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        setIsLiked(likedPosts[postId] || false);

        // Fetch comments untuk post ini
        try {
          const fetchedComments = await fetchCommentsByPostId(postId);
          console.log('Comments fetched:', fetchedComments);
          setComments(fetchedComments || []);
        } catch (commentErr) {
          console.log('No comments found or error fetching comments:', commentErr);
          setComments([]);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message || 'Gagal memuat post');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      loadPost();
    }
  }, [postId]);

  // Handle like/dislike toggle
  const handleLikeToggle = () => {
    // postId is UUID string, use directly without parseInt
    if (isLiked) {
      // Jika sudah di-like, maka dislike (kurangi count)
      setIsLiked(false);
      setLikesCount(prevCount => Math.max(0, prevCount - 1));

      // Update localStorage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
      delete likedPosts[postId];
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    } else {
      // Jika belum di-like, maka like (tambah count)
      setIsLiked(true);
      setLikesCount(prevCount => prevCount + 1);

      // Update localStorage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
      likedPosts[postId] = true;
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
  };

  if (!post) {
    return <div className="text-center py-10">Timeline Post tidak ditemukan</div>;
  }

  // Format tanggal
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle submit komentar
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmittingComment(true);
      
      const currentUser = getCurrentUser();
      const userId = currentUser?.id || 'anonymous-user';
      // postId is UUID string, use directly without parseInt

      // Post comment ke API
      const newCommentObj = await createComment(postId, userId, newComment.trim());
      
      console.log('Comment created:', newCommentObj);

      // Add to local state
      setComments([...comments, newCommentObj]);
      setNewComment('');
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Gagal mengirim komentar: ' + err.message);
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <p className="text-gray-500">Memuat post...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-red-200">
              <p className="text-red-600 font-semibold">❌ {error}</p>
            </div>
          )}

          {/* Post Not Found State */}
          {!post && !loading && !error && (
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <p className="text-gray-500">Timeline Post tidak ditemukan</p>
            </div>
          )}

          {/* Post Content */}
          {post && (
            <>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                {/* Header: Author & Time */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                    {post.created_by?.charAt(0) || 'A'}
                  </div>
                  <span className="font-semibold text-sm">
                    {post.created_by || 'Anonymous'}
                  </span>
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                  {post.content}
                </p>

                {/* Media */}
                {post.media_url && (
                  <img
                    src={post.media_url}
                    alt="Post media"
                    className="w-full h-auto rounded-lg my-3"
                  />
                )}

                {/* Stats: Likes & Comments */}
                <div className="flex items-center gap-6 text-sm text-gray-500 mt-4 pt-3 border-t border-gray-200">
                  {/* Like Button - Love Icon */}
                  <button
                    onClick={handleLikeToggle}
                    className={`flex items-center gap-2 transition-all duration-300 ${isLiked
                        ? 'scale-110'
                        : 'hover:scale-110'
                      }`}
                    title={isLiked ? "Unlike this post" : "Like this post"}
                  >
                    <img
                      src={LikeIcon}
                      alt="Like"
                      className={`h-5 w-5 ${isLiked ? 'filter brightness-0 saturate-200' : ''}`}
                      style={isLiked ? { filter: 'invert(25%) sepia(100%) saturate(1000%) hue-rotate(340deg)' } : {}}
                    />
                    <span className={`font-semibold ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                      {likesCount}
                    </span>
                  </button>

                  {/* Comment Button - Bubble Chat Icon */}
                  <button
                    onClick={() => {
                      document.getElementById('comment-form-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-all hover:scale-110"
                    title="Go to comments"
                  >
                    <img
                      src={CommentIcon}
                      alt="Comment"
                      className="h-5 w-5"
                    />
                    <span className="font-semibold">{comments.length}</span>
                  </button>
                </div>
              </div>

              {/* ===== COMMENTS SECTION ===== */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg text-[#13A3B5] mb-4">
                  Comments ({comments.length})
                </h3>

                {/* List Komentar */}
                <div className="space-y-4 mb-6">
                  {comments.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.comment_id || comment.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                            {(comment.user_id || 'Anonymous').charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-sm text-[#13A3B5]">
                                {comment.user_id || 'Anonymous User'}
                              </span>
                              <span className="text-xs text-gray-400">
                                {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('id-ID') : ''}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mt-1">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Form Tambah Komentar */}
                <form
                  id="comment-form-section"
                  onSubmit={handleCommentSubmit}
                  className="border-t pt-4"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Tulis komentar..."
                      disabled={submittingComment}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                    <button
                      type="submit"
                      disabled={submittingComment || !newComment.trim()}
                      className="px-4 py-2 bg-[#13A3B5] text-white font-semibold rounded-lg hover:bg-[#0f8b9d] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {submittingComment ? 'Posting...' : 'Post'}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;