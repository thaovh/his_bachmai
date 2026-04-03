'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ArrowRight,
  Loader2,
  Database,
  LayoutGrid,
  Menu,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSnomedSearch, useSnomedChildren, useSnomedParents } from '@/hooks/use-snomed';
import { useDebounce } from '@/hooks/use-debounce';
import { useSnomedStore } from '@/hooks/use-snomed-store';
import { SnomedHierarchy } from '@/components/snomed/hierarchy-tree';
import { SnomedDetailPane } from '@/components/snomed/detail-pane';
import { cn } from '@/lib/utils';

export default function SnomedPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedTerm = useDebounce(searchTerm, 500);
  const { selectedConcept, setSelectedConcept } = useSnomedStore();
  const [translationFilter, setTranslationFilter] = useState('all');

  const { data: searchResults, isLoading: isSearching } = useSnomedSearch(debouncedTerm);
  const { data: childrenResults, isLoading: isFetchingChildren } = useSnomedChildren(
    !debouncedTerm && selectedConcept ? selectedConcept.conceptId : ''
  );
  const { data: parentResults } = useSnomedParents(
    !debouncedTerm && selectedConcept ? selectedConcept.conceptId : ''
  );
  const [showLeafToast, setShowLeafToast] = useState(false);
  const [displayedChildren, setDisplayedChildren] = useState<any[]>([]);

  const displayData = debouncedTerm ? searchResults?.items : displayedChildren;
  const totalCount = debouncedTerm ? searchResults?.total : (displayedChildren?.length || 0);
  const isLoading = isSearching || isFetchingChildren;

  // Hiển thị Snackbar và giữ nguyên danh sách khi gặp nút lá
  useEffect(() => {
    if (!isLoading && !debouncedTerm && selectedConcept && childrenResults) {
      if (childrenResults.length > 0) {
        setDisplayedChildren(childrenResults);
        setShowLeafToast(false);
      } else {
        // Nút lá: Giữ nguyên displayedChildren cũ, hiện Snackbar
        setShowLeafToast(true);
        const timer = setTimeout(() => setShowLeafToast(false), 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, debouncedTerm, selectedConcept, childrenResults]);

  // Reset danh sách hiển thị khi xóa tìm kiếm mà không có selection
  useEffect(() => {
    if (!debouncedTerm && !selectedConcept) {
      setDisplayedChildren([]);
    }
  }, [debouncedTerm, selectedConcept]);

  // Auto-select first result if matching exactly (optional)
  useEffect(() => {
    if (debouncedTerm && searchResults?.items.length === 1 && !selectedConcept) {
      setSelectedConcept(searchResults.items[0]);
    }
  }, [debouncedTerm, searchResults, selectedConcept, setSelectedConcept]);

  return (
    <div className="flex h-[calc(100vh-8rem)] -m-6 bg-slate-50 dark:bg-slate-950 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl relative">
      
      {/* SNACKBAR THÔNG BÁO GÓC TRÊN BÊN TRÁI */}
      {showLeafToast && (
        <div className="absolute top-4 left-4 z-[100] animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="bg-slate-900/95 dark:bg-primary/95 backdrop-blur text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-white/10 min-w-[320px]">
             <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 animate-pulse">
                <LayoutGrid className="h-5 w-5" />
             </div>
             <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-60">SNOMED CT Notification</p>
                <p className="text-sm font-medium">Thuật ngữ chi tiết nhất (Leaf Node)</p>
             </div>
             <button 
                onClick={() => setShowLeafToast(false)}
                className="ml-auto p-1.5 hover:bg-white/10 rounded-full transition-colors"
             >
                <Menu className="h-4 w-4 rotate-45" />
             </button>
          </div>
        </div>
      )}

      {/* 1. LEFT PANE: Hierarchy Tree (20%) */}
      <div className="w-[20%] min-w-[250px] hidden md:block h-full flex flex-col min-h-0 overflow-hidden border-r border-slate-200 dark:border-slate-800">
        <SnomedHierarchy />
      </div>

      {/* 2. MIDDLE PANE: Search & List (45%) */}
      <div className="flex-1 flex flex-col min-w-[400px] h-full min-h-0 overflow-hidden bg-white dark:bg-slate-900 shadow-sm z-0">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" /> {debouncedTerm ? 'Kết quả tìm kiếm' : 'Danh sách thuật ngữ'}
            </h2>
            <div className="flex items-center gap-2">
               <span className="text-xs font-medium text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">BRANCH: MAIN</span>
            </div>
          </div>

          {!debouncedTerm && selectedConcept && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground overflow-hidden whitespace-nowrap">
              <span className="opacity-50">SNOMED CT</span>
              <ArrowRight className="h-2 w-2 opacity-30" />
              {parentResults && parentResults.length > 0 && (
                <>
                   <button 
                    onClick={() => setSelectedConcept(parentResults[0])}
                    className="hover:text-primary transition-colors hover:underline truncate max-w-[100px]"
                   >
                    {parentResults[0].fsn.term}
                   </button>
                   <ArrowRight className="h-2 w-2 opacity-30" />
                </>
              )}
              <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{selectedConcept.fsn.term}</span>
            </div>
          )}
          
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Tìm mã hoặc tên thuật ngữ..." 
                className="pl-10 border-primary/10 focus-visible:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-primary/10">
                  <Filter className="h-4 w-4" />
                  {translationFilter === 'all' ? 'Tất cả' : translationFilter === 'untranslated' ? 'Chưa dịch' : 'Đã dịch'}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                 <DropdownMenuItem onClick={() => setTranslationFilter('all')}>Tất cả trạng thái</DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setTranslationFilter('untranslated')}>Chưa dịch (Vietnamese)</DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setTranslationFilter('translated')}>Đã dịch (Vietnamese)</DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setTranslationFilter('pending')}>Cần kiểm tra</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50 mb-4" />
              <p className="text-sm text-muted-foreground italic">Đang tải dữ liệu từ Snowstorm...</p>
            </div>
          )}

          {!isLoading && !debouncedTerm && !selectedConcept && (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full opacity-30">
              <Database className="h-12 w-12 mb-4" />
              <p>Chọn một nhánh bên trái hoặc tìm kiếm để bắt đầu.</p>
            </div>
          )}

          {!isLoading && debouncedTerm && debouncedTerm.length >= 3 && displayData?.length === 0 && (
             <div className="flex flex-col items-center justify-center p-12 text-center h-full text-muted-foreground italic">
                <p>Không tìm thấy kết quả nào cho "{debouncedTerm}".</p>
             </div>
          )}

          {!isLoading && !debouncedTerm && selectedConcept && displayData?.length === 0 && (
             <div className="h-full flex items-center justify-center text-center p-12 text-muted-foreground/40 italic">
                <div className="flex flex-col items-center gap-2">
                   <LayoutGrid className="h-8 w-8 opacity-20" />
                   <p className="text-sm">Không có thuật ngữ con.</p>
                </div>
             </div>
          )}

          {displayData && displayData.length > 0 && (
            <div className="flex flex-col">
              {/* Header cho thuật ngữ hiện tại - Tách biệt khỏi bảng */}
              {!debouncedTerm && selectedConcept && (
                <div className="bg-primary/5 border-b border-primary/20 p-3 flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <LayoutGrid className="h-4 w-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Đang xem nhánh</span>
                        <span className="font-mono text-[10px] bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-primary/20 text-primary">
                          {selectedConcept.conceptId}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate">{selectedConcept.fsn.term}</h3>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:bg-primary/10" onClick={() => setSelectedConcept(selectedConcept)}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <Table>
                <TableHeader className="sticky top-0 bg-white dark:bg-slate-900 border-b shadow-sm z-10">
                  <TableRow>
                    <TableHead className="w-[120px] text-xs uppercase font-bold text-primary">SCTID</TableHead>
                    <TableHead className="text-xs uppercase font-bold text-primary">FSN Term</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((item) => (
                    <TableRow 
                      key={item.conceptId} 
                      className={cn(
                        "group cursor-pointer transition-colors border-l-2",
                        selectedConcept?.conceptId === item.conceptId && debouncedTerm
                          ? "bg-primary/5 border-l-primary" 
                          : "hover:bg-primary/5 hover:border-l-primary/30 border-l-transparent"
                      )}
                      onClick={() => setSelectedConcept(item)}
                    >
                      <TableCell className="font-mono text-xs">{item.conceptId}</TableCell>
                      <TableCell className="max-w-[150px] truncate">
                         <p className="font-bold text-sm truncate">{item.fsn.term}</p>
                         <p className="text-[10px] text-muted-foreground italic flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            PT: {item.pt.term}
                         </p>
                      </TableCell>
                      <TableCell>
                        <ArrowRight className={cn(
                          "h-4 w-4 transition-all",
                          selectedConcept?.conceptId === item.conceptId ? "translate-x-0 opacity-100 text-primary" : "translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                        )} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        
        {displayData && displayData.length > 0 && (
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-[10px] text-muted-foreground flex justify-between">
            <span>Hiển thị {displayData.length} {debouncedTerm ? `của ${totalCount?.toLocaleString()}` : ''} kết quả</span>
            <span className="font-bold">Next.js Snowstorm Proxy v1.2</span>
          </div>
        )}
      </div>

      {/* 3. RIGHT PANE: Details & Translation (35%) */}
      <div className="w-[35%] min-w-[350px] hidden lg:block h-full flex flex-col min-h-0 overflow-hidden border-l border-slate-200 dark:border-slate-800">
        <SnomedDetailPane />
      </div>
      
    </div>
  );
}
