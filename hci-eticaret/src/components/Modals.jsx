import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  X,
  ShoppingCart,
  Trash2,
  Package,
  Truck,
  CreditCard,
  Shield,
  Lock,
  Check,
  ChevronRight,
  AlertTriangle,
  Star,
  Clock,
  Eye,
  Heart,
  Sparkles,
  Gift,
  Zap,
  CheckCircle2,
  MapPin,
  Phone,
  User
} from 'lucide-react';

export const ModalsContainer = () => {
    return (
        <>
            <CartMenu />
            <CheckoutModal />
            <ProductDetailModal />
        </>
    );
};

const CartMenu = () => {
    const { cart, removeFromCart, isCartOpen, setIsCartOpen, setIsCheckoutOpen, showToast, logAction } = useAppContext();
    const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);

    const handleCheckout = () => {
        logAction('Sepette Odemeye Gec Butonuna Tiklandi');
        if (cart.length === 0) { showToast('Sepetiniz bos!'); return; }
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[500]"
                    />
                    
                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 w-full max-w-md h-full bg-white z-[501] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-dark-secondary text-white">
                            <div className="flex items-center gap-3">
                                <ShoppingCart className="w-5 h-5" />
                                <h3 className="text-lg font-bold">Sepetim</h3>
                                <Badge variant="secondary" className="bg-white/20 text-white">
                                    {cart.reduce((s, i) => s + i.qty, 0)}
                                </Badge>
                            </div>
                            <button
                                onClick={() => { setIsCartOpen(false); logAction('Sepet Kapatildi'); }}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                        <ShoppingCart className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Sepetiniz bos</h4>
                                    <p className="text-sm text-gray-500">Hemen alisverise baslayin!</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl shadow-sm">
                                                {item.emoji}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                                                <p className="text-lg font-bold text-primary">
                                                    {(item.price * item.qty).toLocaleString('tr-TR')} TL
                                                    {item.qty > 1 && <span className="text-xs text-gray-500 ml-1">({item.qty}x)</span>}
                                                </p>
                                                {item.packageNote && (
                                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                        <Package className="w-3 h-3" />
                                                        {item.packageNote}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t bg-white p-4 space-y-3">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Ara Toplam</span>
                                <span>{subtotal.toLocaleString('tr-TR')} TL</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Kargo</span>
                                <span className="text-green-600 font-semibold flex items-center gap-1">
                                    <Truck className="w-4 h-4" />
                                    Ucretsiz
                                </span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-3 border-t">
                                <span>Toplam Tutar</span>
                                <span className="text-primary">{subtotal.toLocaleString('tr-TR')} TL</span>
                            </div>
                            <Button 
                                onClick={handleCheckout}
                                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold shadow-glow-primary"
                                size="lg"
                            >
                                <Lock className="w-4 h-4 mr-2" />
                                Guvenli Odeme
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 256-bit SSL</span>
                                <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> 3D Secure</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const CheckoutModal = () => {
    const { cart, clearCart, isCheckoutOpen, setIsCheckoutOpen, logAction, user } = useAppContext();
    const [step, setStep] = useState(1);
    const [extras, setExtras] = useState({ warranty: true, fast: true, pack: true });

    // Credit Card explicit forms to increase user sunk cost fallacy
    const [ccName, setCcName] = useState(user ? user.name : '');
    const [ccNum, setCcNum] = useState('');
    const [ccExpiry, setCcExpiry] = useState('');
    const [ccCvv, setCcCvv] = useState('');

    useEffect(() => {
        if (isCheckoutOpen) {
            setStep(1);
            logAction('Odeme Islemi Baslatildi (Adim 1: Adres)');
        }
    }, [isCheckoutOpen, logAction]);

    if (!isCheckoutOpen) return null;

    const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const extTotal = (extras.warranty ? 149 : 0) + (extras.fast ? 39 : 0) + (extras.pack ? 25 : 0);
    const serviceFee = 19.99;
    const insuranceFee = 12.50;
    const finalTotal = subtotal + extTotal + serviceFee + insuranceFee;

    const handleExtra = (key) => {
        logAction(`Ekstra Servis Degistirildi: ${key}`);
        setExtras(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleCreditCardSubmit = (e) => {
        e.preventDefault();
        const rawCC = ccNum.replace(/\s/g, '');
        if (rawCC.length < 16 || ccCvv.length < 3) {
            logAction('Kredi Karti Odemesi Form Hatasi', true);
            alert("Lutfen gecerli bir kart bilgisi giriniz.");
            return;
        }
        completeOrder();
    };

    const completeOrder = () => {
        logAction(`Siparis Tamamlandi - Toplam Odenen: ${finalTotal.toFixed(2)} TL`);
        clearCart();
        setStep(4);
    };

    const steps = [
        { num: 1, label: 'Adres', icon: MapPin },
        { num: 2, label: 'Hizmetler', icon: Gift },
        { num: 3, label: 'Odeme', icon: CreditCard },
    ];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                    if (e.target === e.currentTarget && step !== 4) { 
                        setIsCheckoutOpen(false); 
                        logAction('Odeme Penceresi Disari Tiklanarak Kapatildi', true); 
                    }
                }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[600] flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    {step < 4 && (
                        <div className="bg-gradient-to-r from-dark-secondary to-dark p-6">
                            <div className="flex items-center justify-between mb-6">
                                {steps.map((s, idx) => {
                                    const Icon = s.icon;
                                    return (
                                        <React.Fragment key={s.num}>
                                            <div className={`flex flex-col items-center ${step >= s.num ? 'text-white' : 'text-white/40'}`}>
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                                                    step > s.num ? 'bg-green-500' : step === s.num ? 'bg-primary' : 'bg-white/10'
                                                }`}>
                                                    {step > s.num ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                                </div>
                                                <span className="text-xs font-medium">{s.label}</span>
                                            </div>
                                            {idx < steps.length - 1 && (
                                                <div className={`flex-1 h-0.5 mx-2 ${step > s.num ? 'bg-green-500' : 'bg-white/10'}`} />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <form className="p-6" onSubmit={(e) => { e.preventDefault(); setStep(2); logAction('Adim 2: Ek Hizmetlere Gecildi'); }}>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Package className="w-5 h-5 text-primary" />
                                Teslimat Bilgileriniz
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad Soyad</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input 
                                            type="text" 
                                            defaultValue={user?.name || ''} 
                                            placeholder="Gonderilecek Kisi Adi" 
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon Numarasi</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input type="tel" placeholder="05XX XXX XX XX" className="pl-10" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Acik Adresiniz</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <textarea 
                                            placeholder="Il, Ilce, Mahalle, Sokak, Kapi No"
                                            className="w-full min-h-[80px] pl-10 pr-4 py-2.5 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                                    Devam Et
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setIsCheckoutOpen(false)}>
                                    Iptal
                                </Button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <Gift className="w-5 h-5 text-primary" />
                                Size Ozel Firsatlar
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Alisverisini guvence altina alip, yarina kapiniza getirmemiz icin ozel hizmetler sizin adiniza tanimlandi!
                            </p>

                            <div className="space-y-3 mb-6">
                                <div 
                                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                        extras.warranty ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'
                                    }`}
                                    onClick={() => handleExtra('warranty')}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                extras.warranty ? 'border-primary bg-primary' : 'border-gray-300'
                                            }`}>
                                                {extras.warranty && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold flex items-center gap-2">
                                                    <Shield className="w-4 h-4 text-primary" />
                                                    3 Yil Genisletilmis Ekstra Garanti
                                                </p>
                                                <p className="text-xs text-muted-foreground">Tum urunler icin kapsamli koruma</p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="font-bold">+149 TL</Badge>
                                    </div>
                                </div>

                                <div 
                                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                        extras.fast ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'
                                    }`}
                                    onClick={() => handleExtra('fast')}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                extras.fast ? 'border-primary bg-primary' : 'border-gray-300'
                                            }`}>
                                                {extras.fast && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold flex items-center gap-2">
                                                    <Zap className="w-4 h-4 text-yellow-500" />
                                                    SuperExpress Jet Teslimat
                                                </p>
                                                <p className="text-xs text-muted-foreground">Yarin elinizde!</p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="font-bold">+39 TL</Badge>
                                    </div>
                                </div>

                                <div 
                                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                        extras.pack ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'
                                    }`}
                                    onClick={() => handleExtra('pack')}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                extras.pack ? 'border-primary bg-primary' : 'border-gray-300'
                                            }`}>
                                                {extras.pack && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold flex items-center gap-2">
                                                    <Gift className="w-4 h-4 text-purple-500" />
                                                    Luks Jut Kumas Hediye Paketi
                                                </p>
                                                <p className="text-xs text-muted-foreground">Ozel ambalaj ve hediye notu</p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="font-bold">+25 TL</Badge>
                                    </div>
                                </div>
                            </div>

                            <Card className="mb-6 bg-gray-50">
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Sepetteki Urunler</span>
                                        <span className="font-medium">{subtotal.toLocaleString('tr-TR')} TL</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-primary">
                                        <span>Ozel Hizmet Paketleri</span>
                                        <span className="font-medium">+ {extTotal} TL</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                        <span>Sepet Tutari</span>
                                        <span className="text-primary">{(subtotal + extTotal).toLocaleString('tr-TR')} TL</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex gap-3">
                                <Button onClick={() => { setStep(3); logAction('Adim 3: Kart Odemesine Gecildi'); }} className="flex-1 bg-dark hover:bg-dark/90">
                                    Kart Bilgilerini Gir
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button variant="outline" onClick={() => setStep(1)}>Geri Don</Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <form className="p-6" onSubmit={handleCreditCardSubmit}>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-primary" />
                                Guvenli Odeme
                            </h3>

                            <Card className="mb-6 bg-gray-50 border-2">
                                <CardContent className="p-4 space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Kart Uzerindeki Isim</label>
                                        <Input 
                                            type="text" 
                                            value={ccName} 
                                            onChange={e => setCcName(e.target.value)} 
                                            placeholder="ORNEK KISI" 
                                            className="uppercase"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Kart Numarasi</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input 
                                                type="text" 
                                                value={ccNum} 
                                                onChange={e => {
                                                    const val = e.target.value.replace(/\D/g, '');
                                                    const formatted = val.match(/.{1,4}/g)?.join(' ') || '';
                                                    setCcNum(formatted);
                                                }} 
                                                placeholder="XXXX XXXX XXXX XXXX" 
                                                maxLength={19}
                                                className="pl-10 font-mono"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Son Kullanma</label>
                                            <Input 
                                                type="text" 
                                                value={ccExpiry} 
                                                onChange={e => {
                                                    let val = e.target.value.replace(/\D/g, '');
                                                    if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                                                    setCcExpiry(val);
                                                }} 
                                                placeholder="AA/YY" 
                                                maxLength={5}
                                                className="font-mono"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">CVV</label>
                                            <Input 
                                                type="password" 
                                                value={ccCvv} 
                                                onChange={e => setCcCvv(e.target.value)} 
                                                placeholder="***" 
                                                maxLength={3}
                                                className="font-mono"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* DARK PATTERN: Sneak fee warning */}
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg mb-6">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-red-700 mb-1">SON DAKIKA ODEME UYARISI</p>
                                        <p className="text-sm text-red-600 leading-relaxed">
                                            TrendSepet altyapisinin guvenligi ve tasimacilik prosedurleri sebebiyle faturaniza su an
                                            <strong> {serviceFee.toFixed(2)} TL Sistem Operasyon Bedeli</strong> ve
                                            <strong> {insuranceFee.toFixed(2)} TL Zorunlu Kargo Sigortasi Primi</strong> yansitilmistir.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Card className="mb-6 bg-gray-50">
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Sepet + Ekstra Paketler</span>
                                        <span className="font-medium">{(subtotal + extTotal).toLocaleString('tr-TR')} TL</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-red-600">
                                        <span>Zorunlu Kesintiler</span>
                                        <span className="font-medium">+ {(serviceFee + insuranceFee).toFixed(2)} TL</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                        <span>Kredi Kartindan Cekilecek</span>
                                        <span className="text-primary">{finalTotal.toFixed(2)} TL</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex gap-3">
                                <Button type="submit" className="flex-1 h-12 bg-green-600 hover:bg-green-700 shadow-glow-success font-bold">
                                    <Lock className="w-4 h-4 mr-2" />
                                    SIPARISI ONAYLA
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setStep(2)}>Geri</Button>
                            </div>

                            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 256-bit SSL</span>
                                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> 3D Secure</span>
                                <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> PCI DSS</span>
                            </div>
                        </form>
                    )}

                    {step === 4 && (
                        <div className="p-8 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-2xl font-bold text-green-600 mb-2"
                            >
                                Odemeniz Alindi!
                            </motion.h2>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <p className="text-lg mb-4">
                                    Siparis Numaraniz: <span className="font-bold text-primary">TR-{(Math.random() * 1000000).toFixed(0)}</span>
                                </p>
                                <Card className="bg-green-50 border-green-200 mb-6">
                                    <CardContent className="p-4">
                                        <p className="text-green-700 text-sm leading-relaxed">
                                            Harika haber! Urununuz hazirlanip <strong>Kargo sirketine faturalandirildi.</strong>
                                            En kisa surede tarafiniza teslim edilmek uzere yola cikacaktir.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Button 
                                    onClick={() => { setIsCheckoutOpen(false); window.scrollTo(0, 0); }}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    Alisverise Geri Don
                                </Button>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const ProductDetailModal = () => {
    const { products, favorites, toggleFav, addToCart, detailProductId, setDetailProductId, logAction } = useAppContext();
    const [sec, setSec] = useState(120);

    useEffect(() => {
        let id;
        if (detailProductId) id = setInterval(() => setSec(s => (s < 0 ? 599 : s - 1)), 1000);
        return () => clearInterval(id);
    }, [detailProductId]);

    if (!detailProductId) return null;
    const p = products.find(x => x.id === detailProductId);
    if (!p) return null;

    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    const isFav = favorites.has(p.id);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) { setDetailProductId(null); logAction('Urun Detayi Disari Tiklanarak Kapatildi'); }
                }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[600] flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex items-center justify-between px-6 py-4 bg-dark-secondary text-white">
                        <h3 className="font-bold">Urun Incelemesi</h3>
                        <button 
                            onClick={() => { setDetailProductId(null); logAction('Urun Detayi Kapatildi'); }}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        <div>
                            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center text-8xl mb-4">
                                {p.emoji}
                            </div>
                            
                            {/* Countdown */}
                            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-xl mb-3">
                                <div className="p-2 rounded-full bg-red-100">
                                    <Clock className="w-4 h-4 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-red-600 font-medium">Firsat Fiyati</p>
                                    <p className="text-lg font-bold text-red-700 font-mono">{m}:{s}</p>
                                </div>
                                <span className="text-sm text-red-600">sonra iptal olacak!</span>
                            </div>

                            {p.stock <= 5 && (
                                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                                        <span className="text-sm font-semibold text-amber-700">
                                            Son {p.stock} adet stok kaldi!
                                        </span>
                                    </div>
                                    <Progress value={(p.stock / 20) * 100} className="h-2 bg-amber-100" />
                                </div>
                            )}

                            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                                <Eye className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-blue-700">
                                    Su an <strong>{p.viewers + 12}</strong> kisi inceledi
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                                {p.brand} - {p.category}
                            </p>
                            <h2 className="text-2xl font-bold text-foreground mb-3">{p.name}</h2>
                            
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{p.rating} Ozel Puan Belgesi</span>
                            </div>

                            <Badge variant="destructive" className="mb-4">SOK %{p.fakeDiscount} INDIRIM</Badge>

                            <Card className="mb-4 bg-gray-50">
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground line-through">
                                        {p.oldPrice.toLocaleString('tr-TR')} TL
                                    </p>
                                    <p className="text-3xl font-black text-primary">
                                        {p.price.toLocaleString('tr-TR')} TL
                                    </p>
                                    {p.packageNote && (
                                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                                            <Package className="w-4 h-4" />
                                            Uyari: {p.packageNote}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                Bu efsanevi <strong>{p.name}</strong> modeli, muhtesem yapisiyla her saniye deger kazaniyor.
                                Hemen tukenmeden bu kusursuz deneyimi siparis edin!
                            </p>

                            <div className="space-y-3">
                                <Button 
                                    onClick={() => { addToCart(p.id); setDetailProductId(null); }}
                                    className="w-full h-12 bg-primary hover:bg-primary/90 font-bold shadow-glow-primary"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Sepete Ekle
                                </Button>
                                <Button 
                                    onClick={() => toggleFav(p.id)}
                                    variant="outline"
                                    className={`w-full ${isFav ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
                                >
                                    <Heart className={`w-5 h-5 mr-2 ${isFav ? 'fill-current' : ''}`} />
                                    {isFav ? 'Favorilerden Cikar' : 'Favorilere Ekle'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
