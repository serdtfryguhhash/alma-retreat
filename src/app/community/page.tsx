'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Heart, Send } from 'lucide-react';
import { useAlmaStore, CommunityPost } from '@/stores';
import { XP_REWARDS } from '@/lib/gamification';

const categories = ['All', 'Yoga', 'Meditation', 'Nutrition', 'Travel', 'General'] as const;
type Category = (typeof categories)[number];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const categoryColors: Record<string, string> = {
  Yoga: '#5B7B5E',
  Meditation: '#6B5B8E',
  Nutrition: '#C8A96E',
  Travel: '#E85D3A',
  General: '#A0AEC0',
};

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('General');
  const [newAuthor, setNewAuthor] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const communityPosts = useAlmaStore((s) => s.communityPosts);
  const addCommunityPost = useAlmaStore((s) => s.addCommunityPost);
  const addCommentToPost = useAlmaStore((s) => s.addCommentToPost);
  const likePost = useAlmaStore((s) => s.likePost);
  const addXP = useAlmaStore((s) => s.addXP);
  const updateDailyStreak = useAlmaStore((s) => s.updateDailyStreak);

  const filteredPosts = selectedCategory === 'All'
    ? communityPosts
    : communityPosts.filter((p) => p.category === selectedCategory);

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    addCommunityPost({
      id: crypto.randomUUID(),
      author: newAuthor.trim() || 'Anonymous Yogi',
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      createdAt: new Date().toISOString(),
      comments: [],
      likes: 0,
    });
    addXP(XP_REWARDS.COMMUNITY_POST);
    updateDailyStreak();
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setShowNewPost(false);
  };

  const handleAddComment = (postId: string) => {
    const content = commentInputs[postId];
    if (!content?.trim()) return;
    addCommentToPost(postId, {
      id: crypto.randomUUID(),
      author: 'You',
      content: content.trim(),
      createdAt: new Date().toISOString(),
    });
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2D2A26]">
            Community Circle
          </h1>
          <p className="mt-3 text-[#2D2A26]/60">
            Share wisdom, ask questions, and connect with fellow practitioners.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C8A96E]" />
        </motion.div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2D2A26] text-white'
                  : 'bg-[#F5F2ED] text-[#2D2A26]/60 hover:bg-[#C8A96E]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* New Post Button */}
        {!showNewPost && (
          <button
            onClick={() => setShowNewPost(true)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#C8A96E]/30 bg-white/40 p-4 text-sm font-medium text-[#C8A96E] transition-all hover:border-[#C8A96E]/60 hover:bg-white/60"
          >
            <Plus className="h-4 w-4" /> Create a Post
          </button>
        )}

        {/* New Post Form */}
        <AnimatePresence>
          {showNewPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-6 backdrop-blur-sm"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#C8A96E]">
                New Post
              </h3>
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Your name (optional)"
                className="mt-4 w-full rounded-xl border border-[#C8A96E]/15 bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 outline-none focus:border-[#C8A96E]/40"
              />
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Post title"
                className="mt-3 w-full rounded-xl border border-[#C8A96E]/15 bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 outline-none focus:border-[#C8A96E]/40"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Share your thoughts, tips, or questions..."
                rows={4}
                className="mt-3 w-full resize-none rounded-xl border border-[#C8A96E]/15 bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 outline-none focus:border-[#C8A96E]/40"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {(['Yoga', 'Meditation', 'Nutrition', 'Travel', 'General'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewCategory(cat)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      newCategory === cat ? 'text-white' : 'bg-[#F5F2ED] text-[#2D2A26]/60'
                    }`}
                    style={newCategory === cat ? { backgroundColor: categoryColors[cat] } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleCreatePost}
                  className="rounded-full bg-[#5B7B5E] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#4A6A4D]"
                >
                  Post
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="rounded-full bg-[#F5F2ED] px-6 py-2.5 text-sm font-medium text-[#2D2A26]/60 hover:bg-[#C8A96E]/10"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts */}
        <div className="mt-6 space-y-4">
          {filteredPosts.length === 0 && (
            <div className="py-12 text-center text-sm text-[#2D2A26]/40">
              No posts yet. Be the first to share something!
            </div>
          )}
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-5 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                      style={{ backgroundColor: categoryColors[post.category] }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-[#2D2A26]/40">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-[#2D2A26]">{post.title}</h3>
                  <p className="mt-1 text-xs text-[#2D2A26]/50">by {post.author}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#2D2A26]/70">{post.content}</p>

              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => likePost(post.id)}
                  className="flex items-center gap-1 text-xs text-[#2D2A26]/40 transition-colors hover:text-[#D4849A]"
                >
                  <Heart className="h-3.5 w-3.5" /> {post.likes}
                </button>
                <button
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  className="flex items-center gap-1 text-xs text-[#2D2A26]/40 transition-colors hover:text-[#5B7B5E]"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> {post.comments.length}
                </button>
              </div>

              {/* Comments */}
              <AnimatePresence>
                {expandedPost === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 border-t border-[#C8A96E]/10 pt-4"
                  >
                    {post.comments.map((c) => (
                      <div key={c.id} className="mb-3 rounded-lg bg-[#FAF8F5] p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-[#2D2A26]">{c.author}</span>
                          <span className="text-[10px] text-[#2D2A26]/30">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#2D2A26]/60">{c.content}</p>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                        placeholder="Add a comment..."
                        className="flex-1 rounded-lg border border-[#C8A96E]/15 bg-[#FAF8F5] px-3 py-2 text-xs text-[#2D2A26] placeholder-[#2D2A26]/30 outline-none focus:border-[#C8A96E]/40"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="flex items-center justify-center rounded-lg bg-[#5B7B5E] px-3 py-2 text-white"
                      >
                        <Send className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
