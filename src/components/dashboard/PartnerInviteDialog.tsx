
import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  const [invitationSent, setInvitationSent] = useState(false);
  const [partnerName, setPartnerName] = useState('');

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
        // Extract name from email for demonstration
        const name = partnerEmail.split('@')[0].split('.').map(n => 
          n.charAt(0).toUpperCase() + n.slice(1)
        ).join(' ');
        
        setPartnerName(name);
        setInvitationSent(true);
        toast({
          title: "Invitation sent!",
          description: `An invitation has been sent to ${partnerEmail}`,
          variant: "default",
        });
        setIsSendingInvite(false);
        
        // Simulate partner accepting after 3 seconds
        setTimeout(() => {
          toast({
            title: "Invitation accepted!",
            description: `${name} has accepted your invitation`,
            variant: "default",
          });
          onOpenChange(false);
        }, 3000);
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
        
        {invitationSent ? (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <Avatar className="h-20 w-20 border-2 border-wedding-pink/50">
              <AvatarFallback className="bg-wedding-pink text-white text-lg">
                {partnerName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg mb-1">Invitation sent to {partnerName}</h3>
              <p className="text-sm text-muted-foreground">Waiting for {partnerName} to accept...</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              <span>Pending acceptance</span>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PartnerInviteDialog;
