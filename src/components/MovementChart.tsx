'use client';

import { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { 
  Activity,
  Calendar,
  CircleDollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface MovementData {
  date: Date;
  amount: number;
  movementDescription: string;
  movementEffectiveDate: string;
  formattedDate: string;
  fullDate: string;
  previousAmount?: number;
}

interface MovementChartProps {
  movementData: MovementData[];
}

type MovementTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: MovementData;
  }>;
  label?: string;
}

// Custom tooltip component
const MovementTooltip = ({ active, payload }: MovementTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isIncrease = payload[0].value > (payload[0].payload.previousAmount || 0);
    
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border/5 rounded-lg p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">{data.fullDate}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              {new Date(data.date).toLocaleTimeString('en-ZA', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Premium Amount</p>
            <div className="flex items-center space-x-1">
              <CircleDollarSign className="h-3 w-3 text-primary" />
              <p className="text-sm font-semibold">R {payload[0].value.toFixed(2)}</p>
            </div>
          </div>
          
          {data.previousAmount !== undefined && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Change</p>
              <div className={`flex items-center space-x-1 ${isIncrease ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isIncrease ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <p className="text-xs font-medium">
                  R {Math.abs(payload[0].value - data.previousAmount).toFixed(2)}
                </p>
              </div>
            </div>
          )}
          
          {data.movementDescription && (
            <div className="pt-2 mt-2 border-t border-border/10">
              <div className="flex items-center space-x-1">
                <Activity className="h-3 w-3 text-primary" />
                <p className="text-xs text-muted-foreground">{data.movementDescription}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function MovementChart({ movementData }: MovementChartProps) {
  // Process data to include previous amounts for change calculation
  const processedData = useMemo(() => {
    if (!Array.isArray(movementData) || movementData.length === 0) {
      return [];
    }

    // starting from R0 reference point
    if (movementData.length === 1) {
      const currentData = movementData[0];
      const previousDate = new Date(currentData.date);
      previousDate.setMonth(previousDate.getMonth() - 1);
      
      return [
        {
          date: previousDate,
          amount: 0, // Start from R0
          formattedDate: previousDate.toLocaleDateString('en-US', { month: 'short' }),
          fullDate: previousDate.toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          movementDescription: "Initial Premium",
          movementEffectiveDate: previousDate.toISOString().split('T')[0],
          previousAmount: undefined
        },
        {
          ...currentData,
          previousAmount: 0 // Reference to initial R0 amount
        }
      ];
    }

    return movementData.map((item, index) => {
      const prevAmount = index > 0 ? movementData[index - 1].amount : 0;
      return {
        ...item,
        date: item.date ? item.date : new Date(item.date),
        amount: typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount || 0,
        previousAmount: typeof prevAmount === 'string' ? parseFloat(prevAmount) : prevAmount || 0
      };
    });
  }, [movementData]);

  // Calculate min and max 
  const { minAmount, maxAmount, interval } = useMemo(() => {
    if (!Array.isArray(processedData) || processedData.length === 0) {
      return { minAmount: 0, maxAmount: 1000, interval: 200 };
    }

    const amounts = processedData.map(d => d.amount).filter(amount => !isNaN(amount));
    if (amounts.length === 0) {
      return { minAmount: 0, maxAmount: 1000, interval: 200 };
    }

    const min = Math.min(...amounts);
    const max = Math.max(...amounts);
    
    // Round min and max to nearest 50
    const roundedMin = Math.floor(min / 50) * 50;
    const roundedMax = Math.ceil(max / 50) * 50;
    
    // Calculate a nice interval (aim for 5-7 ticks)
    const range = roundedMax - roundedMin;
    let interval = 50; // default interval
    
    if (range <= 200) interval = 50;
    else if (range <= 500) interval = 100;
    else if (range <= 1000) interval = 200;
    else if (range <= 2000) interval = 400;
    else interval = Math.ceil(range / 6 / 100) * 100;

    return {
      minAmount: roundedMin,
      maxAmount: roundedMax,
      interval
    };
  }, [processedData]);

  // If no data show empty state
  if (!Array.isArray(movementData) || movementData.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-primary/10">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold">Premium Movement</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Current premium: <span className="font-medium text-primary">R 0.00</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[300px] rounded-xl border border-border/5 bg-gradient-to-b from-background to-background/80 p-4 shadow-lg">
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium text-muted-foreground">No movement data available</p>
              <p className="text-xs text-muted-foreground mt-1">Check back later for updates</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Premium Movement</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Current premium: <span className="font-medium text-primary">
                  R {processedData[0]?.amount.toFixed(2) || "0.00"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[200px] w-full m-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={processedData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            {/* Grid and Axes */}
            <CartesianGrid strokeDasharray="3 3" opacity={0.5}/>
            <XAxis 
              dataKey="formattedDate" 
              fontSize={11}
              tickLine={false}
            />
            <YAxis 
              dataKey="amount"
              fontSize={11}
              tickLine={false}
              tickFormatter={(value) => `R ${value.toString()}`}
              domain={[minAmount, maxAmount]}
              ticks={Array.from(
                { length: Math.floor((maxAmount - minAmount) / interval) + 1 },
                (_, i) => minAmount + (i * interval)
              )}
            />

            {/* Data Visualization */}
            <Tooltip 
              content={<MovementTooltip />}
              cursor={{
                stroke: '#0065FF',
                strokeWidth: 1,
                strokeDasharray: '3 3'
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#0065FF"
              strokeWidth={2}
              fill="#0065FF"
              dot={(props) => {
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill="#0065FF"
                    stroke="#0065FF"
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={(props) => {
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={6}
                    fill="#0065FF"
                    stroke="#0065FF"
                    strokeWidth={2}
                  />
                );
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 