// Replace only the Budget Categories section with this improved version

<div className="md:col-span-7">
  <Card className="h-[calc(100vh-180px)] max-h-[767px]">
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
    <CardContent className="p-0 px-6 pb-6 h-[calc(100%-76px)]">
      {/* ScrollArea with explicit height calculation to ensure it fills the Card content area */}
      <ScrollArea className="h-full w-full">
        <div className="space-y-4 pr-4 pb-4">
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