// Buyer Profile Page
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Gift, Award, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/lib/mockData";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { EditProfileDialog } from "@/components/EditProfileDialog";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const Profile = () => {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { currentUser, getUserById } = useAppStore();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const [spinRewards] = useState([
    { code: "SPIN123", discount: "10% OFF", used: false },
    { code: "SPIN456", discount: "Free Shipping", used: true },
    { code: "SPIN789", discount: "15% OFF", used: false }
  ]);

  // Use current user or mock data
  const user = currentUser || {
    id: "user_1",
    username: "rajesh_kumar",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    bio: "Passionate shopper and seller",
    location: "Kathmandu, Nepal",
    xp: 1250,
    level: 5,
    bazaarTokens: 45,
    friends: ["user_2", "user_3"],
    joinedDate: "2024-01-15",
    purchases: 12,
    favorites: products.slice(0, 4)
  };

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
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <Badge variant="secondary" className="gap-1">
                  <Award className="h-3 w-3" />
                  Level {user.level}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              {user.location && (
                <p className="text-sm text-muted-foreground">{user.location}</p>
              )}
              
              {/* XP Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Experience Points</span>
                  <span className="font-medium">{user.xp} / 1500 XP</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(user.xp / 1500) * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-primary to-primary-hover"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
                {t('profile.editProfile')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate(`/profile/${user.username}`)}
              >
                <Users className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </div>
          </div>
        </Card>

        <EditProfileDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{'purchases' in user ? user.purchases : 0}</p>
                <p className="text-sm text-muted-foreground">Total Purchases</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{'favorites' in user ? user.favorites.length : 0}</p>
                <p className="text-sm text-muted-foreground">Saved Items</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-full">
                <Gift className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{spinRewards.filter(r => !r.used).length}</p>
                <p className="text-sm text-muted-foreground">Active Rewards</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
            <TabsTrigger value="favorites">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="purchases">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Purchases
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Gift className="h-4 w-4 mr-2" />
              Rewards
            </TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {('favorites' in user ? user.favorites : products.slice(0, 4)).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addItem}
                />
              ))}
            </div>
          </TabsContent>

          {/* Purchases Tab */}
          <TabsContent value="purchases">
            <Card className="p-6">
              <div className="space-y-4">
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{product.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Purchased on {new Date().toLocaleDateString()}
                      </p>
                      <p className="font-bold text-primary">Rs. {product.price}</p>
                    </div>
                    <Button variant="outline" size="sm">Buy Again</Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <div className="grid md:grid-cols-2 gap-4">
              {spinRewards.map((reward, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-6 ${reward.used ? "opacity-50" : ""}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-1">
                          {reward.discount}
                        </h3>
                        <p className="text-sm text-muted-foreground">Code: {reward.code}</p>
                      </div>
                      <Gift className="h-8 w-8 text-primary" />
                    </div>
                    <Button
                      variant={reward.used ? "outline" : "default"}
                      className="w-full"
                      disabled={reward.used}
                    >
                      {reward.used ? "Used" : "Use Now"}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
