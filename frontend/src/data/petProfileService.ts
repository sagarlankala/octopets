import { appConfig } from '../config/appConfig';
import { PetProfile } from '../types/types';
import petProfilesData from './petProfilesData';

// Mock data
const mockProfiles: PetProfile[] = petProfilesData;
let nextId = 4; // For mock data

// API service for pet profiles
export class PetProfileService {
    static async getPetProfiles(): Promise<PetProfile[]> {
        if (appConfig.useMockData) {
            return [...mockProfiles];
        }
        
        try {
            const response = await fetch(`${appConfig.apiUrl}/petprofiles`);
            if (!response.ok) {
                throw new Error('Failed to fetch pet profiles');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching pet profiles:', error);
            throw error;
        }
    }

    static async getPetProfile(id: number): Promise<PetProfile> {
        if (appConfig.useMockData) {
            const profile = mockProfiles.find(p => p.id === id);
            if (!profile) {
                throw new Error('Pet profile not found');
            }
            return profile;
        }
        
        try {
            const response = await fetch(`${appConfig.apiUrl}/petprofiles/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch pet profile');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching pet profile:', error);
            throw error;
        }
    }

    static async createPetProfile(profile: Omit<PetProfile, 'id' | 'createdAt'>): Promise<PetProfile> {
        if (appConfig.useMockData) {
            const newProfile: PetProfile = {
                ...profile,
                id: nextId++,
                createdAt: new Date().toISOString()
            };
            mockProfiles.push(newProfile);
            return newProfile;
        }
        
        try {
            const response = await fetch(`${appConfig.apiUrl}/petprofiles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            if (!response.ok) {
                throw new Error('Failed to create pet profile');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating pet profile:', error);
            throw error;
        }
    }

    static async updatePetProfile(id: number, profile: Partial<PetProfile>): Promise<PetProfile> {
        if (appConfig.useMockData) {
            const index = mockProfiles.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Pet profile not found');
            }
            mockProfiles[index] = {
                ...mockProfiles[index],
                ...profile,
                updatedAt: new Date().toISOString()
            };
            return mockProfiles[index];
        }
        
        try {
            const response = await fetch(`${appConfig.apiUrl}/petprofiles/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            if (!response.ok) {
                throw new Error('Failed to update pet profile');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating pet profile:', error);
            throw error;
        }
    }

    static async deletePetProfile(id: number): Promise<void> {
        if (appConfig.useMockData) {
            const index = mockProfiles.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Pet profile not found');
            }
            mockProfiles.splice(index, 1);
            return;
        }
        
        try {
            const response = await fetch(`${appConfig.apiUrl}/petprofiles/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete pet profile');
            }
        } catch (error) {
            console.error('Error deleting pet profile:', error);
            throw error;
        }
    }
}

export default PetProfileService;
