
import React from 'react';
import { Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ShareRegistryCardProps {
  registryUrl: string;
}

const ShareRegistryCard: React.FC<ShareRegistryCardProps> = ({ registryUrl }) => {
  const { toast } = useToast();

  const copyRegistryLink = () => {
    navigator.clipboard.writeText(registryUrl)
      .then(() => {
        toast({
          title: "Link Copied",
          description: "Registry link has been copied to your clipboard."
        });
      })
      .catch(() => {
        toast({
          title: "Copy Failed",
          description: "Could not copy the link. Please try again."
        });
      });
  };

  const shareRegistry = (platform: string) => {
    const message = "Check out our wedding registry!";
    
    let shareUrl = '';
    
    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + ' ' + registryUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(registryUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(registryUrl)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Our Wedding Registry')}&body=${encodeURIComponent(message + ' ' + registryUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL, so we'll just copy to clipboard
        navigator.clipboard.writeText(registryUrl);
        toast({
          title: "Link Copied",
          description: "Registry link copied. Open Instagram to share."
        });
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Registry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input value={registryUrl} readOnly />
          <Button variant="outline" size="icon" onClick={copyRegistryLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </Button>
        </div>
        <div className="flex justify-between mt-3">
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-[#25D366] text-white hover:bg-[#128C7E]" 
            onClick={() => shareRegistry('whatsapp')}
            title="Share via WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M13.5 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M9 13.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5Z"/></svg>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-[#1DA1F2] text-white hover:bg-[#0c85d0]" 
            onClick={() => shareRegistry('twitter')}
            title="Share via Twitter"
          >
            <Twitter className="h-5 w-5" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-[#EA4335] text-white hover:bg-[#d33426]" 
            onClick={() => shareRegistry('email')}
            title="Share via Email"
          >
            <Mail className="h-5 w-5" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-[#4267B2] text-white hover:bg-[#365899]" 
            onClick={() => shareRegistry('facebook')}
            title="Share via Facebook"
          >
            <Facebook className="h-5 w-5" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-[#E1306C] text-white hover:bg-[#c13584]" 
            onClick={() => shareRegistry('instagram')}
            title="Share via Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareRegistryCard;
