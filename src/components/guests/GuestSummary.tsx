
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { GuestStats, GuestTypeData } from '@/types/guest';

interface GuestSummaryProps {
  stats: GuestStats;
  typeData: GuestTypeData[];
  onAddGuest: () => void;
}

export const GuestSummary: React.FC<GuestSummaryProps> = ({ 
  stats, 
  typeData,
  onAddGuest
}) => {
  return (
    <div className="space-y-6">
      <Card className="flex-shrink-0">
        <CardHeader>
          <CardTitle>Guest Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-blue-700">Total Guests</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
              <p className="text-sm text-green-700">Confirmed</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-yellow-700">Pending</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-red-600">{stats.declined}</p>
              <p className="text-sm text-red-700">Declined</p>
            </div>
          </div>
          
          <Button className="w-full" onClick={onAddGuest}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Guest
          </Button>
        </CardContent>
      </Card>
      
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle>Guest Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center py-2">
          <div className="flex items-center justify-between w-full">
            <div className="w-1/2 flex justify-center">
              <div className="relative">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie
                      data={typeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={75}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={4}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {typeData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {stats.total > 0 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-1/2 flex flex-col justify-center">
              {typeData.map((entry, index) => (
                <div key={index} className="flex items-center mb-3">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                  <div className="text-sm font-medium">{entry.name}</div>
                  <div className="ml-auto font-bold">{entry.value}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
