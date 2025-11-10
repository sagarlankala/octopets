// Constants for the application
import { ListingType } from '../types/types';

// Listing types that are supported by the application
export const LISTING_TYPES: ListingType[] = [
  { id: "park", name: "Parks", icon: "🌳", description: "Open spaces for pets to run and play" },
  { id: "cafe", name: "Cafés", icon: "☕", description: "Places to eat and drink with your pet" },
  { id: "home", name: "Homes", icon: "🏠", description: "Pet-friendly accommodations" },
  { id: "hotel", name: "Hotels", icon: "🏨", description: "Places to stay overnight with your pet" },
  { id: "custom", name: "Custom Venues", icon: "🏢", description: "Other pet-friendly establishments" }
];

// Common amenities that can be selected when adding a new venue
export const AMENITIES: string[] = [
  "Water stations",
  "Pet beds",
  "Off-leash areas",
  "Waste stations",
  "Pet menu/treats",
  "Pet-sitting services",
  "Outdoor seating",
  "Pet play equipment",
  "Fenced area",
  "Walking trails",
  "Bathing facilities",
  "First aid for pets",
  "Pet shop/store"
];

// Application routes
export const ROUTES: Record<string, string> = {
  HOME: "/",
  LISTINGS: "/listings",
  LISTING_DETAILS: "/listing/:id",
  ADD_LISTING: "/add-listing",
  REVIEWS: "/reviews/:id",
  PET_PROFILES: "/pet-profiles",
  PET_PROFILE_FORM: "/pet-profiles/:id"
};
