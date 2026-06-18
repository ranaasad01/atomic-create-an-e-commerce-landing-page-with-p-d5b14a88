"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingCart, Heart, ArrowRight, Truck, Shield, RotateCcw, Headphones, Sparkles, ChevronRight, Check, Zap, Award, Users } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, type Product } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Audio",
    price: 249,
    originalPrice: 349,
    rating: 4.8,
    reviewCount: 1240,
    image: "https://m.media-amazon.com/images/I/71YM2N5whtL.jpg",
    badge: "Best Seller",
    isSale: true,
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    category: "Accessories",
    price: 189,
    originalPrice: undefined,
    rating: 4.9,
    reviewCount: 876,
    image: "https://www.fossil.com/on/demandware.static/-/Library-Sites-FossilSharedLibrary/default/dw87935046/navigation/mens-watches/FS5304%20-%20Nav%20Collection%20Image%20-%20D%20-%20PRODUCT%20-%20400x678.jpg",
    badge: "New",
    isNew: true,
  },
  {
    id: 3,
    name: "Portable Espresso Maker",
    category: "Kitchen",
    price: 79,
    originalPrice: 99,
    rating: 4.7,
    reviewCount: 532,
    image: "https://staresso.com/cdn/shop/files/image-sp300-flair-portable-01-2-1440x1440.jpg?v=1775024187&width=1440",
    badge: "Sale",
    isSale: true,
  },
  {
    id: 4,
    name: "Ergonomic Desk Lamp",
    category: "Home Office",
    price: 129,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 318,
    image: "https://relaxtheback.com/cdn/shop/files/Humanscale-Element-Disc-Light-Humanscale-420864.jpg?v=1752794079&width=800",
    isNew: true,
  },
  {
    id: 5,
    name: "Merino Wool Throw Blanket",
    category: "Home",
    price: 95,
    originalPrice: 120,
    rating: 4.9,
    reviewCount: 704,
    image: "https://m.media-amazon.com/images/I/61+PzLV621L._AC_UF894,1000_QL80_.jpg",
    isSale: true,
  },
  {
    id: 6,
    name: "Smart Fitness Tracker Band",
    category: "Wearables",
    price: 149,
    originalPrice: undefined,
    rating: 4.5,
    reviewCount: 2100,
    image: "https://m.media-amazon.com/images/I/71KwGt+7qSL._AC_UF894,1000_QL80_.jpg",
    badge: "Popular",
  },
  {
    id: 7,
    name: "Ceramic Pour-Over Coffee Set",
    category: "Kitchen",
    price: 64,
    originalPrice: 80,
    rating: 4.8,
    reviewCount: 421,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    isSale: true,
  },
  {
    id: 8,
    name: "Linen Tote Bag",
    category: "Accessories",
    price: 45,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 289,
    image: "https://visibleartshop.com/cdn/shop/products/DSC_3953_2_82_2.jpg?v=1647352699&width=1445",
    isNew: true,
  },
];

const dealProducts: Product[] = [
  {
    id: 9,
    name: "Bamboo Cutting Board Set",
    category: "Kitchen",
    price: 38,
    originalPrice: 65,
    rating: 4.6,
    reviewCount: 193,
    image: "https://www.zulaykitchen.com/cdn/shop/files/Bamboo_Cutting_Board_Set_3-Piece_3.jpg?v=1774622363&width=1800",
    badge: "42% Off",
    isSale: true,
  },
  {
    id: 10,
    name: "Scented Soy Candle Collection",
    category: "Home",
    price: 29,
    originalPrice: 48,
    rating: 4.8,
    reviewCount: 567,
    image: "https://jackbenimblecandles.com/cdn/shop/files/064_1445x.jpg?v=1774609911",
    badge: "40% Off",
    isSale: true,
  },
  {
    id: 11,
    name: "Stainless Steel Water Bottle",
    category: "Lifestyle",
    price: 32,
    originalPrice: 55,
    rating: 4.7,
    reviewCount: 1450,
    image: "https://i.etsystatic.com/16291412/r/il/6a1ce9/3582734063/il_fullxfull.3582734063_eyq1.jpg",
    badge: "42% Off",
    isSale: true,
  },
  {
    id: 12,
    name: "Wireless Charging Pad",
    category: "Tech",
    price: 39,
    originalPrice: 69,
    rating: 4.5,
    reviewCount: 882,
    image: "https://m.media-amazon.com/images/I/61oIAKY9s1L.jpg",
    badge: "43% Off",
    isSale: true,
  },
];

