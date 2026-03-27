'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Opportunity, OpportunityStage, OPPORTUNITY_STAGES } from '@/types/opportunity';
import { OpportunityCard } from './opportunity-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KanbanColumn {
  stage: OpportunityStage;
  label: string;
  color: string;
  opportunities: Opportunity[];
}

interface OpportunityKanbanProps {
  opportunities: Opportunity[];
  onStageChange?: (opportunityId: string, newStage: OpportunityStage) => void;
  onEdit?: (opportunity: Opportunity) => void;
  onAdd?: () => void;
}

export function OpportunityKanban({ opportunities, onStageChange, onEdit, onAdd }: OpportunityKanbanProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const columns: KanbanColumn[] = OPPORTUNITY_STAGES.map(stageConfig => ({
    stage: stageConfig.value,
    label: stageConfig.label,
    color: stageConfig.color,
    opportunities: opportunities.filter(opp => opp.stage === stageConfig.value)
  }));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeOpportunity = opportunities.find(opp => opp.id === active.id);
    if (!activeOpportunity) return;

    const overStage = over.data.current?.stage as OpportunityStage;
    if (overStage && activeOpportunity.stage !== overStage) {
      onStageChange?.(activeOpportunity.id, overStage);
    }
  };

  const getStageTotal = (stageOpportunities: Opportunity[]) => {
    return stageOpportunities.reduce((sum, opp) => sum + opp.amount, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const activeOpportunity = activeId ? opportunities.find(opp => opp.id === activeId) : null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {columns.map(column => (
          <div
            key={column.stage}
            className="flex-shrink-0 w-80"
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{column.label}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {column.opportunities.length}
                  </Badge>
                </div>
                {column.opportunities.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(getStageTotal(column.opportunities))}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <SortableContext
                  items={column.opportunities.map(opp => opp.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div
                    className="space-y-3 min-h-[200px]"
                    data-stage={column.stage}
                  >
                    {column.opportunities.map(opportunity => (
                      <OpportunityCard
                        key={opportunity.id}
                        opportunity={opportunity}
                        onEdit={() => onEdit?.(opportunity)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </CardContent>
            </Card>
          </div>
        ))}

        {activeOpportunity && (
          <DragOverlay>
            <OpportunityCard opportunity={activeOpportunity} />
          </DragOverlay>
        )}
      </DndContext>

      <div className="flex-shrink-0 w-80">
        <Card className="h-full border-dashed">
          <CardContent className="flex items-center justify-center h-full min-h-[300px]">
            <Button
              variant="ghost"
              className="h-full w-full flex flex-col gap-2 text-muted-foreground hover:text-foreground"
              onClick={onAdd}
            >
              <Plus className="h-8 w-8" />
              <span>新建销售机会</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
