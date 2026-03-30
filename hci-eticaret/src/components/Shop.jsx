import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import {
  Eye,
  Heart,
  ShoppingCart,
  Star,
  Clock,
  Package,
  AlertTriangle,
  TrendingUp,
  Users,
  Flame,
  Search,
  Filter,
  ChevronDown,
  Trophy,
  Sparkles,
  Timer,
  Truck
} from 'lucide-react';

export const Shop = () => {
    const { activeCategory, sortProducts, searchQuery, filteredProducts } = useAppContext();

    return (
        <div className="min-h-screen bg-background">
            <UrgencyBar />
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    <Sidebar />
                    <main className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    {searchQuery ? (
                                        <>
                                            <span className="text-muted-foreground">&quot;</span>
                                            {searchQuery}
                                            <span className="text-muted-foreground">&quot;</span>
                                            <span className="text-primary ml-2">Arama Sonuclari</span>
                                        </>
                                    ) : (
                                        <>
                                            {activeCategory} <span className="text-primary">Urunleri</span>
                                        </>
                                    )}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {filteredProducts.length} urun bulundu
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <select 
                                    onChange={(e) => sortProducts(e.target.value)}
                                    className="h-10 pl-4 pr-10 text-sm bg-white border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                                >
                                    <option value="default">Onerilen Siralama</option>
                                    <option value="priceasc">Fiyat: Dusukten Yuksege</option>
                                    <option value="pricedesc">Fiyat: Yuksekten Dusuge</option>
                                    <option value="rating">En Cok Degerlendirilen</option>
                                    <option value="newest">En Yeniler</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full flex flex-col items-center justify-center py-16 text-center"
                                    >
                                        <Search className="w-16 h-16 text-muted-foreground/30 mb-4" />
                                        <p className="text-lg text-muted-foreground">Urun bulunamadi.</p>
                                        <p className="text-sm text-muted-foreground/70 mt-1">Farkli anahtar kelimeler deneyin.</p>
                                    </motion.div>
                                ) : (
                                    filteredProducts.map((p, index) => (
                                        <motion.div
                                            key={p.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            layout
                                        >
                                            <ProductCard product={p} />
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

const UrgencyBar = () => {
    const [viewerCount, setViewerCount] = useState(47);
    const cutoff = new Date(Date.now() + 90 * 60000);

    useEffect(() => {
        const id = setInterval(() => {
            setViewerCount(v => Math.max(20, Math.min(99, v + Math.floor(Math.random() * 5) - 2)));
        }, 4000);
        return () => clearInterval(id);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200"
        >
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <span className="text-amber-800">
                            Su an <span className="inline-flex items-center justify-center px-2 py-0.5 bg-red-500 text-white rounded-full text-xs font-bold animate-count-flash">{viewerCount}</span> kisi bu sayfayi inceliyor
                        </span>
                    </div>
                    <div className="hidden sm:block h-4 w-px bg-amber-300" />
                    <div className="flex items-center gap-2 text-amber-800">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span>Son 1 saatte <strong className="text-green-700">312</strong> urun satildi</span>
                    </div>
                    <div className="hidden sm:block h-4 w-px bg-amber-300" />
                    <div className="flex items-center gap-2 text-amber-800">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Kargo kesim saati: <strong className="text-primary">{String(cutoff.getHours()).padStart(2, '0')}:{String(cutoff.getMinutes()).padStart(2, '0')}</strong></span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Sidebar = () => {
    const { filterCategory, applyPriceFilter, logAction } = useAppContext();
    const [priceVal, setPriceVal] = useState([5000]);

    const handlePrice = (value) => {
        setPriceVal(value);
        applyPriceFilter(value[0]);
    };

    const categories = [
        { id: 'Tümü', label: 'Tum Urunler', count: 12 },
        { id: 'Spor_TRICK2', label: 'Spor Ekipmanlari', count: 4 }, // DARK PATTERN
        { id: 'Ayakkabi', label: 'Ayakkabi', count: 4 },
        { id: 'Giyim', label: 'Giyim', count: 2 },
        { id: 'Elektronik', label: 'Elektronik', count: 3 },
        { id: 'Ev', label: 'Ev & Yasam', count: 1 },
    ];

    return (
        <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-4">
                {/* Categories */}
                <Card className="overflow-hidden">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-4 h-4 text-primary" />
                            <h3 className="font-bold text-foreground">Kategoriler</h3>
                        </div>
                        <ul className="space-y-1">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => filterCategory(cat.id)}
                                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">{cat.label}</span>
                                        <Badge variant="secondary" className="text-xs">{cat.count}</Badge>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Price Filter */}
                <Card className="overflow-hidden">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <h3 className="font-bold text-foreground">Fiyat Araligi</h3>
                        </div>
                        <div className="px-1">
                            <Slider
                                value={priceVal}
                                onValueChange={handlePrice}
                                max={5000}
                                step={100}
                                className="mb-4"
                            />
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">0 TL</span>
                                <Badge variant="outline" className="font-mono">{priceVal[0].toLocaleString('tr-TR')} TL</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Rating Filter */}
                <Card className="overflow-hidden">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <h3 className="font-bold text-foreground">Degerlendirme</h3>
                        </div>
                        <div className="space-y-2">
                            {[5, 4, 3].map((rating) => (
                                <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                                    <input 
                                        type="checkbox" 
                                        defaultChecked={rating >= 4}
                                        onChange={() => logAction(`${rating} Yildiz Filtresi Isaretlendi/Kaldirildi`)}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                        {rating === 5 ? 've ustu' : 've uzeri'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </aside>
    );
};

const ProductCard = ({ product: p }) => {
    const { favorites, toggleFav, addToCart, setDetailProductId, logAction } = useAppContext();
    const isFav = favorites.has(p.id);

    // DARK PATTERN: Variable Product Name
    const displayName = useMemo(() => Math.random() > 0.5 && p.altName ? p.altName : p.name, [p]);

    const handleDetail = () => {
        logAction(`Urun Detayina Gidildi: ${p.name}`);
        setDetailProductId(p.id);
    };

    // Fake stock percentage for progress bar
    const stockPercentage = Math.min(100, Math.max(10, (p.stock / 20) * 100));

    return (
        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white">
            {/* Discount Badge */}
            <Badge 
                variant="destructive" 
                className="absolute top-3 left-3 z-10 px-2.5 py-1 font-bold shadow-lg"
            >
                -{p.fakeDiscount}%
            </Badge>

            {/* Favorite Button */}
            <button
                onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow-lg transition-all duration-200 hover:scale-110 ${
                    isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
            >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>

            {/* Product Image */}
            <div 
                onClick={handleDetail}
                className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden"
            >
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </div>

            {/* Product Info */}
            <CardContent className="p-4" onClick={handleDetail}>
                {/* Brand */}
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {p.brand}
                </p>

                {/* Name */}
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2 min-h-[40px]">
                    {displayName}
                </h3>

                {/* FAKE REVIEW PATTERN */}
                <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                        ({p.reviews}) - Mukemmel Urun
                    </span>
                </div>

                {/* Best Seller Tag */}
                {p.bestSeller && (
                    <Badge variant="warning" className="mb-2 bg-amber-100 text-amber-700 border-amber-200">
                        <Trophy className="w-3 h-3 mr-1" />
                        EN COK SATAN
                    </Badge>
                )}

                {/* Price Block */}
                <div className="mb-3">
                    <p className="text-xs text-muted-foreground line-through">
                        {p.oldPrice.toLocaleString('tr-TR')} TL
                    </p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-xl font-black text-primary">
                            {p.price.toLocaleString('tr-TR')} TL
                        </p>
                    </div>
                    {p.packageNote && (
                        <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {p.packageNote}
                        </p>
                    )}
                </div>

                {/* DARK PATTERN: Fake Stock Warning */}
                {p.stock <= 5 && (
                    <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            <span className="text-[11px] font-semibold text-amber-700">
                                Son {p.stock} urun! Baskasi Sepete Eklemis Olabilir!
                            </span>
                        </div>
                        <Progress value={stockPercentage} className="h-1.5 bg-amber-100" />
                    </div>
                )}

                {/* DARK PATTERN: Fake Viewer Count */}
                <div className="flex items-center gap-1.5 px-2 py-1.5 bg-red-50 rounded-lg mb-3">
                    <Eye className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-[11px] font-medium text-red-600">
                        {p.viewers} kisi inceliyor ve almayi dusunuyor
                    </span>
                </div>
            </CardContent>

            {/* Actions */}
            <div className="p-4 pt-0 flex gap-2">
                <Button 
                    onClick={(e) => { e.stopPropagation(); addToCart(p.id); }}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                    size="sm"
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Sepete Ekle
                </Button>
                <Button
                    onClick={(e) => { e.stopPropagation(); handleDetail(); }}
                    variant="outline"
                    size="sm"
                    className="px-3"
                >
                    <Search className="w-4 h-4" />
                </Button>
            </div>
        </Card>
    );
};
