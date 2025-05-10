
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DollarSign, Users, UserRound } from 'lucide-react';
import { GuestStats } from '@/types/guest';

interface DashboardSummaryProps {
  preferredBudget: string;
  recentActivities?: {
    action: string;
    date: string;
    userName: string;
  }[];
  guestStats: GuestStats;
  budgetSummary: {
    total: number;
    spent: number;
    remaining: number;
  };
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  preferredBudget,
  recentActivities = [],
  guestStats,
  budgetSummary
}) => {
  // Guest distribution data for pie chart with theme-consistent colors
  const guestData = [{
    name: 'Confirmed',
    value: guestStats.confirmed,
    color: '#10B981'
  }, {
    name: 'Pending',
    value: guestStats.pending,
    color: '#F59E0B'
  }, {
    name: 'Declined',
    value: guestStats.declined,
    color: '#EF4444'
  }];

  const chartConfig = {
    confirmed: {
      label: 'Confirmed',
      color: '#10B981'
    },
    pending: {
      label: 'Pending',
      color: '#F59E0B'
    },
    declined: {
      label: 'Declined',
      color: '#EF4444'
    }
  };

  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          Dashboard Summary
        </CardTitle>
        <CardDescription>
          Your wedding planning overview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Summary Section */}
          <Card className="min-h-[320px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Budget Summary
              </CardTitle>
              <CardDescription>
                Budget range: {preferredBudget}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-[calc(100%-5rem)]">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">
                      ${budgetSummary.total.toLocaleString()}
                    </div>
                    <p className="text-sm text-blue-600">Total Budget</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-xl font-bold text-green-600">
                      ${budgetSummary.spent.toLocaleString()}
                    </div>
                    <p className="text-sm text-green-600">Spent</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">
                      ${budgetSummary.remaining.toLocaleString()}
                    </div>
                    <p className="text-sm text-purple-600">Remaining</p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mt-8">
                  <div className="bg-wedding-pink h-3 rounded-full" style={{
                    width: `${Math.min(100, budgetSummary.spent / budgetSummary.total * 100)}%`
                  }}></div>
                </div>
                
                <div className="text-sm text-right mt-2">
                  {Math.round(budgetSummary.spent / budgetSummary.total * 100)}% of budget used
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guest Stats Section with fixed chart display */}
          <Card className="min-h-[320px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Guest Responses
              </CardTitle>
              <CardDescription>
                Total guests: {guestStats.total}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between h-full">
                {/* Fixed: Added explicit width and height to ensure chart renders properly */}
                <div className="w-full md:w-1/2 h-44 flex items-center justify-center">
                  <div style={{ width: '100%', height: '100%', minHeight: '190px' }}>
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height={190}>
                        <PieChart margin={{ top: 30, right: 0, bottom: 10, left: 0 }}>
                          <Pie 
                            data={guestData} 
                            cx="50%" 
                            cy="50%" 
                            innerRadius={60} 
                            outerRadius={70} 
                            paddingAngle={4} 
                            startAngle={90} 
                            endAngle={-270} 
                            dataKey="value" 
                            strokeWidth={0}
                          >
                            {guestData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip 
                            content={<ChartTooltipContent 
                              formatter={(value, name) => [`${value} guests`, name]} 
                            />} 
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col justify-center mt-4 md:mt-0">
                  {guestData.map((entry, index) => (
                    <div key={index} className="flex items-center mb-4 last:mb-0">
                      <div 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <div className="text-base font-medium">{entry.name}</div>
                      <div className="ml-auto font-bold text-lg">{entry.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities Section */}
          {recentActivities.length > 0 && (
            <Card className="md:col-span-2 min-h-[260px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="text-sm border-b border-gray-100 pb-3 last:border-0 flex justify-between">
                      <div>
                        <span className="font-medium">{activity.action}</span>
                        <span className="text-xs text-gray-500 ml-2">• {activity.date}</span>
                      </div>
                      <span className={`font-medium flex items-center gap-1 ${activity.userName.includes("Partner") ? "text-pink-600" : "text-blue-800"}`}>
                        <UserRound className="h-3 w-3" />
                        {activity.userName}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardSummary;
