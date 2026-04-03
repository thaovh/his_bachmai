'use client';

import React from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Box, 
  Loader2,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSnomedChildren, useSnomedAncestors } from '@/hooks/use-snomed';
import { useSnomedStore } from '@/hooks/use-snomed-store';

interface TreeNodeProps {
  conceptId: string;
  term: string;
  level: number;
}

const TreeNode = ({ conceptId, term, level }: TreeNodeProps) => {
  const { expandedNodes, toggleNode, selectedConcept, setSelectedConcept } = useSnomedStore();
  const isExpanded = expandedNodes.has(conceptId);
  const isSelected = selectedConcept?.conceptId === conceptId;
  
  const { data: children, isLoading } = useSnomedChildren(conceptId);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNode(conceptId);
  };

  const handleSelect = () => {
    setSelectedConcept({ conceptId, fsn: { term, lang: 'en' }, pt: { term, lang: 'en' } } as any);
  };

  // Tách term và semantic tag (ví dụ: "Heart failure (disorder)")
  const displayTerm = term.replace(/\s\([^)]+\)$/, '');
  const semanticTag = term.match(/\s\(([^)]+)\)$/)?.[1];

  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          "group flex items-center gap-1.5 py-1.5 px-2 rounded-lg cursor-pointer transition-all duration-200 text-xs relative",
          isSelected 
            ? "bg-primary text-primary-foreground font-semibold shadow-sm z-10" 
            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
        )}
        style={{ marginLeft: `${level * 12}px` }}
        onClick={handleSelect}
      >
        {/* Kết nối cấp bậc (Đường kẻ dọc) */}
        {level > 0 && (
          <div className="absolute left-[-6px] top-[-10px] bottom-1/2 w-px bg-slate-200 dark:border-slate-800" />
        )}
        
        <button 
          onClick={handleToggle}
          className={cn(
            "p-0.5 rounded transition-colors z-20",
            isSelected ? "hover:bg-white/20" : "hover:bg-slate-200 dark:hover:bg-slate-700"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : children && children.length > 0 ? (
            isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <div className="w-3.5" />
          )}
        </button>

        <Box className={cn(
          "h-3.5 w-3.5 shrink-0 transition-opacity", 
          isSelected ? "opacity-100" : "opacity-40 group-hover:opacity-100"
        )} />

        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="truncate">{displayTerm}</span>
          {semanticTag && (
            <span className={cn(
              "text-[10px] px-1 rounded-sm shrink-0",
              isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-muted-foreground"
            )}>
              {semanticTag}
            </span>
          )}
        </div>
      </div>

      {isExpanded && children && children.length > 0 && (
        <div className="flex flex-col relative">
          {/* Đường kẻ dọc cho cấp con */}
          <div 
            className="absolute bg-slate-200 dark:bg-slate-800 w-px top-0 bottom-3" 
            style={{ left: `${(level * 12) + 14}px` }}
          />
          {children.map((child) => (
            <TreeNode 
              key={child.conceptId} 
              conceptId={child.conceptId} 
              term={child.fsn.term} 
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function SnomedHierarchy() {
  const { selectedConcept, expandNodes } = useSnomedStore();
  const { data: ancestors } = useSnomedAncestors(selectedConcept?.conceptId || "");

  // Tự động mở rộng các nhánh cha khi chọn một concept
  React.useEffect(() => {
    if (ancestors && ancestors.length > 0) {
      const ancestorIds = ancestors.map(a => a.conceptId);
      expandNodes(ancestorIds);
      
      // Bonus: Đảm bảo node hiện tại cũng được thêm vào nếu cần (thường sẽ mở cha của nó)
      if (selectedConcept) {
        expandNodes([selectedConcept.conceptId]);
      }
    }
  }, [ancestors, expandNodes, selectedConcept]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-h-0 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 font-semibold shrink-0">
        <GitBranch className="h-4 w-4 text-primary" />
        Phân cấp SNOMED CT
      </div>
      <div className="flex-1 overflow-y-auto p-2 min-h-0 custom-scrollbar">
        <div className="space-y-1 pb-20">
          {/* Root node: SNOMED CT Concept */}
          <TreeNode conceptId="138875005" term="SNOMED CT Concept" level={0} />
        </div>
      </div>
    </div>
  );
}
