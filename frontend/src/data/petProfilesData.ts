// Mock data for pet profiles
import { PetProfile } from '../types/types';

const petProfilesData: PetProfile[] = [
  {
    id: 1,
    name: "Buddy",
    petType: "dogs",
    breed: "Golden Retriever",
    age: 3,
    photo: "dog1.png",
    description: "Friendly and energetic golden retriever who loves parks!",
    createdAt: "2025-04-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Whiskers",
    petType: "cats",
    breed: "Tabby",
    age: 5,
    photo: "cat1.jpg",
    description: "Independent cat who enjoys cozy cafes.",
    createdAt: "2025-04-05T00:00:00Z"
  },
  {
    id: 3,
    name: "Charlie",
    petType: "birds",
    breed: "Parakeet",
    age: 2,
    description: "Colorful and vocal parakeet.",
    createdAt: "2025-04-10T00:00:00Z"
  }
];

export default petProfilesData;
