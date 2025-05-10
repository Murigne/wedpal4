import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DollarSign, Users, UserRound } from 'lucide-react';
import { GuestStats } from '@/types/guest';

interface DashboardSummaryProps {
  preferredBudget: string;
  recentActivities?: { action: string; date: string; userName: string }[];
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
  // Make sure guestStats exists and has valid properties
  const safeGuestStats = {
    confirmed: guestStats?.confirmed || 0,
    pending: guestStats?.pending || 0, 
    declined: guestStats?.declined || 0,
    total: guestStats?.total || 0
  };
  
  // Guest distribution data for pie chart with improved colors matching screenshot
  const guestData = [
    { name: 'Confirmed', value: safeGuestStats.confirmed, color: '#10B981' }, // Green color
    { name: 'Pending', value: safeGuestStats.pending, color: '#F59E0B' },    // Amber color
    { name: 'Declined', value: safeGuestStats.declined, color: '#EF4444' },  // Red color
  ];

  const chartConfig = {
    confirmed: { label: 'Confirmed', color: '#10B981' },
    pending: { label: 'Pending', color: '#F59E0B' },
    declined: { label: 'Declined', color: '#EF4444' },
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Budget Summary
              </CardTitle>
              <CardDescription>
                Budget range: {preferredBudget}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      ${budgetSummary?.total?.toLocaleString() || "0"}
                    </div>
                    <p className="text-xs text-blue-600">Total Budget</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      ${budgetSummary?.spent?.toLocaleString() || "0"}
                    </div>
                    <p className="text-xs text-green-600">Spent</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      ${budgetSummary?.remaining?.toLocaleString() || "0"}
                    </div>
                    <p className="text-xs text-purple-600">Remaining</p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-wedding-pink h-2.5 rounded-full" 
                    style={{ 
                      width: `${budgetSummary && budgetSummary.total > 0 ? 
                        Math.min(100, (budgetSummary.spent / budgetSummary.total) * 100) : 0}%` 
                    }}
                  ></div>
                </div>
                
                <div className="text-sm text-right">
                  {budgetSummary && budgetSummary.total > 0 ? 
                    `${Math.round((budgetSummary.spent / budgetSummary.total) * 100)}% of budget used` : 
                    "0% of budget used"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guest Stats Section - Updated donut chart configuration */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Guest Responses
              </CardTitle>
              <CardDescription>
                Total guests: {safeGuestStats.total}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="w-1/2 flex justify-center">
                  <div className="relative h-[140px] w-[140px]">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={guestData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={4}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            {guestData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color} 
                              />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={
                              <ChartTooltipContent 
                                formatter={(value, name) => [`${value} guests`, name]}
                              />
                            }
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
                
                <div className="w-1/2 flex flex-col justify-center">
                  {guestData.map((entry, index) => (
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

          {/* Recent Activities Section */}
          {recentActivities && recentActivities.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="text-sm border-b border-gray-100 pb-2 last:border-0 flex justify-between">
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
