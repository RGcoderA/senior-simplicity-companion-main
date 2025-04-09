
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  relation?: string;
  isFavorite: boolean;
  photoUrl?: string;
}

let syncedContacts: Contact[] = [];
let isAuthenticated = false;

// Request contacts permissions - in a real app, this would use the native APIs
const requestContactsPermission = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate permission request
    setTimeout(() => {
      isAuthenticated = true;
      resolve(true);
    }, 1500);
  });
};

// Synchronize contacts from phone - in a real app, this would use the Contacts API
export const syncPhoneContacts = async (): Promise<Contact[]> => {
  if (!isAuthenticated) {
    const hasPermission = await requestContactsPermission();
    if (!hasPermission) {
      throw new Error("Permission to access contacts was denied");
    }
  }
  
  // Simulate fetching contacts from phone
  return new Promise((resolve) => {
    setTimeout(() => {
      syncedContacts = [
        { id: '1', name: 'John Smith', phoneNumber: '555-123-4567', relation: 'Son', isFavorite: true, photoUrl: '/placeholder.svg' },
        { id: '2', name: 'Mary Johnson', phoneNumber: '555-234-5678', relation: 'Daughter', isFavorite: true },
        { id: '3', name: 'Dr. Williams', phoneNumber: '555-345-6789', relation: 'Doctor', isFavorite: false },
        { id: '4', name: 'Pharmacy', phoneNumber: '555-456-7890', relation: 'Service', isFavorite: true },
        { id: '5', name: 'Sarah Thompson', phoneNumber: '555-567-8901', relation: 'Caregiver', isFavorite: false },
      ];
      resolve(syncedContacts);
    }, 2000);
  });
};

// Get all synchronized contacts
export const getContacts = async (): Promise<Contact[]> => {
  if (syncedContacts.length === 0) {
    throw new Error("No contacts synchronized");
  }
  return syncedContacts;
};

// Get favorite contacts for quick calling
export const getFavoriteContacts = async (): Promise<Contact[]> => {
  const contacts = await getContacts();
  return contacts.filter(contact => contact.isFavorite);
};

// Mark/unmark contact as favorite
export const toggleFavorite = async (contactId: string): Promise<Contact> => {
  const contactIndex = syncedContacts.findIndex(c => c.id === contactId);
  if (contactIndex === -1) {
    throw new Error("Contact not found");
  }
  
  syncedContacts[contactIndex].isFavorite = !syncedContacts[contactIndex].isFavorite;
  return syncedContacts[contactIndex];
};

// React Query hooks for contacts
export const useContactsSync = () => {
  return useMutation({
    mutationFn: syncPhoneContacts,
    onSuccess: () => {
      toast.success("Phone contacts synchronized successfully!");
    },
    onError: () => {
      toast.error("Failed to synchronize contacts. Please check permissions and try again.");
    }
  });
};

export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
    retry: false, // Don't retry if contacts aren't synchronized
  });
};

export const useFavoriteContacts = () => {
  return useQuery({
    queryKey: ["favoriteContacts"],
    queryFn: getFavoriteContacts,
    enabled: syncedContacts.length > 0
  });
};

export const useToggleFavorite = () => {
  return useMutation({
    mutationFn: toggleFavorite
  });
};

// Check if contacts have been synchronized
export const hasContactsSync = (): boolean => {
  return syncedContacts.length > 0;
};

// For login screen to check if user has already authenticated contacts
export const isContactsAuthenticated = (): boolean => {
  return isAuthenticated;
};
