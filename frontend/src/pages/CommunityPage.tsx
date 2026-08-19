import React, { useState, useEffect } from 'react';
import { 
  fetchCommunityPosts, createCommunityPost, addCommunityComment, 
  votePostHelpful, reportPost, fetchCommunityAiSummary 
} from '../services/api';
import { CommunityPost, CommunitySummary } from '../types';
import { 
  Users, MessageSquare, ThumbsUp, Flag, PlusCircle, Search, 
  MapPin, Tag, Sparkles, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Image, Send 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CommunityPage: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [summary, setSummary] = useState<CommunitySummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter States
  const [stateFilter, setStateFilter] = useState<string>('');
  const [districtFilter, setDistrictFilter] = useState<string>('');
  const [cropTagFilter, setCropTagFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Create Post Modal State
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newPost, setNewPost] = useState({
    farmer_name: 'Ramesh Patel',
    state: 'Karnataka',
    district: 'Mandya',
    crop_tag: 'Paddy / Rice',
    title: '',
    content: '',
    image_url: ''
  });

  // Active Comment Input per Post
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  useEffect(() => {
    loadCommunityData();
  }, [stateFilter, districtFilter, cropTagFilter, searchQuery]);

  const loadCommunityData = async () => {
    setLoading(true);
    try {
      const [postsData, summaryData] = await Promise.all([
        fetchCommunityPosts(stateFilter, districtFilter, cropTagFilter, searchQuery),
        fetchCommunityAiSummary()
      ]);
      setPosts(postsData);
      setSummary(summaryData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
      await createCommunityPost(newPost);
      setShowModal(false);
      setNewPost({ farmer_name: 'Ramesh Patel', state: 'Karnataka', district: 'Mandya', crop_tag: 'Paddy / Rice', title: '', content: '', image_url: '' });
      loadCommunityData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleVoteHelpful = async (postId: number) => {
    try {
      const res = await votePostHelpful(postId);
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, helpful_count: res.helpful_count } : p));
    } catch (e) {
      console.error(e);
    }
  };

  const handleReportPost = async (postId: number) => {
    try {
      await reportPost(postId);
      alert("Post reported for moderation review.");
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddComment = async (postId: number) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    try {
      const newCmt = await addCommunityComment(postId, { farmer_name: 'Kisan Partner', comment_text: text });
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments_count: p.comments_count + 1,
            comments: [...p.comments, newCmt]
          };
        }
        return p;
      }));
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Community Agriculture Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1920')` }}
      />
      
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-amber-950/95 via-gray-900/90 to-emerald-950/95 p-8 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1592417817098-8f3d6eb1b7a5?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <Users className="w-4 h-4" /> Farmer Community & Peer Learning Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Kisan Samvaad — Farmer Community Hub
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
              Connect with fellow farmers across India. Share crop pest observations, market prices, organic farming techniques, and ask queries. AI automatically synthesizes community discussions and separates community opinions from verified ICAR/APMC facts.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white font-bold text-xs shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Community Post</span>
          </button>
        </div>
      </div>

      {/* AI Community Knowledge Synthesis Box (Opinions vs Verified Facts) */}
      {summary && (
        <div className="p-6 rounded-3xl bg-gray-900/90 border border-emerald-500/40 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" /> AI Community Knowledge Synthesis
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {summary.total_posts} Active Discussions Analyzed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Verified Facts */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Verified Agricultural Facts
              </h4>
              <ul className="space-y-2 text-xs text-gray-200">
                {summary.ai_summary_verified_facts.map((fact, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Farmer Opinions */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/40 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Farmer Community Opinions & Peer Tips
              </h4>
              <ul className="space-y-2 text-xs text-gray-200">
                {summary.farmer_community_opinions.map((op, oIdx) => (
                  <li key={oIdx} className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{op}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-900/80 border border-gray-800 p-4 rounded-2xl backdrop-blur-md">
        
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Keyword search input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search community posts by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-amber-500"
            />
          </div>

          {/* Crop Tag Selector */}
          <select
            value={cropTagFilter}
            onChange={(e) => setCropTagFilter(e.target.value)}
            className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold outline-none"
          >
            <option value="All">All Crops</option>
            <option value="Paddy / Rice">Paddy / Rice</option>
            <option value="Wheat">Wheat</option>
            <option value="Tomato">Tomato</option>
            <option value="Sugarcane">Sugarcane</option>
            <option value="Cotton">Cotton</option>
          </select>

          {/* State Filter */}
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none"
          >
            <option value="">All States</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Punjab">Punjab</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
          </select>
        </div>

      </div>

      {/* Community Posts Feed */}
      {loading ? (
        <div className="p-16 text-center text-amber-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <span className="text-xs">Loading Community Discussions...</span>
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 hover:border-amber-500/40 transition-all backdrop-blur-md shadow-xl space-y-4">
              
              {/* Post Header Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-300 text-sm">
                    {post.farmer_name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{post.farmer_name}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <span className="flex items-center gap-1 text-emerald-400"><MapPin className="w-3 h-3" /> {post.district}, {post.state}</span>
                      <span>•</span>
                      <span>{post.created_at}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {post.crop_tag}
                  </span>
                </div>
              </div>

              {/* Post Body Content */}
              <div>
                <h3 className="text-base font-bold text-white mb-2">{post.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">{post.content}</p>
                
                {post.image_url && (
                  <img 
                    src={post.image_url} 
                    alt="Crop Photo" 
                    className="mt-3 max-h-64 rounded-2xl object-cover border border-gray-800 shadow-md" 
                  />
                )}
              </div>

              {/* Actions Bar (Helpful Upvote, Report, Comment Count) */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-800 text-xs">
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleVoteHelpful(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-950 border border-gray-800 hover:border-emerald-500 text-emerald-400 font-semibold transition-all"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({post.helpful_count})</span>
                  </button>

                  <span className="text-gray-400 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> {post.comments_count} Comments
                  </span>
                </div>

                <button
                  onClick={() => handleReportPost(post.id)}
                  className="text-[10px] text-gray-500 hover:text-red-400 flex items-center gap-1"
                >
                  <Flag className="w-3 h-3" /> Report
                </button>
              </div>

              {/* Comments Thread Section */}
              {post.comments && post.comments.length > 0 && (
                <div className="pt-2 space-y-2 border-t border-gray-800/60">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Replies & Farmer Discussions:</span>
                  {post.comments.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-gray-950/70 border border-gray-800/80 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-emerald-400">{c.farmer_name}</span>
                        <span className="text-gray-500">{c.created_at}</span>
                      </div>
                      <p className="text-gray-300 text-[11px]">{c.comment_text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment Input Bar */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Write a helpful advice or response..."
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                  className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="p-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center text-gray-400 space-y-4">
          <Users className="w-12 h-12 text-amber-500/40 mx-auto" />
          <h4 className="text-base font-bold text-gray-300">No Community Posts Found</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Be the first farmer to share a query or pest update in your region!
          </p>
        </div>
      )}

      {/* Modal for Creating New Post */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" /> Create Community Post
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={newPost.farmer_name}
                  onChange={(e) => setNewPost({ ...newPost, farmer_name: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">State</label>
                  <input
                    type="text"
                    value={newPost.state}
                    onChange={(e) => setNewPost({ ...newPost, state: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">District</label>
                  <input
                    type="text"
                    value={newPost.district}
                    onChange={(e) => setNewPost({ ...newPost, district: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Crop Category / Tag</label>
                <select
                  value={newPost.crop_tag}
                  onChange={(e) => setNewPost({ ...newPost, crop_tag: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold outline-none focus:border-amber-500"
                >
                  <option value="Paddy / Rice">Paddy / Rice</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Cotton">Cotton</option>
                  <option value="General">General Agriculture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Question / Post Title</label>
                <input
                  type="text"
                  placeholder="e.g. Organic treatment for yellow leaf curling in tomato?"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Post Details & Observations</label>
                <textarea
                  rows={4}
                  placeholder="Describe soil symptoms, field location, weather conditions..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Crop Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://example.com/crop-leaf.jpg"
                  value={newPost.image_url}
                  onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg"
                >
                  Publish Post
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
