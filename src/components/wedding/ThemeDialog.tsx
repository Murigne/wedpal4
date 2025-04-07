
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ThemeDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Preview Theme</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Theme Preview</DialogTitle>
          <DialogDescription>
            See how your wedding website would look with this theme
          </DialogDescription>
        </DialogHeader>
        <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
          <p>Theme preview would display here</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeDialog;
