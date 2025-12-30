import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, MoreVertical, Trash2, Edit, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addresses as initialAddresses } from '@/data/mockData';
import { Address } from '@/types';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SavedAddresses() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    fullAddress: '',
    city: '',
    pincode: '',
    landmark: '',
  });

  const handleSetDefault = (id: string) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    toast.success('Default address updated');
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast.success('Address deleted');
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      label: address.label,
      fullAddress: address.fullAddress,
      city: address.city,
      pincode: address.pincode,
      landmark: address.landmark || '',
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({
      label: '',
      fullAddress: '',
      city: '',
      pincode: '',
      landmark: '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.label || !formData.fullAddress || !formData.city || !formData.pincode) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingAddress) {
      setAddresses(prev =>
        prev.map(addr =>
          addr.id === editingAddress.id
            ? { ...addr, ...formData }
            : addr
        )
      );
      toast.success('Address updated');
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        userId: '1',
        ...formData,
        isDefault: addresses.length === 0,
      };
      setAddresses(prev => [...prev, newAddress]);
      toast.success('Address added');
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-4 h-14 px-4 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Saved Addresses</h1>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Addresses List */}
        <div className="space-y-3 mb-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-card rounded-xl border border-border p-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{address.label}</span>
                    {address.isDefault && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{address.fullAddress}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {address.city} - {address.pincode}
                  </p>
                  {address.landmark && (
                    <p className="text-xs text-muted-foreground">
                      Landmark: {address.landmark}
                    </p>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1">
                      <MoreVertical className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(address)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    {!address.isDefault && (
                      <DropdownMenuItem onClick={() => handleSetDefault(address.id)}>
                        <Check className="w-4 h-4 mr-2" />
                        Set as Default
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleDelete(address.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {/* Add New */}
        <Button variant="outline" className="w-full" onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90%] rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Label *</Label>
              <Input
                value={formData.label}
                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                placeholder="e.g., Home, Office"
              />
            </div>
            <div className="space-y-2">
              <Label>Full Address *</Label>
              <Input
                value={formData.fullAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, fullAddress: e.target.value }))}
                placeholder="House/Flat No., Street, Area"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>City *</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label>Pincode *</Label>
                <Input
                  value={formData.pincode}
                  onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                  placeholder="Pincode"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Landmark (Optional)</Label>
              <Input
                value={formData.landmark}
                onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                placeholder="Nearby landmark"
              />
            </div>
            <Button className="w-full" onClick={handleSubmit}>
              {editingAddress ? 'Update Address' : 'Add Address'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
