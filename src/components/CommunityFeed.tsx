// ============================================
// Community Feed - Social activity feed with likes, comments, friends
// Shows recent posts from the community with interactive features
// ============================================

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, TrendingUp, Award, ShoppingBag, Star, UserPlus, UserMinus, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getCommunityFeed, getSuggestedFriends, type CommunityActivity, type Friend } from "@/lib/userMock";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ActivityIcon = ({ type }: { type: CommunityActivity['type'] }) => {
  const icons = {
    sale: <ShoppingBag className="h-4 w-4" />,
    listing: <Star className="h-4 w-4" />,
    review: <MessageCircle className="h-4 w-4" />,
    achievement: <Award className="h-4 w-4" />
  };
  
  const colors = {
    sale: 'bg-green-500/10 text-green-500',
    listing: 'bg-blue-500/10 text-blue-500',
    review: 'bg-purple-500/10 text-purple-500',
    achievement: 'bg-orange-500/10 text-orange-500'
  };
  
  return (
    <div className={`p-2 rounded-full ${colors[type]}`}>
      {icons[type]}
    </div>
  );
};

export const CommunityFeed = () => {
  const [activities, setActivities] = useState(getCommunityFeed());
  const [likedActivities, setLikedActivities] = useState<Set<string>>(new Set());
  const [showComments, setShowComments] = useState<Set<string>>(new Set());
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [friends, setFriends] = useState(getSuggestedFriends());

  // Handle like/unlike
  const handleLike = (id: string) => {
    const wasLiked = likedActivities.has(id);
    
    setLikedActivities(prev => {
      const newSet = new Set(prev);
      if (wasLiked) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    setActivities(prev => prev.map(activity => 
      activity.id === id 
        ? { ...activity, likes: activity.likes + (wasLiked ? -1 : 1) }
        : activity
    ));

    // Show animated heart toast
    if (!wasLiked) {
      toast("❤️ Liked!", { duration: 1000 });
    }
  };

  // Toggle comment section
  const toggleComments = (id: string) => {
    setShowComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Handle comment submission
  const handleAddComment = (activityId: string) => {
    const comment = commentText[activityId]?.trim();
    if (!comment) return;

    const newComment = {
      id: `c${Date.now()}`,
      user: 'You',
      userId: 'user_1',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aayush',
      content: comment,
      time: 'Just now'
    };

    setActivities(prev => prev.map(activity =>
      activity.id === activityId
        ? { ...activity, comments: [...activity.comments, newComment] }
        : activity
    ));

    setCommentText(prev => ({ ...prev, [activityId]: '' }));
    toast.success("Comment posted!");
  };

  // Handle friend actions
  const handleFriendAction = (userId: string) => {
    setFriends(prev => prev.map(friend =>
      friend.id === userId
        ? { ...friend, isFriend: !friend.isFriend }
        : friend
    ));

    const friend = friends.find(f => f.id === userId);
    if (friend) {
      toast.success(
        friend.isFriend ? `Unfriended ${friend.name}` : `Now friends with ${friend.name}! 🎉`
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Community Buzz</h2>
        </div>
        <Badge variant="secondary" className="gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live
        </Badge>
      </div>

      {/* Suggested Friends Section */}
      <Card className="p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-primary" />
          Suggested Friends
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {friends.slice(0, 4).map((friend) => (
            <div key={friend.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-10 h-10 rounded-full border-2 border-primary/20"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{friend.name}</p>
                <p className="text-xs text-muted-foreground">
                  {friend.mutualFriends} mutual
                </p>
              </div>
              <Button
                size="sm"
                variant={friend.isFriend ? "outline" : "default"}
                className="h-8 px-2"
                onClick={() => handleFriendAction(friend.id)}
              >
                {friend.isFriend ? (
                  <UserMinus className="h-3 w-3" />
                ) : (
                  <UserPlus className="h-3 w-3" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity Feed */}
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-3">
                {/* User Avatar */}
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={activity.avatar}
                  alt={activity.user}
                  className="w-10 h-10 rounded-full border-2 border-primary/20"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* User & Type */}
                  <div className="flex items-center gap-2 mb-1">
                    <Link 
                      to={`/profile`}
                      className="font-semibold text-sm truncate hover:text-primary"
                    >
                      {activity.user}
                    </Link>
                    <ActivityIcon type={activity.type} />
                  </div>

                  {/* Message */}
                  <p className="text-sm mb-2 leading-relaxed">{activity.content}</p>

                  {/* Linked Product Thumbnail */}
                  {activity.productImage && (
                    <Link to={`/product/${activity.productId}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="mb-3 rounded-lg overflow-hidden border"
                      >
                        <img
                          src={activity.productImage}
                          alt="Product"
                          className="w-full h-32 object-cover"
                        />
                      </motion.div>
                    </Link>
                  )}

                  {/* Meta & Actions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      
                      <div className="flex items-center gap-3">
                        {/* Like Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleLike(activity.id)}
                          className={`flex items-center gap-1 text-xs transition-colors ${
                            likedActivities.has(activity.id) 
                              ? 'text-red-500' 
                              : 'text-muted-foreground hover:text-red-500'
                          }`}
                        >
                          <Heart 
                            className="h-4 w-4" 
                            fill={likedActivities.has(activity.id) ? 'currentColor' : 'none'}
                          />
                          <span>{activity.likes}</span>
                        </motion.button>

                        {/* Comment Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleComments(activity.id)}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>{activity.comments.length}</span>
                        </motion.button>

                        {/* Share Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => toast.success("Link copied to clipboard!")}
                        >
                          <Share2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <AnimatePresence>
                      {showComments.has(activity.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-3 border-t space-y-3"
                        >
                          {/* Existing Comments */}
                          {activity.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-2">
                              <img
                                src={comment.avatar}
                                alt={comment.user}
                                className="w-6 h-6 rounded-full"
                              />
                              <div className="flex-1 bg-muted/50 rounded-lg p-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold">{comment.user}</span>
                                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                                </div>
                                <p className="text-xs">{comment.content}</p>
                              </div>
                            </div>
                          ))}

                          {/* Add Comment */}
                          <div className="flex gap-2">
                            <Input
                              placeholder="Write a comment..."
                              value={commentText[activity.id] || ''}
                              onChange={(e) => setCommentText({
                                ...commentText,
                                [activity.id]: e.target.value
                              })}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddComment(activity.id);
                                }
                              }}
                              className="text-sm"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleAddComment(activity.id)}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <Button variant="outline" className="w-full" size="sm">
        Load more activity
      </Button>
    </div>
  );
};
