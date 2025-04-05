
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  ImagePlus, 
  Plus, 
  Settings, 
  Star, 
  Users, 
  MessageSquare,
  LineChart,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash,
  Upload
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import WedPalLogo from '@/components/WedPalLogo';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const vendorName = "Elegant Gardens Venue";
const vendorCategory = "Venues";

// Sample bookings data
const bookings = [
  { 
    id: 1, 
    couple: "Alex & Jamie", 
    date: "June 15, 2025", 
    package: "Premium Garden Package", 
    guests: 120, 
    status: "confirmed", 
    amount: "$8,500",
    notes: "Wedding ceremony and reception. Requested white and pink floral arrangements."
  },
  { 
    id: 2, 
    couple: "Taylor & Jordan", 
    date: "August 3, 2025", 
    package: "Evening Reception Package", 
    guests: 85, 
    status: "pending", 
    amount: "$6,200",
    notes: "Evening reception only. Interested in adding lighting package."
  },
  { 
    id: 3, 
    couple: "Riley & Casey", 
    date: "September 20, 2025", 
    package: "Intimate Garden Ceremony", 
    guests: 50, 
    status: "confirmed", 
    amount: "$3,900",
    notes: "Morning ceremony with light refreshments. No alcohol service."
  },
  { 
    id: 4, 
    couple: "Morgan & Drew", 
    date: "October 12, 2025", 
    package: "Full Day Exclusive", 
    guests: 150, 
    status: "inquiry", 
    amount: "$10,200",
    notes: "Initial inquiry for fall wedding with full-day venue rental."
  },
];

// Sample service packages
const packages = [
  {
    id: 1,
    name: "Intimate Garden Ceremony",
    price: "$3,900",
    description: "Perfect for smaller, intimate ceremonies with up to 50 guests. Includes 4-hour venue rental, basic floral decorations, and ceremony coordination.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    features: [
      "4-hour venue rental",
      "Garden ceremony setup",
      "Basic floral decorations",
      "Ceremony coordination",
      "Up to 50 guests"
    ]
  },
  {
    id: 2,
    name: "Evening Reception Package",
    price: "$6,200",
    description: "Evening reception for up to 100 guests with elegant lighting, dance floor, and dedicated staff for your event.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    features: [
      "6-hour evening venue rental",
      "Elegant lighting package",
      "Dance floor setup",
      "Table and chair arrangements",
      "Dedicated event staff",
      "Up to 100 guests"
    ]
  },
  {
    id: 3,
    name: "Premium Garden Package",
    price: "$8,500",
    description: "Full service wedding package with ceremony and reception for up to 150 guests, premium floral arrangements, and coordination services.",
    image: "https://images.unsplash.com/photo-1464699438364-190de363629a?q=80&w=2066&auto=format&fit=crop",
    features: [
      "10-hour venue access",
      "Ceremony and reception setups",
      "Premium floral arrangements",
      "Full coordination services",
      "Custom lighting design",
      "Up to 150 guests",
      "Bridal suite access"
    ]
  },
  {
    id: 4,
    name: "Full Day Exclusive",
    price: "$10,200",
    description: "Exclusive all-day access to the entire venue for up to 200 guests. The ultimate wedding experience with all premium services included.",
    image: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2070&auto=format&fit=crop",
    features: [
      "12-hour exclusive venue access",
      "Complete venue customization",
      "Premium decoration package",
      "Full service coordination",
      "Gourmet catering options",
      "Luxury lighting design",
      "Up to 200 guests",
      "Bridal and groom suites"
    ]
  }
];

// Sample gallery images
const galleryImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464699438364-190de363629a?q=80&w=2066&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551201469-c1f72de00c63?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501931742086-2483b95b4082?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070&auto=format&fit=crop"
];

