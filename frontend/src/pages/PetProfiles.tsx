import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PetProfile } from '../types/types';
import { PetProfileService } from '../data/petProfileService';
import { PET_TYPES } from '../data/constantsJsx';
import '../styles/PetProfiles.css';

const PetProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState<PetProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await PetProfileService.getPetProfiles();
        setProfiles(data);
      } catch (err) {
        setError('Failed to load pet profiles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this pet profile?')) {
      return;
    }

    try {
      await PetProfileService.deletePetProfile(id);
      setProfiles(profiles.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete pet profile');
      console.error(err);
    }
  };

  const getPetIcon = (petType: string): React.ReactNode => {
    const pet = PET_TYPES.find(p => p.id === petType);
    return pet ? pet.icon : '🐾';
  };

  if (loading) {
    return <div className="loading">Loading pet profiles...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="pet-profiles-page">
      <div className="pet-profiles-header">
        <h1>My Pet Profiles</h1>
        <p>Manage your furry, feathery, and scaly friends</p>
        <Link to="/pet-profiles/new" className="btn btn-primary">
          Add New Pet Profile
        </Link>
      </div>

      {profiles.length === 0 ? (
        <div className="no-profiles">
          <p>You haven't created any pet profiles yet.</p>
          <Link to="/pet-profiles/new" className="btn btn-outline">
            Create Your First Profile
          </Link>
        </div>
      ) : (
        <div className="profiles-grid">
          {profiles.map(profile => (
            <div key={profile.id} className="profile-card">
              <div className="profile-image">
                {profile.photo ? (
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/pets/${profile.photo}`} 
                    alt={profile.name} 
                  />
                ) : (
                  <div className="profile-icon">{getPetIcon(profile.petType)}</div>
                )}
              </div>
              <div className="profile-info">
                <h3>{profile.name}</h3>
                {profile.breed && <p className="breed">{profile.breed}</p>}
                {profile.age && <p className="age">{profile.age} years old</p>}
                {profile.description && <p className="description">{profile.description}</p>}
              </div>
              <div className="profile-actions">
                <Link to={`/pet-profiles/${profile.id}`} className="btn btn-small btn-outline">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(profile.id)} 
                  className="btn btn-small btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetProfiles;
