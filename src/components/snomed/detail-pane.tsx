'use client';

import React from 'react';
import { 
  Info, 
  Plus, 
  Save, 
  Languages, 
  ArrowLeft,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSnomedStore } from '@/hooks/use-snomed-store';
import { useSnomedConcept } from '@/hooks/use-snomed';
import { useAiTranslate } from '@/hooks/use-ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SnomedDetailPane() {
  const { selectedConcept, isEditing, setIsEditing } = useSnomedStore();
  const { data: fullConcept, isLoading } = useSnomedConcept(selectedConcept?.conceptId || '');
  const { data: aiResponse, isLoading: isAiLoading } = useAiTranslate(selectedConcept?.fsn.term || '');
  
  const [vnTerm, setVnTerm] = React.useState('');
  const [vnType, setVnType] = React.useState('synonym');
  const [vnPriority, setVnPriority] = React.useState('preferred');

  // Reset form when concept changes
  React.useEffect(() => {
    setVnTerm('');
  }, [selectedConcept?.conceptId]);

  const handleUseAiSuggestion = () => {
    if (aiResponse?.translation) {
      // Tách phần tên và phần giải thích (định dạng: [Tên] - [Giải thích])
      const parts = aiResponse.translation.split(' - ');
      setVnTerm(parts[0]);
      setIsEditing(true);
    }
  };

  if (!selectedConcept) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground opacity-50 space-y-4">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 shadow-inner">
           <Info className="h-10 w-10 text-slate-400" />
        </div>
        <div className="space-y-2">
           <p className="font-semibold text-slate-600 dark:text-slate-400">Chưa có dữ liệu</p>
           <p className="text-xs">Chọn một thuật ngữ để xem chi tiết và thêm bản dịch.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 min-h-0 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10 shadow-sm transition-colors shrink-0">
        <div className="flex items-center gap-2 font-semibold">
          <Languages className="h-4 w-4 text-primary" />
          Chi tiết & Dịch thuật
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)} className={cn("transition-all", isEditing ? "text-primary bg-primary/5" : "hover:bg-slate-100 dark:hover:bg-slate-800")}>
          {isEditing ? <ArrowLeft className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {isEditing ? "Hủy" : "Dịch Việt"}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-0 min-h-0 custom-scrollbar">
        <div className="p-6 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
          {/* Concept Header */}
          <div className="space-y-3 relative group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black bg-primary/10 text-primary px-2 py-1 rounded-sm border border-primary/20">
                SCTID: {selectedConcept.conceptId}
              </span>
              <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-sm border border-emerald-500/20">
                <CheckCircle2 className="h-3 w-3" /> ACTIVE
              </span>
            </div>
            <div>
               <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                  {fullConcept?.fsn?.term || selectedConcept.fsn.term}
               </h2>
               <p className="text-sm text-muted-foreground italic mt-1.5 opacity-80">
                  {fullConcept?.pt?.term || selectedConcept.pt.term}
               </p>
            </div>
          </div>

          <Separator className="bg-primary/5" />

          {/* AI Suggestion Section */}
          {!isEditing && (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/[0.03] to-transparent shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Languages className="h-12 w-12 text-primary" />
               </div>
               <CardHeader className="pb-3 px-4 pt-4">
                  <div className="flex items-center justify-between">
                     <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
                        <CheckCircle2 className="h-4 w-4 animate-pulse" /> AI Trợ lý Gợi ý (Gemma)
                     </CardTitle>
                     {isAiLoading && <Loader2 className="h-3 w-3 animate-spin text-primary" />}
                  </div>
               </CardHeader>
               <CardContent className="px-4 pb-4">
                  {isAiLoading ? (
                    <div className="flex items-center gap-3 py-2">
                       <Loader2 className="h-4 w-4 animate-spin text-primary" />
                       <span className="text-sm text-muted-foreground italic">Đang suy luận...</span>
                    </div>
                  ) : aiResponse?.translation ? (
                    <div className="space-y-3">
                       <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-primary/10 shadow-sm">
                          <p className="text-sm leading-relaxed font-medium">
                             {aiResponse.translation}
                          </p>
                       </div>
                       <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full h-8 text-[11px] font-bold gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all group"
                          onClick={handleUseAiSuggestion}
                       >
                          <Save className="h-3 w-3 transition-transform group-hover:scale-110" /> Sử dụng bản dịch này
                       </Button>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">Không thể kết nối máy chủ AI để lấy gợi ý.</p>
                  )}
               </CardContent>
            </Card>
          )}

          {/* Translation Form or Display */}
          {isEditing ? (
            <Card className="border-primary/20 shadow-xl ring-1 ring-primary/5">
              <CardHeader className="pb-2 bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-md font-bold">Thêm bản dịch Tiếng Việt</CardTitle>
                <CardDescription className="text-xs">Chỉnh sửa kết quả từ AI hoặc tự nhập liệu.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">Tên tiếng Việt</label>
                  <Input 
                    placeholder="ví dụ: Nhồi máu cơ tim" 
                    className="border-primary/20 focus-visible:ring-primary/20 h-10 font-bold" 
                    value={vnTerm}
                    onChange={(e) => setVnTerm(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">Loại (Type)</label>
                    <Select value={vnType} onValueChange={(val) => setVnType(val ?? 'synonym')}>
                      <SelectTrigger className="border-primary/20 h-9 text-xs">
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fsn">FSN</SelectItem>
                        <SelectItem value="synonym">Synonym</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">Độ ưu tiên</label>
                    <Select value={vnPriority} onValueChange={(val) => setVnPriority(val ?? 'preferred')}>
                      <SelectTrigger className="border-primary/20 h-9 text-xs">
                        <SelectValue placeholder="Độ ưu tiên" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preferred">Preferred</SelectItem>
                        <SelectItem value="acceptable">Acceptable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary-soft" onClick={() => setIsEditing(false)}>
                    <Save className="h-4 w-4" /> Lưu bản dịch
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Translations Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Languages className="h-4 w-4 opacity-50" /> Bản dịch hiện có
                </h3>
                <div className="p-4 rounded-xl border border-dashed border-primary/20 bg-primary/5 text-center space-y-2">
                   <AlertTriangle className="h-6 w-6 text-amber-500 mx-auto opacity-50" />
                   <p className="text-sm text-muted-foreground italic">Chưa có bản dịch tiếng Việt cho thuật ngữ này.</p>
                </div>
              </div>

               {/* semantic tags etc. */}
               <div className="space-y-4 pt-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Info className="h-4 w-4 opacity-50" /> Metadata
                </h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Module ID</p>
                      <p className="text-xs font-mono truncate">{selectedConcept.moduleId || '900000000000207008'}</p>
                   </div>
                   <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Status</p>
                      <p className="text-xs font-medium">Fully Defined</p>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

       {/* Quick Footer Action */}
       <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center shrink-0">
          <Button variant="link" className="text-xs text-muted-foreground hover:text-primary">Xem chi tiết trên SNOMED International Browser</Button>
       </div>
    </div>
  );
}
