import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  ChevronDown, 
  X, 
  Cookie,
  Zap,
  Home,
  Smartphone,
  Shirt,
  Footprints,
  Dumbbell,
  Sofa,
  Flame,
  Shield,
  Truck,
  CreditCard,
  Phone,
  Building2,
  HelpCircle,
  Info
} from 'lucide-react';

export const CookieBanner = () => {
    const [open, setOpen] = useState(true);
    const { showToast, logAction } = useAppContext();

    if (!open) return null;

    const accept = () => { 
        setOpen(false); 
        showToast('Tum cerezler kabul edildi.'); 
        logAction('Cerezler Kabul Edildi', true); 
    };
    const reject = () => { 
        setOpen(false); 
        showToast('Yalnizca zorunlu cerezler aktif.'); 
        logAction('Cerezler Reddedildi'); 
    };
    const settings = () => { 
        showToast('Cerez Yonetim Sayfasi yukleniyor... (Gorev 4)'); 
        logAction('Cerez Ayarlarina Tiklandi'); 
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-[9999] glass-dark border-t border-white/10"
            >
                <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                        <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                <Cookie className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    TrendSepet olarak sizi daha iyi tanimak, kisisellestirilmis icerik sunmak ve
                                    reklam ortaklarimizla veri paylasmak icin cerezler kullaniyoruz.{' '}
                                    <button 
                                        onClick={settings} 
                                        className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                                    >
                                        Gizlilik Politikasi
                                    </button>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <Button 
                                onClick={accept}
                                className="flex-1 lg:flex-none bg-primary hover:bg-primary/90 text-white shadow-glow-primary"
                            >
                                <Cookie className="w-4 h-4 mr-2" />
                                Tumunu Kabul Et
                            </Button>
                            <Button 
                                onClick={settings}
                                variant="outline"
                                className="flex-1 lg:flex-none border-white/20 text-gray-300 hover:bg-white/5"
                            >
                                Ayarlari Yonet
                            </Button>
                        </div>
                    </div>
                    <button 
                        onClick={reject}
                        className="absolute bottom-2 right-4 text-[10px] text-gray-500 hover:text-gray-400 underline transition-colors"
                    >
                        reddet
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export const FlashBanner = () => {
    const [sec, setSec] = useState(14 * 60 + 33);

    useEffect(() => {
        const id = setInterval(() => { setSec(s => (s < 0 ? 15 * 60 : s - 1)); }, 1000);
        return () => clearInterval(id);
    }, []);

    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');

    return (
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative overflow-hidden bg-gradient-to-r from-red-600 via-primary to-red-600 animate-gradient"
        >
            <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center gap-3 text-white text-sm font-bold">
                    <Zap className="w-4 h-4 animate-bounce-subtle" />
                    <span>{"FLASH SALE - Tum Spor Urunlerinde %40'a Varan Indirim!"}</span>
                    <span className="inline-flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full text-xs font-mono tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        00:{m}:{s}
                    </span>
                    <span className="hidden sm:inline">- Kacirma!</span>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
        </motion.div>
    );
};

export const Navbar = () => {
    const { user, cart, favorites, filterCategory, searchProducts, searchQuery, setIsCartOpen, setActivePage, logAction, showToast } = useAppContext();
    const [searchInput, setSearchInput] = useState(searchQuery || '');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchProducts(searchInput);
        }
    };

    const executeSearch = () => {
        searchProducts(searchInput);
    };

    const handleDeadLink = (name) => {
        logAction(`Olu Link Tiklandi: ${name}`, true);
        showToast(`Sayfa 404: "${name}" sayfasi su an bakimdadir.`);
    };

    const categories = [
        { id: 'Tümü', label: 'Anasayfa', icon: Home },
        { id: 'Elektronik_TRICK', label: 'Elektronik', icon: Smartphone },
        { id: 'Giyim', label: 'Giyim', icon: Shirt },
        { id: 'Ayakkabi', label: 'Ayakkabi', icon: Footprints },
        { id: 'Spor', label: 'Spor', icon: Dumbbell },
        { id: 'Ev', label: 'Ev & Yasam', icon: Sofa },
        { id: 'Flash', label: 'Firsatlar', icon: Flame, highlight: true },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''}`}>
            <div className="bg-dark-secondary text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end gap-4 py-2 text-xs">
                        <button onClick={() => handleDeadLink('Satici Ol')} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>Satici Ol</span>
                        </button>
                        <button onClick={() => handleDeadLink('Kurumsal')} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                            <Shield className="w-3.5 h-3.5" />
                            <span>Kurumsal</span>
                        </button>
                        <button onClick={() => handleDeadLink('Yardim')} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Yardim</span>
                        </button>
                        <button 
                            onClick={() => { setActivePage('About'); logAction('Hakkinda Sayfasina Gidildi'); }} 
                            className="flex items-center gap-1.5 text-primary font-semibold hover:text-primary/80 transition-colors"
                        >
                            <Info className="w-3.5 h-3.5" />
                            <span>Hakkimizda</span>
                        </button>
                        <div className="h-4 w-px bg-gray-700 mx-2" />
                        {user ? (
                            <button 
                                onClick={() => { setActivePage('Profile'); logAction('Profile Tiklandi'); }} 
                                className="flex items-center gap-1.5 font-semibold text-white hover:text-primary transition-colors"
                            >
                                <User className="w-3.5 h-3.5" />
                                <span>{user.name}</span>
                            </button>
                        ) : (
                            <button 
                                onClick={() => { setActivePage('Auth'); logAction('Giris Yap Navigasyonuna Tiklandi'); }} 
                                className="flex items-center gap-1.5 font-semibold text-white hover:text-primary transition-colors"
                            >
                                <User className="w-3.5 h-3.5" />
                                <span>Giris Yap / Kayit Ol</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className={`bg-white border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => { filterCategory('Tümü'); setActivePage('Shop'); }}
                            className="flex-shrink-0"
                        >
                            <h1 className="text-2xl font-black tracking-tight">
                                <span className="text-primary">Trend</span>
                                <span className="text-dark">Sepet</span>
                            </h1>
                        </button>

                        <div className="flex-1 max-w-2xl">
                            <div className="relative flex items-center group">
                                <div className="absolute left-0 h-full flex items-center">
                                    <select 
                                        onChange={(e) => e.target.value !== 'Tum Kategoriler' && filterCategory(e.target.value)}
                                        className="h-full pl-4 pr-8 text-sm text-gray-600 bg-gray-50 border-r border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                                    >
                                        <option>Tum Kategoriler</option>
                                        <option>Ayakkabi</option>
                                        <option>Elektronik</option>
                                        <option>Giyim</option>
                                        <option>Spor</option>
                                        <option>Ev</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Urun, marka veya kategori ara..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyDown={handleSearchKeyPress}
                                    className="w-full pl-44 pr-12 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-primary/20 transition-all"
                                />
                                <Button 
                                    onClick={executeSearch}
                                    size="icon"
                                    className="absolute right-1 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90"
                                >
                                    <Search className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    if (!user) { 
                                        showToast("Favorileri gormek icin giris yapmalisiniz."); 
                                        setActivePage('Auth'); 
                                        logAction('Favorilere Giris Yapmadan Tiklandi', true); 
                                        return; 
                                    }
                                    setActivePage('Profile');
                                    window.scrollTo(0, 0); 
                                    logAction('Favoriler Menusu Acildi');
                                }}
                                className="relative flex flex-col items-center gap-0.5 h-auto py-2 px-3 text-gray-600 hover:text-primary hover:bg-primary/5"
                            >
                                <Heart className="w-5 h-5" />
                                <span className="text-[10px] font-medium">Favoriler</span>
                                {favorites.size > 0 && (
                                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                                        {favorites.size}
                                    </Badge>
                                )}
                            </Button>
                            
                            <Button
                                variant="ghost"
                                onClick={() => { setIsCartOpen(true); logAction('Sepet Menusu Acildi'); }}
                                className="relative flex flex-col items-center gap-0.5 h-auto py-2 px-3 text-gray-600 hover:text-primary hover:bg-primary/5"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span className="text-[10px] font-medium">Sepet</span>
                                {cart.length > 0 && (
                                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] animate-pulse-glow">
                                        {cart.reduce((s, i) => s + i.qty, 0)}
                                    </Badge>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ul className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => { 
                                            setActivePage('Shop'); 
                                            filterCategory(cat.id); 
                                        }}
                                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all whitespace-nowrap ${cat.highlight ? 'bg-white/10' : ''}`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{cat.label}</span>
                                        {cat.highlight && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export const Hero = () => {
    const { filterCategory, setActivePage } = useAppContext();
    
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-dark-secondary via-dark to-dark-secondary">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm bg-white/10 text-white border-white/20">
                            <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
                            {"Turkiye'nin 1 Numarali E-Ticaret Platformu"}
                        </Badge>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight"
                    >
                        {"Turkiye'nin En Buyuk"}
                        <br />
                        <span className="text-gradient">Alisveris Merkezi</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg text-gray-400 max-w-xl"
                    >
                        Milyonlarca urun, hizli teslimat, guvenli odeme
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-8 flex flex-wrap items-center justify-center gap-4"
                    >
                        <Button 
                            onClick={() => { setActivePage('Shop'); filterCategory('Tümü'); }}
                            size="xl"
                            className="bg-primary hover:bg-primary/90 text-white shadow-glow-primary font-bold"
                        >
                            Alisverise Basla
                            <ChevronDown className="w-5 h-5 ml-2 rotate-[-90deg]" />
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
                    >
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-full bg-white/5">
                                <Truck className="w-5 h-5 text-primary" />
                            </div>
                            <span>Ucretsiz Kargo</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-full bg-white/5">
                                <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <span>Guvenli Odeme</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-full bg-white/5">
                                <CreditCard className="w-5 h-5 text-primary" />
                            </div>
                            <span>Taksit Imkani</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export const Footer = () => {
    const { showToast, logAction } = useAppContext();

    const handleFooterLink = (sec) => {
        logAction(`Footer Olu Linke Tiklandi (${sec})`, true);
        showToast(`404: Aradiginiz sayfa silinmis veya tasinmis. (${sec})`);
    };

    const footerLinks = [
        {
            title: 'TrendSepet',
            links: [
                { label: 'Hakkimizda', action: () => handleFooterLink('Hakkimizda') },
                { label: 'Kariyer', action: () => handleFooterLink('Kariyer') },
                { label: 'Basin', action: () => handleFooterLink('Basin') },
            ]
        },
        {
            title: 'Musteri Hizmetleri',
            links: [
                { label: 'Yardim Merkezi', action: () => handleFooterLink('Yardim') },
                { label: 'Iade & Degisim', action: () => handleFooterLink('Iade') },
                { label: 'Kargo Takibi', action: () => handleFooterLink('Kargo') },
            ]
        },
        {
            title: 'Kurumsal',
            links: [
                { label: 'Satici Ol', action: () => handleFooterLink('Satici Ol') },
                { label: 'Reklam Ver', action: () => handleFooterLink('Reklam') },
                { label: 'API Entegrasyonu', action: () => handleFooterLink('API') },
            ]
        },
    ];

    return (
        <footer className="bg-dark-secondary text-white">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-lg font-bold mb-4 text-white">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <button
                                            onClick={link.action}
                                            className="text-gray-400 hover:text-primary transition-colors text-sm"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Odeme Yontemleri</h4>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                                <CreditCard className="w-4 h-4 text-primary" />
                                <span className="text-xs text-gray-400">Kredi Karti</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                                <Building2 className="w-4 h-4 text-primary" />
                                <span className="text-xs text-gray-400">Havale</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                                <Phone className="w-4 h-4 text-primary" />
                                <span className="text-xs text-gray-400">Mobil</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <p className="text-sm text-gray-500">
                        2026 TrendSepet A.S. | HCI Proje Test Simulasyonu (Full-Stack Mode)
                    </p>
                </div>
            </div>
        </footer>
    );
};

export const Toast = () => {
    const { toastMsg } = useAppContext();
    
    return (
        <AnimatePresence>
            {toastMsg && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[700] px-6 py-3 bg-dark text-white rounded-full shadow-2xl text-sm font-medium"
                >
                    {toastMsg}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
