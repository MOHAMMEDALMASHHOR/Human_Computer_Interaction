import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  User,
  Mail,
  LogOut,
  Trash2,
  Heart,
  ShoppingBag,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Settings,
  Shield,
  Bell,
  CreditCard,
  MapPin,
  ChevronRight,
  Activity,
  BarChart3,
  Timer
} from 'lucide-react';

export const Profile = () => {
    const { user, favorites, products, logout, setActivePage, taskReports, showToast, logAction } = useAppContext();
    const [deleteStep, setDeleteStep] = useState(0);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Card className="max-w-md mx-auto text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Giris Yapmaniz Gerekiyor</h2>
                    <p className="text-muted-foreground mb-4">Profil sayfasini gorebilmek icin lutfen giris yapin.</p>
                    <Button onClick={() => setActivePage('Auth')} className="bg-primary">
                        Giris Yap
                    </Button>
                </Card>
            </div>
        );
    }

    const userFavs = [...favorites].map(id => products.find(p => p.id === id)).filter(Boolean);

    const handleDeleteAccount = () => {
        logAction('Hesap Silme Dugmesine Tiklandi');
        if (deleteStep === 0) {
            setDeleteStep(1);
            setShowDeleteDialog(true);
        } else if (deleteStep === 1) {
            setDeleteStep(2);
        } else {
            // DARK PATTERN: Roach Motel - Fake server error
            logAction('Hesap Silme Hatasi - Sunucu Izni Yok', true);
            showToast('SISTEM HATASI 500: Lutfen hafta ici 09:00 - 17:00 arasi Musteri Hizmetlerini arayarak talep olusturunuz.');
            setDeleteStep(0);
            setShowDeleteDialog(false);
        }
    };

    const settingsLinks = [
        { icon: User, label: 'Kisisel Bilgiler', desc: 'Ad, soyad ve iletisim bilgileri' },
        { icon: MapPin, label: 'Adreslerim', desc: 'Teslimat ve fatura adresleri' },
        { icon: CreditCard, label: 'Odeme Yontemlerim', desc: 'Kayitli kartlar ve odeme secenekleri' },
        { icon: Bell, label: 'Bildirim Ayarlari', desc: 'E-posta ve SMS tercihleri' },
        { icon: Shield, label: 'Guvenlik', desc: 'Sifre ve iki faktorlu dogrulama' },
    ];

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/20">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Hos Geldiniz, {user.name}</h1>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {user.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            variant="outline" 
                            onClick={logout}
                            className="text-gray-600"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Cikis Yap
                        </Button>
                        {/* Roach Motel Pattern - Delete Account */}
                        <Button 
                            variant={deleteStep > 0 ? 'default' : 'outline'}
                            onClick={handleDeleteAccount}
                            className={deleteStep > 0 ? 'bg-primary hover:bg-primary/90' : 'text-red-500 border-red-200 hover:bg-red-50'}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {deleteStep === 0 ? 'Hesabimi Sil' : deleteStep === 1 ? 'Eminim, Sil' : 'ONAYLIYORUM SIL'}
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Favorites Section */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                                Favorileriniz
                                <Badge variant="secondary">{favorites.size}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {userFavs.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                        <Heart className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <p className="text-muted-foreground mb-4">Henuz favori urununuz yok.</p>
                                    <Button onClick={() => setActivePage('Shop')} variant="outline" size="sm">
                                        Alisverise Basla
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {userFavs.map((p) => (
                                        <motion.div
                                            key={p.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                                            onClick={() => setActivePage('Shop')}
                                        >
                                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                                                {p.emoji}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-foreground truncate">{p.name}</p>
                                                <p className="text-sm text-muted-foreground">{p.brand}</p>
                                            </div>
                                            <p className="text-lg font-bold text-primary">
                                                {p.price.toLocaleString('tr-TR')} TL
                                            </p>
                                        </motion.div>
                                    ))}
                                    <Button 
                                        onClick={() => setActivePage('Shop')} 
                                        variant="outline" 
                                        className="w-full mt-4"
                                    >
                                        <ShoppingBag className="w-4 h-4 mr-2" />
                                        Alisverise Devam Et
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* UX Test Results */}
                    <Card className="bg-dark-secondary text-white border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg text-white">
                                <Activity className="w-5 h-5 text-primary" />
                                UX Test Gorev Durumlari
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-gray-400 mb-4">
                                Yalnizca sizin tamamladiginiz gorevler listelenmektedir. Tum anonim loglar Observer Panel&apos;de yer alir.
                            </p>
                            {Object.keys(taskReports).length === 0 ? (
                                <div className="text-center py-6">
                                    <BarChart3 className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                                    <p className="text-sm text-gray-400">Hicbir test verisi bulunamadi.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {Object.entries(taskReports).map(([taskId, data]) => (
                                        <div 
                                            key={taskId} 
                                            className="p-3 bg-dark rounded-lg border-l-4 border-green-500"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-gray-400">
                                                    Gorev {Number(taskId) + 1} - {data.timestamp}
                                                </span>
                                                <Badge variant="success" className="bg-green-500/20 text-green-400 border-0">
                                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                                    Tamamlandi
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="flex items-center gap-1 text-gray-300">
                                                    <Timer className="w-4 h-4" />
                                                    {data.duration}s
                                                </span>
                                                <span className={`flex items-center gap-1 ${data.errors > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                                    <AlertTriangle className="w-4 h-4" />
                                                    {data.errors} Hata
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Settings Section */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Settings className="w-5 h-5 text-muted-foreground" />
                            Hesap Ayarlari
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {settingsLinks.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => showToast('Bu ozellik yakinda eklenecek.')}
                                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-foreground">{item.label}</p>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Delete Account Dialog - DARK PATTERN: Roach Motel */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            {deleteStep === 1 ? 'Hesabinizi Silmek Istediginize Emin Misiniz?' : 'Son Onay Gerekiyor'}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                            {deleteStep === 1 ? (
                                <>
                                    Bu islem geri alinamaz. Tum verileriniz, siparis gecmisiniz, favorileriniz ve kisisel bilgileriniz kalici olarak silinecektir.
                                </>
                            ) : (
                                <>
                                    <span className="font-bold text-red-600">DIKKAT:</span> Bu islem kesinlikle geri alinamaz. Hesabiniz ve tum iliskili veriler sistemden kalici olarak kaldirilacaktir.
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => { setDeleteStep(0); setShowDeleteDialog(false); }}>
                            Vazgec
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDeleteAccount}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {deleteStep === 1 ? 'Evet, Devam Et' : 'Kalici Olarak Sil'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
