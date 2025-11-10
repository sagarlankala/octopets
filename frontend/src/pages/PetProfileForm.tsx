import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PetProfileFormState } from '../types/types';
import { PetProfileService } from '../data/petProfileService';
import { PET_TYPES } from '../data/constantsJsx';
import '../styles/PetProfileForm.css';

const PetProfileForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== 'new';

  const [formState, setFormState] = useState<PetProfileFormState>({
    name: '',
    petType: 'dogs',
    breed: '',
    age: '',
    photo: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchProfile = async () => {
        try {
          setLoading(true);
          const profile = await PetProfileService.getPetProfile(Number(id));
          setFormState({
            name: profile.name,
            petType: profile.petType,
            breed: profile.breed || '',
            age: profile.age?.toString() || '',
            photo: profile.photo || '',
            description: profile.description || ''
          });
        } catch (err) {
          setError('Failed to load pet profile');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [id, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formState.name || !formState.petType) {
      setError('Name and pet type are required');
      return;
    }

    try {
      setLoading(true);
      const profileData = {
        name: formState.name,
        petType: formState.petType,
        breed: formState.breed || undefined,
        age: formState.age ? Number(formState.age) : undefined,
        photo: formState.photo || undefined,
        description: formState.description || undefined
      };

      if (isEditMode) {
        await PetProfileService.updatePetProfile(Number(id), profileData);
      } else {
        await PetProfileService.createPetProfile(profileData);
      }

      navigate('/pet-profiles');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} pet profile`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="loading">Loading pet profile...</div>;
  }

  return (
    <div className="pet-profile-form-page">
      <div className="form-header">
        <h1>{isEditMode ? 'Edit Pet Profile' : 'Create Pet Profile'}</h1>
        <p>Tell us about your pet</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="pet-profile-form">
        <div className="form-group">
          <label htmlFor="name">Pet Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your pet's name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="petType">Pet Type *</label>
          <select
            id="petType"
            name="petType"
            value={formState.petType}
            onChange={handleInputChange}
            required
          >
            {PET_TYPES.map(pet => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formState.breed}
            onChange={handleInputChange}
            placeholder="Enter breed (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age (years)</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formState.age}
            onChange={handleInputChange}
            min="0"
            max="100"
            placeholder="Enter age (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo (filename)</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={formState.photo}
            onChange={handleInputChange}
            placeholder="e.g., dog1.png (from /images/pets/)"
          />
          <small>Enter the filename of an image in the /images/pets/ directory</small>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Tell us about your pet's personality..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (isEditMode ? 'Update Profile' : 'Create Profile')}
          </button>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={() => navigate('/pet-profiles')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetProfileForm;
