// Product Upload Page - Users can upload products with photos, details, and condition
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, X, Camera, Package, DollarSign, FileText, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAppStore } from "@/store/useAppStore";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/lib/mockData";

const UploadProduct = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addProduct, currentUser } = useAppStore();
  
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<"new" | "almostNew" | "used">("new");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  // Handle image upload (mock - converts to base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error("Please login to upload products");
      navigate("/login");
      return;
    }

    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    if (!title || !description || !price || !category) {
      toast.error("Please fill all required fields");
      return;
    }

    setUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const newProduct = {
        id: `product_${Date.now()}`,
        title,
        description,
        price: parseFloat(price),
        condition,
        category,
        images,
        sellerId: currentUser.id,
        createdAt: new Date().toISOString(),
        rating: 0
      };

      addProduct(newProduct);
      
      toast.success("Product uploaded successfully!", {
        description: "Your product is now live on ShoppingGhar"
      });

      setUploading(false);
      navigate("/products");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            <Package className="inline h-8 w-8 mr-2 text-primary" />
            Upload Your Product
          </h1>
          <p className="text-muted-foreground">
            Fill in the details to list your product on ShoppingGhar
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Image Upload */}
            <Card className="p-6">
              <Label className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Product Images *
              </Label>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-border"
                  >
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:scale-110 transition-transform"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
                
                {images.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Add up to 5 images. First image will be the cover photo.
              </p>
            </Card>

            {/* Product Details */}
            <Card className="p-6">
              <Label className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Product Details
              </Label>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., iPhone 13 Pro Max 256GB"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product in detail..."
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (Rs.) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="2999"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Condition */}
            <Card className="p-6">
              <Label className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                Product Condition *
              </Label>
              
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { value: "new", label: "New", desc: "Brand new, never used" },
                  { value: "almostNew", label: "Almost New", desc: "Used once or twice" },
                  { value: "used", label: "Used", desc: "Previously used" }
                ].map(item => (
                  <motion.div
                    key={item.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <label
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        condition === item.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="condition"
                        value={item.value}
                        checked={condition === item.value}
                        onChange={(e) => setCondition(e.target.value as any)}
                        className="sr-only"
                      />
                      <div className="font-semibold mb-1">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </label>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="hero"
                disabled={uploading}
                className="flex-1"
              >
                {uploading ? "Uploading..." : "Upload Product"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;