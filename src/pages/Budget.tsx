
import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PageLayout from '@/components/dashboard/PageLayout';

const Budget = () => {
  const [budget, setBudget] = useState({
    total: 25000,
    spent: 8750,
    categories: [
      { name: 'Venue', allocation: 40, spent: 5000, total: 10000 },
      { name: 'Catering', allocation: 20, spent: 2000, total: 5000 },
      { name: 'Photography', allocation: 15, spent: 1500, total: 3750 },
      { name: 'Attire', allocation: 10, spent: 250, total: 2500 },
      { name: 'Decor', allocation: 10, spent: 0, total: 2500 },
      { name: 'Entertainment', allocation: 5, spent: 0, total: 1250 },
    ]
  });

  return (
    <PageLayout 
      title="Budget Planner" 
      description="Track and manage your wedding expenses"
      icon={<Wallet className="w-8 h-8" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Budget</span>
                  <span className="font-medium">GHS {budget.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Spent</span>
                  <span className="font-medium">GHS {budget.spent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Remaining</span>
                  <span className="font-medium">GHS {(budget.total - budget.spent).toLocaleString()}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Budget used</span>
                  <span className="text-sm">{Math.round((budget.spent / budget.total) * 100)}%</span>
                </div>
                <Progress value={(budget.spent / budget.total) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Budget Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budget.categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm">
                        GHS {category.spent.toLocaleString()} / {category.total.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(category.spent / category.total) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Budget;
