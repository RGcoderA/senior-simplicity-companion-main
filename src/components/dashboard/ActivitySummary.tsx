
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const data = [
  { day: 'Mon', steps: 2100 },
  { day: 'Tue', steps: 3400 },
  { day: 'Wed', steps: 1800 },
  { day: 'Thu', steps: 2800 },
  { day: 'Fri', steps: 2650 },
  { day: 'Sat', steps: 1500 },
  { day: 'Sun', steps: 2000 },
];

const ActivitySummary = () => {
  return (
    <div className="elder-card mb-6">
      <div className="flex items-center mb-6">
        <div className="bg-companion-blue/10 p-3 rounded-full mr-4">
          <Activity size={32} className="text-companion-blue" />
        </div>
        <div>
          <h3 className="text-elder-lg font-semibold text-companion-dark">Activity Summary</h3>
          <p className="text-elder-base text-gray-600">Your weekly steps</p>
        </div>
      </div>
      
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 16 }}
              tickMargin={10}
            />
            <YAxis 
              tick={{ fontSize: 16 }} 
              tickMargin={10}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{ fontSize: '18px', borderRadius: '8px' }}
              formatter={(value) => [`${value} steps`, 'Steps']}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="steps" 
              stroke="#1E5CA8" 
              fill="#D3E4FD" 
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 bg-companion-lightBlue rounded-lg p-4 text-center">
        <p className="text-elder-base text-companion-blue">
          <span className="font-semibold">14,250</span> total steps this week
        </p>
      </div>
    </div>
  );
};

export default ActivitySummary;
