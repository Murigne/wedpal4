
import React, { useState } from 'react';
import { Wallet, Plus, Edit, Trash2, ChartBar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PageLayout from '@/components/dashboard/PageLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetCategory {
  id: string;
  name: string;
  allocation: number;
  spent: number;
  total: number;
  vendor?: string;
}

interface BudgetSummary {
  total: number;
  spent: number;
  categories: BudgetCategory[];
}

const Budget = () => {
  const { toast } = useToast();
  const [budget, setBudget] = useState<BudgetSummary>({
    total: 25000,
    spent: 8750,
    categories: [
      { id: '1', name: 'Venue', allocation: 40, spent: 5000, total: 10000, vendor: 'Elegant Gardens Venue' },
      { id: '2', name: 'Catering', allocation: 20, spent: 2000, total: 5000, vendor: 'Divine Catering Co.' },
      { id: '3', name: 'Photography', allocation: 15, spent: 1500, total: 3750, vendor: 'Moments Photography' },
      { id: '4', name: 'Attire', allocation: 10, spent: 250, total: 2500 },
      { id: '5', name: 'Decor', allocation: 10, spent: 0, total: 2500 },
      { id: '6', name: 'Entertainment', allocation: 5, spent: 0, total: 1250 },
    ]
  });

  // Dialog states
  const [isEditBudgetOpen, setIsEditBudgetOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [isVendorSelectorOpen, setIsVendorSelectorOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(budget.total);
  
  // Category form state
  const [categoryForm, setCategoryForm] = useState<{
    id?: string;
    name: string;
    allocation: number;
    spent: number;
    total: number;
    vendor?: string;
  }>({
    name: '',
    allocation: 0,
    spent: 0,
    total: 0,
  });

  // Vendor categories for dropdown
  const vendorCategories = ["Venues", "Photography", "Catering", "Flowers", "Attire", "Beauty", "Music", "Decor", "Cake", "MCs", "Rings"];

  // Function to determine progress bar color based on percentage
  const getBudgetProgressColor = (percentage: number) => {
    if (percentage >= 100) return '#ea384c'; // Red for over budget
    return '#4CAF50';                        // Green for under budget
  };

  // Calculate budget percentage
  const budgetPercentage = (budget.spent / budget.total) * 100;

  // Calculate remaining budget (total minus sum of all category allocations)
  const calculateRemainingBudget = () => {
    const allocatedBudget = budget.categories.reduce((sum, category) => sum + category.total, 0);
    return budget.total - allocatedBudget;
  };

  // Get the maximum amount that can be allocated to a new category
  const getMaxAllowableBudget = (categoryId?: string) => {
    if (categoryId) {
      // For editing, we need to exclude the current category's allocation
      const currentCategory = budget.categories.find(cat => cat.id === categoryId);
      const currentAllocation = currentCategory ? currentCategory.total : 0;
      return calculateRemainingBudget() + currentAllocation;
    }
    // For new categories, just return the remaining budget
    return calculateRemainingBudget();
  };

  // Mock vendors from the vendor marketplace
  const mockVendors = [
    { id: 1, name: "Elegant Gardens Venue", category: "Venues", price: 10000 },
    { id: 2, name: "Moments Photography", category: "Photography", price: 3500 },
    { id: 3, name: "Divine Catering Co.", category: "Catering", price: 5000 },
    { id: 4, name: "Blooming Joy Florals", category: "Flowers", price: 2000 },
    { id: 5, name: "Harmony Wedding Music", category: "Music", price: 1500 },
    { id: 6, name: "Dream Dress Boutique", category: "Attire", price: 2500 },
    { id: 7, name: "Enchanted Decor", category: "Decor", price: 2500 },
    { id: 8, name: "Sweet Celebrations Cake", category: "Cake", price: 800 },
    { id: 9, name: "Elite Wedding MCs", category: "MCs", price: 2000 },
    { id: 10, name: "Golden Bands Jewelry", category: "Rings", price: 5000 },
    { id: 11, name: "Diamond Dreams", category: "Rings", price: 7000 },
    { id: 12, name: "Wedding Hosts Pro", category: "MCs", price: 1800 },
  ];

  // Helper to filter vendors based on category name
  const getVendorsByCategory = (categoryName: string) => {
    return mockVendors.filter(vendor => 
      vendor.category.toLowerCase() === categoryName.toLowerCase() || 
      vendor.category.includes(categoryName) || 
      categoryName.includes(vendor.category)
    );
  };

  // Handle the total budget update
  const handleUpdateBudget = () => {
    const newBudget = {...budget, total: editingBudget};
    setBudget(newBudget);
    setIsEditBudgetOpen(false);
    toast({
      title: "Budget updated",
      description: `Your total budget has been updated to ${editingBudget.toLocaleString()}`
    });
  };

  // Handle adding a new budget category
  const handleAddCategory = () => {
    if (!categoryForm.name || !categoryForm.total) {
      toast({
        title: "Missing information",
        description: "Please select a category and enter a budget amount"
      });
      return;
    }
    
    // Check if the amount exceeds the remaining budget
    const remainingBudget = calculateRemainingBudget();
    if (categoryForm.total > remainingBudget) {
      toast({
        title: "Budget limit exceeded",
        description: `The maximum amount you can allocate is GHS ${remainingBudget.toLocaleString()}`,
        variant: "destructive"
      });
      return;
    }
    
    // Prevent spending more than the allocated budget
    const spentAmount = Math.min(categoryForm.spent, categoryForm.total);
    
    const newCategory: BudgetCategory = {
      id: Date.now().toString(),
      name: categoryForm.name,
      allocation: (categoryForm.total / budget.total) * 100,
      spent: spentAmount,
      total: categoryForm.total,
      vendor: categoryForm.vendor
    };

    const newCategories = [...budget.categories, newCategory];
    const newSpent = budget.spent + spentAmount;
    
    setBudget({
      ...budget,
      spent: newSpent,
      categories: newCategories
    });
    
    setIsAddCategoryOpen(false);
    setCategoryForm({ name: '', allocation: 0, spent: 0, total: 0 });
    
    toast({
      title: "Category added",
      description: `${categoryForm.name} has been added to your budget`
    });
  };

  // Handle editing a budget category
  const handleEditCategory = () => {
    if (!categoryForm.id) return;
    
    // Check if the new amount exceeds the available budget
    const maxAllowable = getMaxAllowableBudget(categoryForm.id);
    if (categoryForm.total > maxAllowable) {
      toast({
        title: "Budget limit exceeded",
        description: `The maximum amount you can allocate is GHS ${maxAllowable.toLocaleString()}`,
        variant: "destructive"
      });
      return;
    }
    
    // Prevent spending more than the allocated budget
    const spentAmount = Math.min(categoryForm.spent, categoryForm.total);
    
    const oldCategory = budget.categories.find(cat => cat.id === categoryForm.id);
    const spentDifference = spentAmount - (oldCategory?.spent || 0);
    
    const newCategories = budget.categories.map(cat => 
      cat.id === categoryForm.id ? {
        ...cat,
        name: categoryForm.name,
        spent: spentAmount,
        total: categoryForm.total,
        allocation: (categoryForm.total / budget.total) * 100,
        vendor: categoryForm.vendor
      } : cat
    );
    
    const newSpent = budget.spent + spentDifference;
    
    setBudget({
      ...budget,
      spent: newSpent,
      categories: newCategories
    });
    
    setIsEditCategoryOpen(false);
    setCategoryForm({ name: '', allocation: 0, spent: 0, total: 0 });
    
    toast({
      title: "Category updated",
      description: `${categoryForm.name} has been updated`
    });
  };

  // Handle deleting a budget category
  const handleDeleteCategory = (id: string) => {
    const category = budget.categories.find(cat => cat.id === id);
    if (!category) return;
    
    const newCategories = budget.categories.filter(cat => cat.id !== id);
    const newSpent = budget.spent - category.spent;
    
    setBudget({
      ...budget,
      spent: newSpent,
      categories: newCategories
    });
    
    toast({
      title: "Category deleted",
      description: `${category.name} has been removed from your budget`
    });
  };

  // Open the edit category dialog
  const openEditCategory = (category: BudgetCategory) => {
    setCategoryForm({
      id: category.id,
      name: category.name,
      allocation: category.allocation,
      spent: category.spent,
      total: category.total,
      vendor: category.vendor
    });
    setIsEditCategoryOpen(true);
  };

  // Handle vendor selection for a category
  const handleSelectVendor = (vendor: typeof mockVendors[0]) => {
    // Check if the vendor price exceeds the available budget
    const remainingBudget = categoryForm.id ? 
      getMaxAllowableBudget(categoryForm.id) :
      calculateRemainingBudget();
      
    if (vendor.price > remainingBudget) {
      toast({
        title: "Vendor price exceeds budget",
        description: `This vendor's price (GHS ${vendor.price.toLocaleString()}) exceeds your remaining budget of GHS ${remainingBudget.toLocaleString()}`,
        variant: "destructive"
      });
      return;
    }
    
    setCategoryForm({
      ...categoryForm,
      vendor: vendor.name,
      total: vendor.price
    });
    setIsVendorSelectorOpen(false);
  };

  // Generate different colors for bars
  const getBarColor = (index: number) => {
    const colors = [
      'bg-pink-500',
      'bg-purple-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-orange-500'
    ];
    return colors[index % colors.length];
  };
  
  // Sort categories by spent percentage for the breakdown chart
  const sortedCategories = [...budget.categories]
    .sort((a, b) => (b.spent / b.total) - (a.spent / a.total));

  return (
    <PageLayout 
      title="Budget Planner" 
      description="Track and manage your wedding expenses"
      icon={<Wallet className="w-8 h-8" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        <div className="md:col-span-5">
          <div className="grid grid-cols-1 gap-6 h-full">
            {/* Budget Summary Card - Reduced height */}
            <Card className="mb-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Budget Summary</CardTitle>
                <Button onClick={() => setIsEditBudgetOpen(true)} size="sm" variant="ghost">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="space-y-2 pb-4"> {/* Reduced padding bottom */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div>
                    <span className="text-sm text-muted-foreground block">Total Budget</span>
                    <span className="font-medium">GHS {budget.total.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Spent</span>
                    <span className="font-medium">GHS {budget.spent.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Remaining</span>
                    <span className="font-medium">GHS {(budget.total - budget.spent).toLocaleString()}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Budget used</span>
                  </div>
                  <Progress 
                    value={budgetPercentage} 
                    className="h-3" 
                    indicatorColor={getBudgetProgressColor(budgetPercentage)}
                    showValueOnBar={true}
                  />
                  {/* Removed the "You have exceeded your budget" warning */}
                </div>
              </CardContent>
            </Card>
            
            {/* Budget Breakdown - Horizontal Bar Chart with fixed height and scrolling */}
            <Card className="flex-1 flex flex-col h-[calc(100vh-555px)]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Budget Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-0 px-6 pb-6 flex-1 overflow-hidden">
                <ScrollArea className="h-full w-full pr-1">
                  <div className="space-y-4 pr-4 pb-4">
                    {sortedCategories.map((category, index) => (
                      <div key={category.id} className="space-y-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-xs font-medium">{Math.round(category.allocation)}%</span>
                        </div>
                        <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getBarColor(index)} rounded-full transition-all duration-500`}
                            style={{ 
                              width: `${Math.round(category.allocation)}%`,
                              opacity: category.spent > 0 ? 1 : 0.7
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Budget Categories (Keeping this part unchanged) */}
        <div className="md:col-span-7">
          <Card className="h-[calc(100vh-180px)] max-h-[680px]">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Budget Categories</CardTitle>
              <Button onClick={() => {
                setCategoryForm({name: '', allocation: 0, spent: 0, total: 0});
                setIsAddCategoryOpen(true);
              }} size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Category
              </Button>
            </CardHeader>
            <CardContent className="p-4 pb-6">
              {/* ScrollArea with calculated height that respects the CardHeader */}
              <ScrollArea className="h-[calc(100vh-180px-80px)] max-h-[570px] pr-1">
                <div className="space-y-4 pr-4">
                  {budget.categories.map((category) => (
                    <div key={category.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          {category.vendor && (
                            <p className="text-sm text-muted-foreground">Vendor: {category.vendor}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditCategory(category)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            GHS {category.spent.toLocaleString()} / {category.total.toLocaleString()}
                          </span>
                          <span className="text-sm font-medium">
                            {Math.round((category.spent / category.total) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(category.spent / category.total) * 100} 
                          className="h-2"
                          indicatorColor={getBudgetProgressColor((category.spent / category.total) * 100)}
                        />
                      </div>
                    </div>
                  ))}

                  {budget.categories.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                      <p>No budget categories yet.</p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setCategoryForm({name: '', allocation: 0, spent: 0, total: 0});
                          setIsAddCategoryOpen(true);
                        }} 
                        className="mt-2"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add your first category
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Budget Dialog */}
      <Dialog open={isEditBudgetOpen} onOpenChange={setIsEditBudgetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Total Budget</DialogTitle>
            <DialogDescription>
              Update your total wedding budget.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="total-budget">Total Budget (GHS)</Label>
              <Input
                id="total-budget"
                type="number"
                value={editingBudget}
                onChange={(e) => setEditingBudget(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdateBudget}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog - Modified to use Select for category name */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Budget Category</DialogTitle>
            <DialogDescription>
              Create a new budget category for your wedding expenses.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Select
                value={categoryForm.name}
                onValueChange={(value) => setCategoryForm({...categoryForm, name: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {vendorCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-total">Budgeted Amount (GHS)</Label>
              <Input
                id="category-total"
                type="number"
                value={categoryForm.total}
                onChange={(e) => setCategoryForm({...categoryForm, total: Number(e.target.value)})}
                max={calculateRemainingBudget()}
              />
              <p className="text-xs text-muted-foreground">
                Maximum available: GHS {calculateRemainingBudget().toLocaleString()}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-spent">Spent Amount (GHS)</Label>
              <Input
                id="category-spent"
                type="number"
                value={categoryForm.spent}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  // Prevent spent amount from exceeding total budget
                  const limitedValue = Math.min(value, categoryForm.total);
                  setCategoryForm({...categoryForm, spent: limitedValue});
                }}
                max={categoryForm.total}
              />
              {categoryForm.spent > 0 && categoryForm.spent === categoryForm.total && (
                <p className="text-xs text-amber-500">You've reached your budget limit for this category.</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-vendor">Vendor (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="category-vendor"
                  value={categoryForm.vendor || ''}
                  onChange={(e) => setCategoryForm({...categoryForm, vendor: e.target.value})}
                  disabled={!!categoryForm.vendor}
                  placeholder="No vendor selected"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (categoryForm.name) {
                      setIsVendorSelectorOpen(true);
                    } else {
                      toast({
                        title: "Enter category first",
                        description: "Please select a category to see relevant vendors",
                        variant: "destructive"
                      });
                    }
                  }}
                >
                  Browse
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog - Similar modifications as Add Category Dialog */}
      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget Category</DialogTitle>
            <DialogDescription>
              Update details for this budget category.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-category-name">Category Name</Label>
              <Select
                value={categoryForm.name}
                onValueChange={(value) => setCategoryForm({...categoryForm, name: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {vendorCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category-total">Budgeted Amount (GHS)</Label>
              <Input
                id="edit-category-total"
                type="number"
                value={categoryForm.total}
                onChange={(e) => setCategoryForm({...categoryForm, total: Number(e.target.value)})}
                max={getMaxAllowableBudget(categoryForm.id)}
              />
              <p className="text-xs text-muted-foreground">
                Maximum available: GHS {getMaxAllowableBudget(categoryForm.id).toLocaleString()}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category-spent">Spent Amount (GHS)</Label>
              <Input
                id="edit-category-spent"
                type="number"
                value={categoryForm.spent}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  // Prevent spent amount from exceeding total budget
                  const limitedValue = Math.min(value, categoryForm.total);
                  setCategoryForm({...categoryForm, spent: limitedValue});
                }}
                max={categoryForm.total}
              />
              {categoryForm.spent > 0 && categoryForm.spent === categoryForm.total && (
                <p className="text-xs text-amber-500">You've reached your budget limit for this category.</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category-vendor">Vendor (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-category-vendor"
                  value={categoryForm.vendor || ''}
                  onChange={(e) => setCategoryForm({...categoryForm, vendor: e.target.value})}
                  disabled={!!categoryForm.vendor}
                  placeholder="No vendor selected"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsVendorSelectorOpen(true)}
                >
                  Browse
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vendor Selection Dialog */}
      <Dialog open={isVendorSelectorOpen} onOpenChange={setIsVendorSelectorOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select a Vendor</DialogTitle>
            <DialogDescription>
              Browse and select a vendor for {categoryForm.name || "this category"}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[400px] overflow-y-auto">
            {getVendorsByCategory(categoryForm.name).length > 0 ? (
              getVendorsByCategory(categoryForm.name).map((vendor) => (
                <div
                  key={vendor.id}
                  className="border rounded-lg p-3 cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-colors"
                  onClick={() => handleSelectVendor(vendor)}
                >
                  <h3 className="font-medium">{vendor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{vendor.category}</p>
                  <p className="font-semibold">GHS {vendor.price.toLocaleString()}</p>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-4 text-muted-foreground">
                No relevant vendors found for "{categoryForm.name}". Try browsing all vendors.
              </div>
            )}

            {/* Show all vendors if the filtered list is empty or small */}
            {getVendorsByCategory(categoryForm.name).length < 3 && (
              <>
                <div className="col-span-2 mt-4 mb-2">
                  <h3 className="font-medium border-t pt-2">Other vendors you might consider:</h3>
                </div>
                {mockVendors
                  .filter(v => !getVendorsByCategory(categoryForm.name).some(f => f.id === v.id))
                  .map((vendor) => (
                    <div
                      key={vendor.id}
                      className="border rounded-lg p-3 cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-colors"
                      onClick={() => handleSelectVendor(vendor)}
                    >
                      <h3 className="font-medium">{vendor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{vendor.category}</p>
                      <p className="font-semibold">GHS {vendor.price.toLocaleString()}</p>
                    </div>
                  ))
                }
              </>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Budget;
