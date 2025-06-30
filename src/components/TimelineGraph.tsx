'use client';

import { useState, useMemo } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';
import { 
  Calendar,
  TrendingUp,
  CircleDollarSign,
} from "lucide-react";

interface TimelineGraphProps {
  timelineData: any[];
}

export default function TimelineGraph({ timelineData }: TimelineGraphProps) {
  const [selectedView, setSelectedView] = useState<'premium' | 'frequency'>('premium');


  // Process timeline data for the graph
  const graphData = useMemo(() => {
    return timelineData
      .map(event => {
        const eventData = JSON.parse(event.Label);
        return {
          date: new Date(event.Start),
          formattedDate: new Date(event.Start).toLocaleDateString('en-ZA', {
            month: 'short',
            year: 'numeric'
          }),
          premium: parseFloat(eventData.Premium?.trim() || '0'),
          type: eventData.MovementType,
          description: event.Description,
          effectiveDate: eventData.EffectiveDate,
          movementObj: eventData.MovementObj
        };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [timelineData]);

  // Get movement type color
  const getMovementColor = (type: string) => {
    const colors = {
      'ADH': '#f59e0b',
      'RER': '#3b82f6',
      'NBU': '#36455e',
      'default': '#6b7280'
    };
    return colors[type as keyof typeof colors] || colors.default;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border/5 rounded-lg p-3 shadow-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">{data.formattedDate}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{data.description}</p>
            <div className="flex items-center space-x-2">
              <CircleDollarSign className="h-3 w-3 text-primary" />
              <p className="text-sm font-medium">
                R {data.premium.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-3 w-3 text-primary" />
              <p className="text-xs text-muted-foreground">{data.type}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-primary/10">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-base font-semibold">Timeline Analysis</h3>
        </div>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
              selectedView === 'premium' 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
            onClick={() => setSelectedView('premium')}
          >
            Premium Changes
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
              selectedView === 'frequency' 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
            onClick={() => setSelectedView('frequency')}
          >
            Movement Frequency
          </button>
        </div>
      </div>

      {/* Graph */}
      <div className="h-[200px] w-full m-0">
        <ResponsiveContainer width="100%" height="100%">
          {selectedView === 'premium' ? (
            // Premium changes view
            <AreaChart
              data={graphData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis dataKey="formattedDate" fontSize={11} tickLine={false}/>
              <YAxis dataKey="premium" fontSize={11} tickLine={false} tickFormatter={(value) => `R ${value}`}/>
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="premium" 
                stroke="var(--accent)" 
                fill="var(--accent)" 
                strokeWidth={1}
                dot={(props) => {
                  const point = graphData[props.index];
                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={4}
                      fill={getMovementColor(point.type)}
                      stroke={getMovementColor(point.type)}
                      strokeWidth={2}
                    />
                  );
                }}
                activeDot={(props) => {
                  const point = graphData[props.index];
                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={6}
                      fill={getMovementColor(point.type)}
                      stroke={getMovementColor(point.type)}
                      strokeWidth={2}
                    />
                  );
                }}
              />
              {graphData.map((point, index) => (
                <ReferenceLine
                  key={index}
                  x={point.formattedDate}
                  stroke={getMovementColor(point.type)}
                  strokeDasharray="3 3"
                  opacity={0.5}
                />
              ))}
            </AreaChart>
          ) : (
            // Movement frequency view
            <AreaChart
              data={graphData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.5}/>
              <XAxis dataKey="formattedDate" fontSize={11} tickLine={false}/>
              <YAxis dataKey="name" fontSize={11} tickLine={false} allowDecimals={true}/>
              <Tooltip content={<CustomTooltip />} />
              {['ADH', 'RER', 'NBU'].map((type) => (
                <Area
                  key={type}
                  type="monotone"
                  dataKey={(data) => data.type === type ? 1 : 0}
                  stackId="1"
                  stroke={getMovementColor(type)}
                  fill={`url(#${type}Gradient)`}
                  strokeWidth={2}
                  name={type}
                />
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6">
        {['ADH', 'RER', 'NBU'].map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getMovementColor(type) }}
            />
            <span className="text-xs text-muted-foreground">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 