// Stats data
const statsData = {
  bookingsThisMonth: 3,
  pendingInquiries: 5,
  totalBookingsYTD: 28,
  revenue: "$74,500",
  upcomingEvents: 12,
  averageRating: 4.8
};

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  const [showAddPackageDialog, setShowAddPackageDialog] = useState(false);
  const [showAddImageDialog, setShowAddImageDialog] = useState(false);
  const [newImage, setNewImage] = useState("");
  
  const handleStatusChange = (bookingId: number, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `Booking status changed to ${newStatus}`,
    });
  };
  
  const handleUploadImage = () => {
    if (newImage) {
      toast({
        title: "Image uploaded",
        description: "Your image has been added to the gallery",
      });
      setShowAddImageDialog(false);
      setNewImage("");
    }
  };
  
  const handleAddPackage = () => {
    toast({
      title: "New package added",
      description: "Your new service package has been created",
    });
    setShowAddPackageDialog(false);
  };
  
  const handleDeleteBooking = (bookingId: number) => {
    toast({
      title: "Booking deleted",
      description: "The booking has been removed from your calendar",
      variant: "destructive",
    });
  };
  
  const handleEditPackage = (packageId: number) => {
    toast({
      title: "Edit package",
      description: "Package editing would open here",
    });
  };
  
  const handleDeletePackage = (packageId: number) => {
    toast({
      title: "Package deleted",
      description: "The package has been removed from your services",
      variant: "destructive",
    });
  };
  
  const handleDeleteImage = (index: number) => {
    toast({
      title: "Image deleted",
      description: "The image has been removed from your gallery",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-wedding-pink/20 backdrop-blur-sm border-b border-wedding-pink/10 px-4 md:px-6 py-4">
        <div className="container mx-auto max-w-[1600px] flex items-center justify-between">
          <div className="flex items-center">
            <WedPalLogo className="text-wedding-pink-dark text-2xl mr-2" />
            <span className="text-lg font-medium border-l border-wedding-pink/20 pl-2 ml-2">Vendor Portal</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="bg-white/60 hover:bg-white/80 border-wedding-pink/20"
              onClick={() => toast({ title: "Settings", description: "Account settings would open here" })}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            
            <div className="w-10 h-10 rounded-full bg-wedding-pink/20 flex items-center justify-center text-wedding-pink-dark font-semibold">
              {vendorName.charAt(0)}
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-[1600px] p-6">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-1">{vendorName}</h1>
              <p className="text-muted-foreground">{vendorCategory} vendor dashboard</p>
            </div>
            <Button className="wedding-button">
              <Plus className="w-4 h-4 mr-2" />
              Create New Listing
            </Button>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 text-wedding-pink mb-2" />
              <p className="text-3xl font-bold">{statsData.bookingsThisMonth}</p>
              <p className="text-sm text-muted-foreground">Bookings This Month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <MessageSquare className="h-8 w-8 text-wedding-pink mb-2" />
              <p className="text-3xl font-bold">{statsData.pendingInquiries}</p>
              <p className="text-sm text-muted-foreground">Pending Inquiries</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <CheckCircle className="h-8 w-8 text-wedding-pink mb-2" />
              <p className="text-3xl font-bold">{statsData.totalBookingsYTD}</p>
              <p className="text-sm text-muted-foreground">Total Bookings YTD</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <DollarSign className="h-8 w-8 text-wedding-pink mb-2" />
              <p className="text-3xl font-bold">{statsData.revenue}</p>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Clock className="h-8 w-8 text-wedding-pink mb-2" />
              <p className="text-3xl font-bold">{statsData.upcomingEvents}</p>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Star className="h-8 w-8 text-wedding-gold fill-wedding-gold mb-2" />
              <p className="text-3xl font-bold">{statsData.averageRating}</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">Services & Packages</TabsTrigger>
            <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Manage your upcoming events and booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2">Couple</th>
                        <th className="pb-2">Date</th>
                        <th className="pb-2">Package</th>
                        <th className="pb-2">Guests</th>
                        <th className="pb-2">Amount</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b hover:bg-gray-50">
                          <td className="py-3">{booking.couple}</td>
                          <td className="py-3">{booking.date}</td>
                          <td className="py-3">{booking.package}</td>
                          <td className="py-3">{booking.guests}</td>
                          <td className="py-3">{booking.amount}</td>
                          <td className="py-3">
                            <select 
                              className="border rounded px-2 py-1 text-sm"
                              defaultValue={booking.status}
                              onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            >
                              <option value="inquiry">Inquiry</option>
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3">
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => toast({ title: "View Details", description: "Booking details would open here" })}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleDeleteBooking(booking.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Services Tab */}
          <TabsContent value="services">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Service Packages</h2>
              <Dialog open={showAddPackageDialog} onOpenChange={setShowAddPackageDialog}>
                <DialogTrigger asChild>
                  <Button className="wedding-button">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Package
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Package</DialogTitle>
                    <DialogDescription>
                      Add a new service package to offer to your clients.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Package Name</label>
                      <input type="text" className="w-full border rounded p-2" placeholder="Premium Wedding Package" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price</label>
                      <input type="text" className="w-full border rounded p-2" placeholder="$0.00" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <textarea className="w-full border rounded p-2 h-20" placeholder="Describe your package..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Upload Image</label>
                      <div className="border border-dashed rounded-md p-4 text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddPackageDialog(false)}>
                      Cancel
                    </Button>
                    <Button className="wedding-button" onClick={handleAddPackage}>
                      Create Package
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <span className="text-wedding-pink font-semibold">{pkg.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Features:</h4>
                      <ul className="text-sm space-y-1">
                        {pkg.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-wedding-pink mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                        {pkg.features.length > 3 && (
                          <li className="text-muted-foreground">+ {pkg.features.length - 3} more features</li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPackage(pkg.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeletePackage(pkg.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Photo Gallery</h2>
              <Dialog open={showAddImageDialog} onOpenChange={setShowAddImageDialog}>
                <DialogTrigger asChild>
                  <Button className="wedding-button">
                    <ImagePlus className="w-4 h-4 mr-2" />
                    Add Images
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Images</DialogTitle>
                    <DialogDescription>
                      Add new photos to showcase your venue or services.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="border border-dashed rounded-md p-8 text-center cursor-pointer">
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                      <p className="mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">JPG, PNG or GIF (max 10MB)</p>
                      <input
                        type="text"
                        className="mt-4 w-full border rounded p-2"
                        placeholder="Image URL (for demo purposes)"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddImageDialog(false)}>
                      Cancel
                    </Button>
                    <Button className="wedding-button" onClick={handleUploadImage}>
                      Upload Images
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative group rounded-md overflow-hidden h-48">
                  <img src={image} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-white"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Track bookings, inquiries, and revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 mx-auto text-wedding-pink mb-4" />
                    <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground max-w-md">Visualize performance metrics including bookings, revenue, and customer engagement over time.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Listing Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold">1,245</span>
                        <span className="text-green-500 text-sm">+12% ↑</span>
                      </div>
                      <p className="text-xs text-muted-foreground">vs. last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Conversion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold">4.2%</span>
                        <span className="text-green-500 text-sm">+0.8% ↑</span>
                      </div>
                      <p className="text-xs text-muted-foreground">vs. last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Customer Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold">96%</span>
                        <span className="text-green-500 text-sm">+2% ↑</span>
                      </div>
                      <p className="text-xs text-muted-foreground">vs. last month</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Client Messages</CardTitle>
                <CardDescription>Manage inquiries and communications with clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Alex & Jamie</h3>
                      <span className="text-sm text-muted-foreground">Today, 10:23 AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Regarding: Premium Garden Package</p>
                    <p className="text-sm">We're interested in your Premium Garden Package for our wedding next June. Do you have availability on June 15th and could we schedule a tour?</p>
                  </div>
                  
                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Taylor & Jordan</h3>
                      <span className="text-sm text-muted-foreground">Yesterday, 4:17 PM</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Regarding: Evening Reception Package</p>
                    <p className="text-sm">Thanks for sending over the additional information about the lighting package. We're reviewing it and will get back to you soon.</p>
                  </div>
                  
                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Morgan & Drew</h3>
                      <span className="text-sm text-muted-foreground">March 3, 2025</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Regarding: Full Day Exclusive</p>
                    <p className="text-sm">We just saw your venue online and it looks absolutely gorgeous! We're interested in a fall wedding in October. What dates do you have available?</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full wedding-button">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View All Messages
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VendorDashboard;
