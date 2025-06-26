'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TimelineProps {
  timelineData: any[];
  fullView?: boolean;
}

export default function Timeline({ timelineData, fullView = false }: TimelineProps) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  
  // Get event type color
  const getEventColor = (type: string) => {
    const typeMap: Record<string, string> = {
      'ADH': 'bg-purple-500',
      'RER': 'bg-amber-500',
      'NBU': 'bg-green-500',
      'default': 'bg-gray-500'
    };
    
    return typeMap[type] || typeMap.default;
  };
  
  // Parse event data from JSON string
  const parseEventData = (label: string) => {
    try {
      return JSON.parse(label);
    } catch (e) {
      return { MovementType: 'unknown', EffectiveDate: '', Premium: '0.00' };
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  // Limit the number of events shown in non-full view
  const displayEvents = fullView ? timelineData : timelineData.slice(0, 3);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle>Contract Timeline</CardTitle>
        {!fullView && timelineData.length > 3 && (
          <Button variant="link" size="sm">
            View all ({timelineData.length})
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
          
          {/* Timeline events */}
          <div className="space-y-6">
            {displayEvents.map((event, index) => {
              const eventData = parseEventData(event.Label);
              const isExpanded = expandedItem === index;
              
              return (
                <div key={index} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${getEventColor(eventData.MovementType)}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  {/* Event content */}
                  <Card className="bg-muted/40">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium">{event.Description}</h3>
                          <p className="text-sm text-muted-foreground">{formatDate(eventData.EffectiveDate)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {eventData.Premium ? `R ${parseFloat(eventData.Premium).toFixed(2)}` : 'R 0.00'}
                          </p>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="h-auto p-0"
                            onClick={() => setExpandedItem(isExpanded ? null : index)}
                          >
                            {isExpanded ? 'Less details' : 'More details'}
                          </Button>
                        </div>
                      </div>
                      
                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Movement Type:</p>
                              <p className="font-medium">{eventData.MovementType}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Movement Date:</p>
                              <p className="font-medium">{formatDate(eventData.MovementDatetime)}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-muted-foreground">Movement Object:</p>
                              <p className="font-medium">{eventData.MovementObj}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 