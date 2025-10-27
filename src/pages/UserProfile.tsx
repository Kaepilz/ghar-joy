// User Profile Page - View other users' profiles with friends functionality
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Award, ShoppingBag, UserPlus, UserMinus, Users, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/store/useAppStore";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const {
    getUserByUsername,
    currentUser,
    addFriend,
    removeFriend,
    getMutualFriends,
    getProductsBySeller,
    getPostsByUser,
    getUserById
  } = useAppStore();

  const [user, setUser] = useState(getUserByUsername(username || ""));
  const [isFriend, setIsFriend] = useState(false);
  const [mutualFriends, setMutualFriends] = useState<any[]>([]);
  const [userProducts, setUserProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      toast.error("User not found");
      navigate("/");
      return;
    }

    // Check if already friends
    if (currentUser && user) {
      setIsFriend(currentUser.friends.includes(user.id));
      setMutualFriends(getMutualFriends(currentUser.id, user.id));
      setUserProducts(getProductsBySeller(user.id));
    }
  }, [user, currentUser, username]);

  if (!user) return null;

  const handleFriendToggle = () => {
    if (!currentUser) {
      toast.error("Please login to add friends");
      navigate("/login");
      return;
    }

    if (isFriend) {
      removeFriend(currentUser.id, user.id);
      toast.success(`Removed ${user.name} from friends`);
      setIsFriend(false);
    } else {
      addFriend(currentUser.id, user.id);
      toast.success(`Added ${user.name} as friend!`);
      setIsFriend(true);
    }
  };

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-primary"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <Badge variant="secondary" className="gap-1">
                  <Award className="h-3 w-3" />
                  Level {user.level}
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-2">@{user.username}</p>
              
              {user.bio && (
                <p className="text-sm mb-3 max-w-2xl">{user.bio}</p>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(user.joinedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {user.friends.length} friends
                </div>
              </div>

              {/* Mutual Friends */}
              {mutualFriends.length > 0 && !isOwnProfile && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {mutualFriends.slice(0, 3).map((friend, i) => (
                      <img
                        key={i}
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-8 h-8 rounded-full border-2 border-background"
                        title={friend.name}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {mutualFriends.length} mutual {mutualFriends.length === 1 ? 'friend' : 'friends'}
                  </p>
                </div>
              )}
            </div>

            {!isOwnProfile && (
              <Button
                variant={isFriend ? "outline" : "hero"}
                onClick={handleFriendToggle}
                className="gap-2"
              >
                {isFriend ? (
                  <>
                    <UserMinus className="h-4 w-4" />
                    Remove Friend
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Add Friend
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{user.xp}</p>
            <p className="text-sm text-muted-foreground">Experience Points</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{user.bazaarTokens}</p>
            <p className="text-sm text-muted-foreground">Bazaar Tokens</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{userProducts.length}</p>
            <p className="text-sm text-muted-foreground">Products Listed</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{user.friends.length}</p>
            <p className="text-sm text-muted-foreground">Friends</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="listings">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Listings
            </TabsTrigger>
            <TabsTrigger value="friends">
              <Users className="h-4 w-4 mr-2" />
              Friends
            </TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings">
            {userProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addItem}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No products listed yet</p>
              </Card>
            )}
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends">
            {user.friends.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {user.friends.map((friendId) => {
                  const friend = getUserById(friendId);
                  if (!friend) return null;
                  
                  return (
                    <motion.div
                      key={friend.id}
                      whileHover={{ y: -4 }}
                    >
                      <Card
                        className="p-4 cursor-pointer hover:border-primary transition-colors"
                        onClick={() => navigate(`/profile/${friend.username}`)}
                      >
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-primary"
                        />
                        <h3 className="font-semibold text-center mb-1">{friend.name}</h3>
                        <p className="text-sm text-muted-foreground text-center">
                          @{friend.username}
                        </p>
                        <Badge variant="secondary" className="w-full justify-center mt-2">
                          Level {friend.level}
                        </Badge>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No friends yet</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;