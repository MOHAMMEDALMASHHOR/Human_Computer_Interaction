import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FlaskConical, 
  Github, 
  Linkedin, 
  GraduationCap, 
  AlertTriangle,
  Clock,
  DollarSign,
  Navigation,
  Package,
  ShoppingCart,
  Cookie,
  ExternalLink,
  User,
  BookOpen
} from 'lucide-react';

export const About = () => {
    const researchTopics = [
        { icon: Clock, label: 'Flash kampanya panikleri (Yapay Aciliyet)' },
        { icon: DollarSign, label: 'Gizli kargo ve hizmet ucretleri' },
        { icon: Navigation, label: 'Kafa karistirici navigasyon yonlendirmeleri' },
        { icon: Package, label: 'Paket bazli yaniltici fiyatlandirmalar' },
        { icon: ShoppingCart, label: 'Otomatik secili ek hizmetler (Sepete sizma)' },
        { icon: Cookie, label: 'Cerezlerde yonlendirici buton hiyerarsisi' },
    ];

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="overflow-hidden border-0 shadow-2xl">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                    <FlaskConical className="w-6 h-6" />
                                </div>
                                <div>
                                    <Badge className="bg-white/20 text-white border-0 mb-1">
                                        HCI Arastirma Projesi
                                    </Badge>
                                    <h1 className="text-3xl font-black">Hakkimizda</h1>
                                </div>
                            </div>
                        </div>

                        <CardContent className="p-8 space-y-8">
                            {/* Introduction */}
                            <div>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Bu uygulama siradan bir e-ticaret sitesi degildir; <strong className="text-foreground">Insan-Bilgisayar Etkilesimi (HCI)</strong> dersi kapsaminda
                                    kullanilabilirlik (usability) ve kullanici deneyimi (UX) testleri icin ozel olarak gelistirilmis bir
                                    <strong className="text-primary"> UX Arastirma Simulasyonudur</strong>. Proje icerisinde kullanici davranislarini manipule eden ve
                                    Dark Pattern (Karanlik Tasarim) olarak bilinen aldatici tasarim teknikleri bilincli olarak yerlestirilmistir.
                                </p>
                            </div>

                            {/* Project Owner */}
                            <Card className="bg-gray-50 border-l-4 border-l-primary">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <User className="w-5 h-5 text-primary" />
                                        <h3 className="text-lg font-bold text-foreground">Proje Sahibi</h3>
                                    </div>
                                    <p className="text-xl font-bold text-primary mb-4">
                                        MOHAMMED MASHHOR ALMASHHOR
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <a 
                                            href="https://github.com/MOHAMMEDALMASHHOR" 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold"
                                        >
                                            <Github className="w-4 h-4" />
                                            GitHub
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                        <a 
                                            href="https://www.linkedin.com/in/mohmammed-almashhor-668459258" 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#006699] transition-colors text-sm font-semibold"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            LinkedIn
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Academic Oversight */}
                            <Card className="bg-amber-50 border-amber-200">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <GraduationCap className="w-5 h-5 text-amber-600" />
                                        <h3 className="text-lg font-bold text-foreground">Akademik Gozetim</h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Bu proje, Insan-Bilgisayar Etkilesimi dersi kapsaminda hazirlanmistir ve
                                        <strong className="text-foreground"> Dr. Ogr. Aycan Pekpazar</strong> tarafindan denetlenmektedir.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Research Topics */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    <h3 className="text-lg font-bold text-foreground">Proje Ici Arastirma Konulari</h3>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {researchTopics.map((topic, idx) => {
                                        const Icon = topic.icon;
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Icon className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-sm text-muted-foreground">{topic.label}</span>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Warning */}
                            <Card className="bg-red-50 border-red-200">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-red-700">
                                            <strong>Uyari:</strong> Bu platform yalnizca akademik arastirma amaciyla olusturulmustur. 
                                            Gercek bir e-ticaret islemi yapilmamakta olup, girilen bilgiler kaydedilmemektedir.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
