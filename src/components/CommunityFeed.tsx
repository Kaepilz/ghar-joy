// Community Feed - Shows recent activity and social features
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, TrendingUp, Award, ShoppingBag, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCommunityFeed, type CommunityActivity } from "@/lib/userMock";
import { useState } from "react";

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

  const handleLike = (id: string) => {
    setLikedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    setActivities(prev => prev.map(activity => 
      activity.id === id 
        ? { ...activity, likes: activity.likes + (likedActivities.has(id) ? -1 : 1) }
        : activity
    ));
  };

  return (
    <div className="space-y-4">
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
                    <span className="font-semibold text-sm truncate">{activity.user}</span>
                    <ActivityIcon type={activity.type} />
                  </div>

                  {/* Message */}
                  <p className="text-sm mb-2 leading-relaxed">{activity.content}</p>

                  {/* Meta & Actions */}
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
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </motion.button>

                      {/* Share Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                      </motion.button>
                    </div>
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