const categories = [
  { name: "Audio", icon: "🎧", count: 48, color: "from-violet-500 to-purple-600", image: "https://cdn-icons-png.flaticon.com/512/786/786373.png" },
  { name: "Accessories", icon: "⌚", count: 63, color: "from-amber-500 to-orange-600", image: "https://cdn-icons-png.flaticon.com/512/786/786373.png" },
  { name: "Kitchen", icon: "☕", count: 91, color: "from-emerald-500 to-teal-600", image: "https://panaxmart.com/cdn/shop/articles/Jewelry-laydown-two.jpg?v=1695801014&width=1920" },
  { name: "Home Office", icon: "💡", count: 37, count2: 37, color: "from-blue-500 to-indigo-600", image: "https://hips.hearstapps.com/hmg-prod/images/bcacfded-198f-4492-899c-da0e4457a247.jpg" },
  { name: "Wearables", icon: "🏃", count: 29, color: "from-rose-500 to-pink-600", image: "https://rnb.scene7.com/is/image/roomandboard/parsons_699588_25e1?size=2400,2400&scl=1" },
  { name: "Home", icon: "🏡", count: 74, color: "from-lime-500 to-green-600", image: "https://careevolution.com/wp-content/uploads/2025/04/Wearables-WP-hero3.jpg" },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $75. Fast, reliable delivery to your door in 2–5 business days.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    description: "Every product is backed by our comprehensive warranty. Shop with complete confidence.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Not satisfied? Return anything within 30 days for a full refund, no questions asked.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our expert team is always here to help. Reach us via chat, email, or phone anytime.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Interior Designer",
    avatar: "https://betinasia.zendesk.com/hc/article_attachments/22178895521170",
    rating: 5,
    text: "Luminary Shop has completely transformed how I source products for my clients. The quality is consistently exceptional and the curation is spot-on for modern aesthetics.",
  },
  {
    id: 2,
    name: "James Okafor",
    role: "Tech Entrepreneur",
    avatar: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
    rating: 5,
    text: "I've ordered from dozens of online stores, but Luminary stands apart. The packaging is beautiful, delivery is fast, and every product feels premium. Highly recommend.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Lifestyle Blogger",
    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Priya_Sharma_%28fictional_character%29.jpg/250px-Priya_Sharma_%28fictional_character%29.jpg",
    rating: 5,
    text: "My followers always ask where I find such unique, well-made items. The answer is always Luminary Shop. Their selection is unmatched for modern living.",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers", icon: Users },
  { value: "1,200+", label: "Curated Products", icon: Award },
  { value: "4.9★", label: "Average Rating", icon: Star },
  { value: "99%", label: "Satisfaction Rate", icon: Zap },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-gray-200 fill-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">({(count ?? 0).toLocaleString()})</span>
    </div>
  );
}

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  hover: { y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" },
};

const imageHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
};

