// src/Pages/PostDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { timelineData } from './timelineData';
import Navbar from '../Components/Navbar.jsx';
import LikeIcon from '../assets/fav_icon.svg';
import CommentIcon from '../assets/comment_icon.svg';

const PostDetailPage = () => {
  const { postId } = useParams(); // Ambil ID dari URL: /post-detail/1
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([
    { id: 1, user: "Kirana Yunike Aprilia", text: "Saya sudah berdonasi! Titip salam buat anak-anak panti ya" },
    { id: 2, user: "Orang Baik", text: "Semangat terus buat adik2!" }
  ]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const pid = parseInt(postId);
    console.log('PostDetailPage - postId from URL:', postId);
    console.log('PostDetailPage - parsed pid:', pid);
    console.log('timelineData available:', timelineData);

    // Mencari timeline post berdasarkan post_id
    const foundPost = timelineData.find(item => item.post_id === pid);

    console.log('Found post:', foundPost);

    if (foundPost) {
      setPost(foundPost);
      setLikesCount(foundPost.likes_count || 0);

      // Cek status like dari localStorage (bisa diganti dengan API call)
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
      setIsLiked(likedPosts[pid] || false);
    }
  }, [postId]);

  // Handle like/dislike toggle
  const handleLikeToggle = () => {
    const pid = parseInt(postId);

    if (isLiked) {
      // Jika sudah di-like, maka dislike (kurangi count)
      setIsLiked(false);
      setLikesCount(prevCount => Math.max(0, prevCount - 1));

      // Update localStorage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
      delete likedPosts[pid];
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    } else {
      // Jika belum di-like, maka like (tambah count)
      setIsLiked(true);
      setLikesCount(prevCount => prevCount + 1);

      // Update localStorage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
      likedPosts[pid] = true;
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
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      user: "Anonymous User",
      text: newComment.trim()
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* ===== POST DETAIL ===== */}
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
            <div className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
              {post.content}
            </div>

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
              {comments.map((comment) => (
                <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                      {comment.user.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-[#13A3B5]">
                        {comment.user}
                      </span>
                      <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
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
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#13A3B5] text-white font-semibold rounded-lg hover:bg-[#0f8b9d] transition-colors"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;