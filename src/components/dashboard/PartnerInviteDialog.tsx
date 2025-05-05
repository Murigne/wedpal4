
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

interface PartnerInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PartnerInviteDialog: React.FC<PartnerInviteDialogProps> = ({
  open,
  onOpenChange
}) => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [isSendingInvite, setIsSendingInvite] = useState(false);

  const sendPartnerInvite = async () => {
    if (!partnerEmail || !partnerEmail.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSendingInvite(true);
    
    try {
      // In a real app, this would send an email through a backend service
      // For now, we'll just simulate success
      setTimeout(() => {
        toast({
          title: "Invitation sent!",
          description: `An invitation has been sent to ${partnerEmail}`,
          variant: "default",
        });
        onOpenChange(false);
        setPartnerEmail('');
        setIsSendingInvite(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again later.",
        variant: "destructive",
      });
      setIsSendingInvite(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite your partner</DialogTitle>
          <DialogDescription>
            Send an invitation to your partner to collaborate on wedding planning.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="partner-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Partner's email
            </label>
            <Input
              id="partner-email"
              type="email"
              placeholder="partner@example.com"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={sendPartnerInvite}
            disabled={isSendingInvite || !partnerEmail}
            className="bg-wedding-pink hover:bg-wedding-pink-dark"
          >
            {isSendingInvite ? (
              "Sending..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" /> Send invitation
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerInviteDialog;