function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount =
    product.originalPrice && product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer group"
      style={{ willChange: "transform" }}
    >
      <motion.div variants={cardHover} className="h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <motion.img
            variants={imageHover}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop";
            }}
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                product.isSale
                  ? "bg-rose-500 text-white"
                  : product.isNew
                  ? "bg-emerald-500 text-white"
                  : "bg-orange-500 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full bg-rose-100 text-rose-600">
              -{discount}%
            </span>
          )}
          {/* Wishlist */}
          <button
            onClick={() => setWishlisted((w) => !w)}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 active:scale-95"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted ? "text-rose-500 fill-rose-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <span className="text-xs font-medium text-orange-500 uppercase tracking-wide mb-1">
            {product.category}
          </span>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 flex-1">
            {product.name}
          </h3>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${(product.price ?? 0).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors duration-200"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const categoryFilters = ["All", "Audio", "Accessories", "Kitchen", "Home Office", "Wearables", "Home"];

  const filteredProducts =
    activeCategory === "All"
      ? featuredProducts
      : featuredProducts.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-16">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                New Collection 2025
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight"
            >
              Live with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                intention.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed max-w-md"
            >
              {APP_TAGLINE} Discover thoughtfully designed products that elevate
              your everyday — from morning rituals to evening wind-downs.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-orange-200 transition-colors duration-200"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#categories"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-7 py-3.5 rounded-2xl border border-gray-200 shadow-sm transition-colors duration-200"
              >
                Browse Categories
              </motion.a>
            </motion.div>

            {/* Mini stats */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 pt-2">
              {[
                { value: "50K+", label: "Customers" },
                { value: "1,200+", label: "Products" },
                { value: "4.9★", label: "Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right hero image grid */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:grid grid-cols-2 gap-4"
          >
            {featuredProducts.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl overflow-hidden shadow-xl ${i === 1 ? "mt-8" : ""} ${i === 3 ? "mt-8" : ""}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop";
                  }}
                />
              </motion.div>
            ))}
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-3 border border-gray-100"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Just ordered</div>
                <div className="text-sm font-bold text-gray-900">Leather Watch</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {valueProps.map((vp) => (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${vp.bg} flex items-center justify-center flex-shrink-0`}>
                  <vp.icon className={`w-5 h-5 ${vp.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{vp.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{vp.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 text-center"
          >
            <motion.p variants={fadeInUp} className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
              Browse by Category
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-extrabold text-gray-900 mb-4">
              Find what you love
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 max-w-xl mx-auto">
              From cutting-edge audio gear to artisan kitchen tools — explore our hand-picked categories designed for modern living.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.name}
                variants={scaleIn}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-square mb-3 shadow-md">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop";
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl mb-1">{cat.icon}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{cat.name}</div>
                  <div className="text-xs text-gray-500">{cat.count} items</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          >
            <div>
              <motion.p variants={fadeInUp} className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
                Featured Products
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl font-extrabold text-gray-900">
                Curated for you
              </motion.h2>
            </div>
            <motion.a
              variants={fadeInUp}
              href="#deals"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#deals")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
            >
              View all deals <ChevronRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Category filter pills */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categoryFilters.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Product grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {(filteredProducts.length > 0 ? filteredProducts : featuredProducts).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DEALS / SALE ─────────────────────────────────────────────────── */}
      <section id="deals" className="py-20 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 text-sm font-bold px-4 py-2 rounded-full mb-4">
              <Zap className="w-4 h-4" />
              Limited Time Deals
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl font-extrabold text-gray-900 mb-4">
              Up to 43% off today
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 max-w-lg mx-auto">
              Don't miss these hand-picked deals on our most-loved products. Prices this low won't last — grab yours before they're gone.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS BANNER ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-orange-400" />
                </div>
                <div className="text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
              Customer Love
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-extrabold text-gray-900 mb-4">
              What our customers say
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 max-w-xl mx-auto">
              Thousands of happy customers trust {APP_NAME} for quality, curation, and care. Here's what a few of them have to say.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-orange-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-0.5 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-orange-100"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-20 bg-gradient-to-br from-orange-500 to-amber-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={scaleIn} className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl font-extrabold text-white mb-4">
              Get 15% off your first order
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Join 50,000+ subscribers and be the first to hear about new arrivals, exclusive deals, and curated style guides.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 bg-white text-orange-600 font-semibold px-8 py-4 rounded-2xl shadow-xl"
              >
                <Check className="w-5 h-5" />
                You're in! Check your inbox for your discount code.
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-2xl text-gray-900 placeholder-gray-400 bg-white border-0 outline-none focus:ring-2 focus:ring-white/50 text-sm font-medium shadow-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-7 py-3.5 rounded-2xl transition-colors duration-200 shadow-lg whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </motion.form>
            )}

            <motion.p variants={fadeInUp} className="text-orange-200 text-xs mt-4">
              No spam, ever. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}