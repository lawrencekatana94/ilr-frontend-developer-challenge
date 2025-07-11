'use client';

import { useState } from 'react';
import { 
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  TrendingUp,
  FileCheck,
  Activity,
  ArrowRight,
  Clock,
  CircleDollarSign,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineEvent {
  Type: string;
  TypeCode: string;
  TypeLabel: string;
  Heading: string;
  Label: string;
  Description: string;
  Start: string;
  End: string | null;
  CssStyling: string;
  ViewWob: string;
  ViewObj: string;
}

interface TimelineProps {
  timelineData: TimelineEvent[];
  fullView?: boolean;
}

export default function Timeline({ timelineData, fullView = false }: TimelineProps) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  // Get event color and gradient based on type
  const getEventStyle = (type: string) => {
    const styles = {
      'ADH': {
        bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
        icon: <FileText className="h-4 w-4 text-white" />,
        line: 'bg-gradient-to-b from-amber-500/50 to-amber-500/10',
        hover: 'group-hover:shadow-amber-500/25',
        text: 'text-amber-600 dark:text-amber-200',
        lightBg: 'bg-amber-50 dark:bg-amber-900'
      },
      'RER': {
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        icon: <TrendingUp className="h-4 w-4 text-white" />,
        line: 'bg-gradient-to-b from-blue-500/50 to-blue-500/10',
        hover: 'group-hover:shadow-blue-500/25',
        text: 'text-blue-600 dark:text-blue-200',
        lightBg: 'bg-blue-50 dark:bg-blue-900'
      },
      'NBU': {
        bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        icon: <FileCheck className="h-4 w-4 text-white" />,
        line: 'bg-gradient-to-b from-emerald-500/50 to-emerald-500/10',
        hover: 'group-hover:shadow-emerald-500/25',
        text: 'text-emerald-600 dark:text-emerald-200',
        lightBg: 'bg-emerald-50 dark:bg-emerald-900'
      },
      'default': {
        bg: 'bg-gradient-to-br from-gray-500 to-gray-600',
        icon: <Activity className="h-4 w-4 text-white" />,
        line: 'bg-gradient-to-b from-gray-500/50 to-gray-500/10',
        hover: 'group-hover:shadow-gray-500/25',
        text: 'text-gray-600 dark:text-gray-200',
        lightBg: 'bg-gray-50 dark:bg-gray-900'
      }
    };
    
    return styles[type as keyof typeof styles] || styles.default;
  };
  
  // Parse event data from JSON string
  const parseEventData = (label: string) => {
    try {
      return JSON.parse(label);
    } catch {
      return { MovementType: 'unknown', EffectiveDate: '', Premium: '0.00' };
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Limit the number of events shown in non-full view
  const displayEvents = fullView ? timelineData : timelineData.slice(0, 5);
  
  return (
    <div className="relative space-y-4 py-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-primary/10">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-base font-semibold">Contract Timeline</h3>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 to-transparent"></div>
        
        {/* Timeline events */}
        <div className="space-y-6">
          {displayEvents.map((event, index) => {
            const eventData = parseEventData(event.Label);
            const isExpanded = expandedItem === index;
            const isHovered = hoveredItem === index;
            const style = getEventStyle(eventData.MovementType);
            
            return (
              <div 
                key={index} 
                className="group relative pl-12"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Timeline node */}
                <motion.div 
                  className={`absolute left-0 top-0 w-10 h-10 rounded-full ${style.bg} flex items-center justify-center z-10 shadow-lg transition-shadow duration-300 ${style.hover}`}
                  initial={false}
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    transition: { duration: 0.2 }
                  }}
                >
                  {style.icon}
                </motion.div>
                
                {/* Event content */}
                <motion.div 
                  className={`relative rounded-xl border border-border/5 bg-gradient-to-br from-background to-background/90 p-4 shadow-lg/5 transition-all duration-300 group-hover:shadow-xl/20 ${style.hover}`}
                  initial={false}
                  animate={{
                    y: isHovered ? -2 : 0,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Main content */}
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedItem(isExpanded ? null : index)}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium">{event.Description}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${style.lightBg} ${style.text} font-medium`}>
                          {eventData.MovementType}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(eventData.EffectiveDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(eventData.MovementDatetime)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {parseFloat(eventData.Premium) > 0 && (
                        <div className="flex items-center text-xs font-medium">
                          <CircleDollarSign className="h-3 w-3 mr-1 text-primary" />
                          R {parseFloat(eventData.Premium).toFixed(2)}
                        </div>
                      )}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border/10">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Movement Object</p>
                              <p className="text-sm font-medium">{eventData.MovementObj}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Movement Type</p>
                              <p className="text-sm font-medium">{eventData.MovementType}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Info className="h-3 w-3 mr-1" />
                              Last updated: {formatTime(eventData.MovementDatetime)}
                            </div>
                            <button className="flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                              View Details
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
        
        {/* View more link */}
        {!fullView && timelineData.length > 5 && (
          <div className="mt-6 text-center">
            <button className="inline-flex items-center px-4 py-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
              View all {timelineData.length} events
              <ChevronRight className="h-3 w-3 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 