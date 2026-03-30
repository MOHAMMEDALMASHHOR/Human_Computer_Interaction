import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Gift, Sparkles, PartyPopper, ChevronRight } from 'lucide-react';

export const PopupAd = () => {
    const [visible, setVisible] = useState(false);
    const { logAction } = useAppContext();

    useEffect(() => {
        // Pop up ad appears after 15 seconds randomly
        const t = setTimeout(() => {
            setVisible(true);
            logAction('Pop-up Reklam Goruntulendi');
        }, 15000);
        return () => clearTimeout(t);
    }, [logAction]);

    if (!visible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => { setVisible(false); logAction('Pop-up Kapatildi'); }}
                        className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* Confetti Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ 
                                    y: -20, 
                                    x: Math.random() * 400, 
                                    rotate: Math.random() * 360 
                                }}
                                animate={{ 
                                    y: 500,
                                    rotate: Math.random() * 720
                                }}
                                transition={{ 
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                                className={`absolute w-3 h-3 rounded-sm ${
                                    ['bg-primary', 'bg-yellow-400', 'bg-green-500', 'bg-blue-500', 'bg-pink-500'][Math.floor(Math.random() * 5)]
                                }`}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="relative p-8 text-center">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-primary flex items-center justify-center mx-auto mb-6 shadow-lg"
                        >
                            <PartyPopper className="w-10 h-10 text-white" />
                        </motion.div>

                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Ozel Teklif
                        </Badge>

                        <h2 className="text-2xl font-black text-primary mb-2">
                            TEBRIKLER!
                        </h2>
                        <p className="text-lg font-bold text-gray-900 mb-4">
                            Bu ayki <span className="text-primary">1,000. ziyaretcimiz</span> oldunuz!
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Surpriz hediye carkini cevirerek aninda{' '}
                            <span className="font-bold text-green-600">500 TL indirim</span>{' '}
                            kazanma sansi yakaladinniz!
                        </p>

                        {/* DARK PATTERN: Green button says claim, small faint text says disregard */}
                        <Button
                            onClick={() => { setVisible(false); logAction('Pop-up Hediyesine Tiklandi'); }}
                            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-glow-success mb-3"
                        >
                            <Gift className="w-5 h-5 mr-2" />
                            HEDIYEMI AL
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>

                        <button
                            onClick={() => { setVisible(false); logAction('Pop-up Reddedildi'); }}
                            className="text-[11px] text-gray-400 hover:text-gray-600 underline transition-colors"
                        >
                            hayir, firsatlari kacirmayi seviyorum
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
