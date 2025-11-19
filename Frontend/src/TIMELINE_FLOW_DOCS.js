// DOKUMENTASI: Timeline dan Post Detail Flow

/**
 * DATA STRUCTURE - timelineData.js
 * ================================
 * Setiap post memiliki struktur:
 * {
 *   post_id: number (UNIQUE - digunakan untuk routing),
 *   campaign_id: number (Foreign key ke campaign),
 *   media_url: string,
 *   content: string (Full content),
 *   created_by: string (Author name),
 *   likes_count: number,
 *   comments_count: number
 * }
 */

/**
 * ROUTING FLOW
 * ===========
 * 
 * 1. EventCampaignPage (/event-campaign)
 *    └─ Menampilkan list campaigns
 *    └─ User klik event card
 *    
 * 2. EventDetailPage (/event-detail/:id)
 *    Route param: id = campaign_id (contoh: 1, 2, dst)
 *    
 *    - Ambil campaign_id dari URL: useParams() → { id }
 *    - Filter timeline posts: timelineData.filter(p => p.campaign_id === campaign_id)
 *    - Tampilkan truncated posts (max 100 chars)
 *    - Ketika user klik "Show more" → navigate(/post-detail/${post.post_id})
 *    
 * 3. PostDetailPage (/post-detail/:postId)
 *    Route param: postId = post_id (contoh: 1, 2, 3, dst)
 *    
 *    - Ambil postId dari URL: useParams() → { postId }
 *    - Cari post: timelineData.find(p => p.post_id === postId)
 *    - Tampilkan full post content + comments
 */

/**
 * PENTING: KONSISTENSI VARIABEL
 * ============================
 * 
 * ✅ BENAR:
 * - Event detail route param: :id (untuk campaign_id)
 * - Post detail route param: :postId (untuk post_id)
 * - timelineData field: post_id (bukan id)
 * - EventDetailPage navigate: navigate(`/post-detail/${post.post_id}`)
 * - PostDetailPage search: timelineData.find(item => item.post_id === pid)
 * 
 * ❌ SALAH:
 * - timelineData field: id (harusnya post_id)
 * - PostDetailPage search: item.id (harusnya item.post_id)
 * - Route mismatch: :id vs :postId
 */

/**
 * DEBUGGING TIPS
 * ==============
 * 
 * Jika "Timeline Post tidak ditemukan":
 * 1. Buka browser console (F12)
 * 2. Lihat logs di PostDetailPage
 * 3. Verifikasi:
 *    - URL menunjukkan /post-detail/X (X adalah number)
 *    - timelineData memiliki post dengan post_id = X
 *    - Field names konsisten
 */
