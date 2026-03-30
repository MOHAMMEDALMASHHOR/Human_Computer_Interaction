import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Activity,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MousePointer2,
  Trash2,
  Terminal,
  Eye,
  Database,
  ChevronDown,
  ChevronUp,
  Keyboard,
  Target,
  Timer,
  BarChart3,
  XCircle
} from 'lucide-react';

const taskDescriptions = [
    "Beyaz spor ayakkabi arayin (arama cubugun veya kategoriyi kullanarak) ve bir tanesini sepete ekleyin.",
    "Sepetinizdeki tum urunlerin toplam fiyatini bulun ve not edin.",
    "Odeme islemini baslatin ve sadece ilerleme butonlarina tiklayarak son adima kadar gidin.",
    "Sayfa yuklendiginde gelen cerez bildirimini bulun ve cerezleri reddedin / sadece zorunlu cerezleri secin.",
    "Herhangi bir urun kartindaki kalp ikonuna tiklayarak urunu favorilere ekleyin."
];

export const ObserverPanel = () => {
    const [visible, setVisible] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const { actionLogs, logAction, currentTask, startTask, completeTask, taskReports } = useAppContext();
    const [selectedTaskIdx, setSelectedTaskIdx] = useState('0');

    useEffect(() => {
        const handleKey = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't') {
                setVisible(v => !v);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    // Timer rendering hook
    const [elapsed, setElapsed] = useState(0);
    useEffect(() => {
        let t;
        if (currentTask.startTime) {
            t = setInterval(() => {
                setElapsed(Math.floor((Date.now() - currentTask.startTime) / 1000));
            }, 1000);
        } else {
            setElapsed(0);
        }
        return () => clearInterval(t);
    }, [currentTask.startTime]);

    if (!visible) return null;

    const errorLogs = actionLogs.filter(l => l.type === 'ERROR').length;
    const infoLogs = actionLogs.filter(l => l.type === 'INFO').length;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                className="fixed bottom-4 left-4 z-[800] w-[420px]"
            >
                <Card className="bg-[#0a0a0f] border-primary/30 shadow-2xl shadow-primary/10 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                <Terminal className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">UX Observer Panel</h4>
                                <p className="text-[10px] text-white/70">CTRL+SHIFT+T</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-white/20 text-white text-[10px] border-0">
                                v2.0
                            </Badge>
                            <button
                                onClick={() => setMinimized(!minimized)}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                {minimized ? (
                                    <ChevronUp className="w-4 h-4 text-white" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-white" />
                                )}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {!minimized && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                            >
                                <CardContent className="p-4 space-y-4">
                                    {/* Task Selector */}
                                    <div>
                                        <label className="block text-[10px] text-primary uppercase tracking-wider font-bold mb-2">
                                            Sistem Gorevi Seciniz
                                        </label>
                                        <Select value={selectedTaskIdx} onValueChange={setSelectedTaskIdx}>
                                            <SelectTrigger className="bg-[#12121a] border-white/10 text-white text-sm">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#12121a] border-white/10">
                                                <SelectItem value="0" className="text-gray-300">Gorev 1: Beyaz Spor Ayakkabi Bul</SelectItem>
                                                <SelectItem value="1" className="text-gray-300">Gorev 2: Toplam Fiyat Kontrolu</SelectItem>
                                                <SelectItem value="2" className="text-gray-300">Gorev 3: Odeme Surecini Incele</SelectItem>
                                                <SelectItem value="3" className="text-gray-300">Gorev 4: Cerezleri Kapatma</SelectItem>
                                                <SelectItem value="4" className="text-gray-300">Gorev 5: Favorilere Ekleme</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Task Description */}
                                    <div className="p-3 bg-[#12121a] rounded-xl border-l-4 border-primary">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Target className="w-4 h-4 text-primary" />
                                            <span className="text-[10px] text-primary uppercase tracking-wider font-bold">
                                                Gorev {Number(selectedTaskIdx) + 1} Hedefi
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            {taskDescriptions[Number(selectedTaskIdx)]}
                                        </p>
                                    </div>

                                    {/* Task Controls */}
                                    <div className="p-3 bg-[#12121a] rounded-xl border border-white/5">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold text-white flex items-center gap-2">
                                                <Timer className="w-4 h-4" />
                                                GOREV TAKIBI
                                            </span>
                                            {currentTask.startTime && (
                                                <Badge className="bg-primary/20 text-primary border-0 font-mono">
                                                    {elapsed}s
                                                </Badge>
                                            )}
                                        </div>

                                        {!currentTask.startTime ? (
                                            <Button
                                                onClick={() => startTask(Number(selectedTaskIdx))}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                GOREVI BASLAT
                                            </Button>
                                        ) : (
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="p-3 bg-[#1a1a24] rounded-lg text-center">
                                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Hatalar</div>
                                                        <div className={`text-xl font-bold ${currentTask.errors > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                                                            {currentTask.errors}
                                                        </div>
                                                    </div>
                                                    <div className="p-3 bg-[#1a1a24] rounded-lg text-center">
                                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Tiklamalar</div>
                                                        <div className="text-xl font-bold text-white">
                                                            {actionLogs.length}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={completeTask}
                                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                                    GOREVI TAMAMLA VE KAYDET
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Logs */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold flex items-center gap-2">
                                                <Database className="w-3 h-3" />
                                                CANLI KULLANICI LOGLARI
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-[9px] border-gray-700 text-gray-400">
                                                    {infoLogs} info
                                                </Badge>
                                                <Badge variant="outline" className="text-[9px] border-red-700 text-red-400">
                                                    {errorLogs} error
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="bg-[#12121a] rounded-xl max-h-[180px] overflow-y-auto scrollbar-hide">
                                            {actionLogs.length === 0 ? (
                                                <div className="p-4 text-center text-gray-600 text-xs">
                                                    <Activity className="w-6 h-6 mx-auto mb-2 opacity-50" />
                                                    Henuz aktivite yok.
                                                </div>
                                            ) : (
                                                <div className="divide-y divide-white/5">
                                                    {actionLogs.slice(0, 20).map((log, idx) => (
                                                        <div 
                                                            key={idx} 
                                                            className={`px-3 py-2 text-xs flex items-start gap-2 ${
                                                                log.type === 'ERROR' ? 'bg-red-500/5' : ''
                                                            }`}
                                                        >
                                                            {log.type === 'ERROR' ? (
                                                                <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                                                            ) : (
                                                                <MousePointer2 className="w-3 h-3 text-gray-500 flex-shrink-0 mt-0.5" />
                                                            )}
                                                            <div className="flex-1 min-w-0">
                                                                <span className={`${log.type === 'ERROR' ? 'text-red-400' : 'text-gray-400'} break-words`}>
                                                                    {log.desc}
                                                                </span>
                                                            </div>
                                                            <span className="text-gray-600 text-[10px] flex-shrink-0">
                                                                {log.time}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Task Reports */}
                                    {Object.keys(taskReports).length > 0 && (
                                        <div>
                                            <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
                                                <BarChart3 className="w-3 h-3" />
                                                KAYDEDILEN GOREV SONUCLARI
                                            </label>
                                            <div className="space-y-2">
                                                {Object.entries(taskReports).map(([id, rep]) => (
                                                    <div 
                                                        key={id} 
                                                        className="flex items-center justify-between p-2 bg-[#12121a] rounded-lg border border-green-500/20"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                            <span className="text-sm font-medium text-white">
                                                                Gorev {Number(id) + 1}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-xs">
                                                            <span className="text-gray-400 flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {rep.duration}s
                                                            </span>
                                                            <span className={`flex items-center gap-1 ${rep.errors > 0 ? 'text-red-400' : 'text-gray-500'}`}>
                                                                <AlertTriangle className="w-3 h-3" />
                                                                {rep.errors}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => { localStorage.clear(); window.location.reload(); }}
                                            className="flex-1 bg-transparent border-gray-700 text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Tum Verileri Sil
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setVisible(false)}
                                            className="bg-transparent border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Keyboard Shortcut */}
                                    <div className="text-center">
                                        <span className="text-[10px] text-gray-600 flex items-center justify-center gap-1">
                                            <Keyboard className="w-3 h-3" />
                                            CTRL+SHIFT+T ile ac/kapat
                                        </span>
                                    </div>
                                </CardContent>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
};
