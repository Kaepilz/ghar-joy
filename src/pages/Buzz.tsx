// Community Buzz Page - Social Feed with Posts, Likes, Comments, Friends
// Main social hub for ShoppingGhar community
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Image as ImageIcon, Link as LinkIcon, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStore, type Post, type Comment } from '@/store/useAppStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Buzz = () => {
  const { t } = useLanguage();
  const [newPostContent, setNewPostContent] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [postId: string]: boolean }>({});

  // Store access
  const currentUser = useAppStore(state => state.currentUser);
  const posts = useAppStore(state => state.posts);
  const users = useAppStore(state => state.users);
  const products = useAppStore(state => state.products);
  const addPost = useAppStore(state => state.addPost);
  const likePost = useAppStore(state => state.likePost);
  const unlikePost = useAppStore(state => state.unlikePost);
  const addComment = useAppStore(state => state.addComment);
  const addFriend = useAppStore(state => state.addFriend);
  const removeFriend = useAppStore(state => state.removeFriend);
  const getUserById = useAppStore(state => state.getUserById);
  const getMutualFriends = useAppStore(state => state.getMutualFriends);

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Please log in to view Community Buzz</p>
      </div>
    );
  }

  // Create new post
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: `post_${Date.now()}`,
      userId: currentUser.id,
      content: newPostContent,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };

    addPost(newPost);
    setNewPostContent('');
    toast.success('Post created successfully! 🎉');
    
    // Award tokens for posting
    useAppStore.getState().addBazaarTokens(currentUser.id, 1);
    useAppStore.getState().addXP(currentUser.id, 10);
  };

  // Toggle like
  const handleLike = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (post.likes.includes(currentUser.id)) {
      unlikePost(postId, currentUser.id);
    } else {
      likePost(postId, currentUser.id);
      toast.success('❤️', { duration: 1000 });
    }
  };

  // Add comment
  const handleComment = (postId: string) => {
    const content = commentInputs[postId]?.trim();
    if (!content) return;

    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      userId: currentUser.id,
      content,
      createdAt: new Date().toISOString()
    };

    addComment(postId, newComment);
    setCommentInputs({ ...commentInputs, [postId]: '' });
    toast.success('Comment added! 💬');
  };

  // Toggle friend
  const handleToggleFriend = (userId: string) => {
    if (currentUser.friends.includes(userId)) {
      removeFriend(currentUser.id, userId);
      toast.success('Friend removed');
    } else {
      addFriend(currentUser.id, userId);
      toast.success('Friend added! 👥');
      useAppStore.getState().addBazaarTokens(currentUser.id, 1);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">🎭 {t('nav.buzz')}</h1>
          <p className="text-muted-foreground">Share your finds, celebrate wins, connect with sellers!</p>
        </motion.div>

        {/* Create Post Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 mb-6">
            <div className="flex gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <img src={currentUser.avatar} alt={currentUser.name} />
              </Avatar>
              <Textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder={t('community.whatsOnMind')}
                className="resize-none"
                rows={3}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" disabled>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" disabled>
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Product
                </Button>
              </div>
              <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                {t('community.createPost')}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post, index) => {
            const postAuthor = getUserById(post.userId);
            if (!postAuthor) return null;

            const isLiked = post.likes.includes(currentUser.id);
            const isFriend = currentUser.friends.includes(post.userId);
            const isOwnPost = post.userId === currentUser.id;
            const mutuals = getMutualFriends(currentUser.id, post.userId);
            const linkedProduct = post.productId ? products.find(p => p.id === post.productId) : null;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-3">
                      <Link to={`/profile/${postAuthor.username}`}>
                        <Avatar className="h-10 w-10 hover:ring-2 ring-primary transition-all">
                          <img src={postAuthor.avatar} alt={postAuthor.name} />
                        </Avatar>
                      </Link>
                      <div>
                        <Link to={`/profile/${postAuthor.username}`}>
                          <h3 className="font-semibold hover:underline">{postAuthor.name}</h3>
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString()}
                          {mutuals.length > 0 && !isOwnPost && (
                            <span> • {mutuals.length} {t('community.mutualFriends')}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    {!isOwnPost && (
                      <Button
                        size="sm"
                        variant={isFriend ? 'outline' : 'default'}
                        onClick={() => handleToggleFriend(post.userId)}
                      >
                        {isFriend ? t('community.removeFriend') : t('community.addFriend')}
                      </Button>
                    )}
                  </div>

                  {/* Post Content */}
                  <p className="mb-3 whitespace-pre-wrap">{post.content}</p>

                  {/* Linked Product */}
                  {linkedProduct && (
                    <Link to={`/product/${linkedProduct.id}`}>
                      <Card className="p-3 mb-3 hover:shadow-md transition-shadow">
                        <div className="flex gap-3">
                          <img
                            src={linkedProduct.images[0]}
                            alt={linkedProduct.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm line-clamp-1">{linkedProduct.title}</h4>
                            <p className="text-primary font-bold">NPR {linkedProduct.price.toLocaleString()}</p>
                            <Badge variant="secondary" className="text-xs">
                              {linkedProduct.condition}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-3 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={isLiked ? 'text-red-500' : ''}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {post.likes.length} {t('community.like')}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowComments({
                        ...showComments,
                        [post.id]: !showComments[post.id]
                      })}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {post.comments.length} {t('community.comment')}
                    </Button>
                    
                    <Button variant="ghost" size="sm" disabled>
                      <Share2 className="h-4 w-4 mr-2" />
                      {t('community.share')}
                    </Button>
                  </div>

                  {/* Comments Section */}
                  {showComments[post.id] && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      {/* Existing Comments */}
                      {post.comments.map((comment) => {
                        const commentAuthor = getUserById(comment.userId);
                        if (!commentAuthor) return null;

                        return (
                          <div key={comment.id} className="flex gap-2">
                            <Avatar className="h-8 w-8">
                              <img src={commentAuthor.avatar} alt={commentAuthor.name} />
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-muted rounded-lg px-3 py-2">
                                <p className="font-semibold text-sm">{commentAuthor.name}</p>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 ml-3">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Add Comment */}
                      <div className="flex gap-2">
                        <Avatar className="h-8 w-8">
                          <img src={currentUser.avatar} alt={currentUser.name} />
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <Textarea
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs({
                              ...commentInputs,
                              [post.id]: e.target.value
                            })}
                            placeholder="Write a comment..."
                            className="resize-none"
                            rows={2}
                          />
                          <Button
                            size="icon"
                            onClick={() => handleComment(post.id)}
                            disabled={!commentInputs[post.id]?.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {posts.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No posts yet. Be the first to share something! 🎉</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Buzz;

