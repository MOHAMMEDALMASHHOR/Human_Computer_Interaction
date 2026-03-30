import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  ShoppingBag,
  Gift,
  Sparkles,
  ChevronRight,
  Check,
  Shield,
  Zap,
  Star
} from 'lucide-react';

export const Auth = () => {
    const { login, register, setActivePage, logAction, showToast } = useAppContext();
    const [view, setView] = useState('login');
    const [showPassword, setShowPassword] = useState(false);

    // Registration form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [newsletter, setNewsletter] = useState(true);

    // Login form
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPwd, setLoginPwd] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(loginEmail, loginPwd);
            showToast('Giris Basarili, Yonlendiriliyorsunuz...');
            setActivePage('Profile');
        } catch (err) {
            logAction('Giris Basarisiz: ' + err.message, true);
            setErrorMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const submitRegister = async (e) => {
        e.preventDefault();
        if (pwd !== pwd2) {
            setErrorMsg('Sifreler eslesmyor, lutfen tekrar deneyin.');
            logAction('Kayit Basarisiz: Sifre Eslesmeme', true);
            return;
        }
        setIsLoading(true);
        try {
            await register(name, email, pwd);
            showToast('Musteri kaydiniz basariyla olusturuldu!');
            setActivePage('Profile');
        } catch (err) {
            logAction('Kayit Basarisiz: ' + err.message, true);
            setErrorMsg(err.message + ' (Sifreniz en az 8 hane, 1 Buyuk harf ve 1 Ozel Karakter [@$!%*?&] icermelidir)');
        } finally {
            setIsLoading(false);
        }
    };

    // Password strength calculation
    const getPasswordStrength = () => {
        if (!pwd) return 0;
        let strength = 0;
        if (pwd.length >= 8) strength += 25;
        if (/[A-Z]/.test(pwd)) strength += 25;
        if (/[0-9]/.test(pwd)) strength += 25;
        if (/[@$!%*?&]/.test(pwd)) strength += 25;
        return strength;
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl"
            >
                <AnimatePresence mode="wait">
                    {view === 'login' ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                        >
                            {/* Login Form */}
                            <div className="flex-1 p-8 md:p-12">
                                <div className="mb-8">
                                    <h1 className="text-3xl font-black text-foreground mb-2">
                                        Tekrar Hos Geldin!
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Alisverise kaldigin yerden devam etmek icin bilgilerini gir.
                                    </p>
                                </div>

                                {errorMsg && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg mb-6"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        <p className="text-sm text-red-700">{errorMsg}</p>
                                    </motion.div>
                                )}

                                <form onSubmit={submitLogin} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            E-Posta Adresiniz
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                type="email"
                                                value={loginEmail}
                                                onChange={e => setLoginEmail(e.target.value)}
                                                required
                                                placeholder="ornek@mail.com"
                                                className="pl-12 h-12"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Sifreniz
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                value={loginPwd}
                                                onChange={e => setLoginPwd(e.target.value)}
                                                required
                                                placeholder="********"
                                                className="pl-12 pr-12 h-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={(e) => { 
                                                e.preventDefault(); 
                                                showToast('Sifre yenileme sunucusu su an gecici olarak yanit vermiyor.'); 
                                                logAction('Sifremi Unuttum Baglantisina Tiklandi', true); 
                                            }}
                                            className="text-sm text-primary hover:underline font-semibold"
                                        >
                                            Sifremi Unuttum?
                                        </button>
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className="w-full h-12 bg-dark-secondary hover:bg-dark text-white font-bold"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Giris yapiliyor...' : 'Giris Yap'}
                                    </Button>
                                </form>
                            </div>

                            {/* CTA Panel */}
                            <div className="flex-1 bg-gradient-to-br from-primary to-primary/80 text-white p-8 md:p-12 flex flex-col justify-center items-center text-center">
                                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                                    <ShoppingBag className="w-10 h-10" />
                                </div>
                                <h2 className="text-2xl font-black mb-4">
                                    Daha Fazla Firsat mi Ariyorsun?
                                </h2>
                                <p className="text-white/80 mb-8 leading-relaxed">
                                    Uye olarak hemen %50&apos;ye varan efsane indirim kovalama sansini yakala. Binlerce urun seni bekliyor!
                                </p>
                                <Button
                                    onClick={() => { setView('register'); logAction('Kayit Ol Yonlendirmesine Tiklandi'); setErrorMsg(''); }}
                                    className="bg-white text-primary hover:bg-white/90 font-bold px-8"
                                    size="lg"
                                >
                                    YENI HESAP OLUSTUR
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto"
                        >
                            <div className="p-8 md:p-12">
                                <div className="text-center mb-8">
                                    <Badge className="mb-4 bg-green-100 text-green-700 border-0">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        VIP Uyelik
                                    </Badge>
                                    <h1 className="text-3xl font-black text-green-600 mb-2">
                                        VIP Musteri Olun
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Yeni bir dunya kesfetmek icin bilgilerinizi eksiksiz doldurun.
                                    </p>
                                </div>

                                {errorMsg && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg mb-6"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        <p className="text-sm text-red-700">{errorMsg}</p>
                                    </motion.div>
                                )}

                                <form onSubmit={submitRegister} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Ad Soyad
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                required
                                                placeholder="Ali Yilmaz"
                                                className="pl-12 h-12"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            E-Posta Adresi
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                                placeholder="ornek@posta.com"
                                                className="pl-12 h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Sifre Olusturun
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input
                                                    type="password"
                                                    value={pwd}
                                                    onChange={e => setPwd(e.target.value)}
                                                    required
                                                    placeholder="Guvenli Kilit"
                                                    className="pl-12 h-12"
                                                />
                                            </div>
                                            {/* DARK PATTERN: Fake Password Strength Meter */}
                                            {pwd.length > 0 && (
                                                <div className="mt-2">
                                                    <Progress value={passwordStrength} className="h-1.5" />
                                                    <p className={`text-xs mt-1 font-medium ${
                                                        passwordStrength < 50 ? 'text-red-500' : passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'
                                                    }`}>
                                                        {passwordStrength < 50 ? 'Cok Zayif Sifre' : passwordStrength < 75 ? 'Ortalama Guvenlik' : 'Guclu Sifre'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Sifre Dogrulama
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input
                                                    type="password"
                                                    value={pwd2}
                                                    onChange={e => setPwd2(e.target.value)}
                                                    required
                                                    placeholder="Tekrar Girin"
                                                    className="pl-12 h-12"
                                                />
                                            </div>
                                            {pwd2.length > 0 && (
                                                <div className="mt-2 flex items-center gap-1">
                                                    {pwd === pwd2 ? (
                                                        <>
                                                            <Check className="w-3 h-3 text-green-500" />
                                                            <span className="text-xs text-green-600">Sifreler eslesiyor</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <AlertCircle className="w-3 h-3 text-red-500" />
                                                            <span className="text-xs text-red-500">Sifreler eslesmiyor</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* UX DARK PATTERN: Forced newsletter styling */}
                                    <Card className="bg-green-50 border-green-200">
                                        <CardContent className="p-4">
                                            <label className="flex items-start gap-4 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={newsletter}
                                                    onChange={e => { 
                                                        setNewsletter(e.target.checked); 
                                                        logAction(e.target.checked ? 'Reklam Bulteni Onaylandi' : 'Reklam Bulteni Gizlice Reddedildi'); 
                                                    }}
                                                    className="w-5 h-5 rounded border-green-300 text-green-600 focus:ring-green-500 mt-0.5"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-green-800 flex items-center gap-2">
                                                        <Gift className="w-4 h-4" />
                                                        VIP Bildirim Izni
                                                    </p>
                                                    <p className="text-sm text-green-700 mt-1 leading-relaxed">
                                                        Indirimleri kacirmamam icin adima kampanya SMS&apos;leri, otomatik promosyon e-postalari gonderilmesini kabul ediyorum. Iletisim verilerimin ucuncu parti sirketlere satilmasina onay veriyorum.
                                                    </p>
                                                </div>
                                            </label>
                                        </CardContent>
                                    </Card>

                                    <Button 
                                        type="submit" 
                                        className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-glow-success"
                                        disabled={isLoading}
                                    >
                                        <Sparkles className="w-5 h-5 mr-2" />
                                        {isLoading ? 'Kayit yapiliyor...' : 'ANINDA KAYIT OL!'}
                                    </Button>

                                    <p className="text-center text-sm text-muted-foreground">
                                        Vazgectiniz mi?{' '}
                                        <button
                                            type="button"
                                            onClick={() => { setView('login'); logAction('Kayittan Girise Geri Donuldu'); setErrorMsg(''); }}
                                            className="text-muted-foreground hover:text-foreground underline"
                                        >
                                            Giris ekranina donun.
                                        </button>
                                    </p>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
