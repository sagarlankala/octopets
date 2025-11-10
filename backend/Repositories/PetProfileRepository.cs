using Microsoft.EntityFrameworkCore;
using Octopets.Backend.Data;
using Octopets.Backend.Models;
using Octopets.Backend.Repositories.Interfaces;

namespace Octopets.Backend.Repositories;

public class PetProfileRepository : IPetProfileRepository
{
    private readonly AppDbContext _context;

    public PetProfileRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PetProfile>> GetAllAsync()
    {
        return await _context.PetProfiles.ToListAsync();
    }

    public async Task<PetProfile?> GetByIdAsync(int id)
    {
        return await _context.PetProfiles.FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<PetProfile> CreateAsync(PetProfile petProfile)
    {
        petProfile.CreatedAt = DateTime.UtcNow;
        _context.PetProfiles.Add(petProfile);
        await _context.SaveChangesAsync();
        return petProfile;
    }

    public async Task<PetProfile?> UpdateAsync(int id, PetProfile petProfile)
    {
        var existingProfile = await _context.PetProfiles.FindAsync(id);
        if (existingProfile == null)
            return null;

        existingProfile.Name = petProfile.Name;
        existingProfile.PetType = petProfile.PetType;
        existingProfile.Breed = petProfile.Breed;
        existingProfile.Age = petProfile.Age;
        existingProfile.Photo = petProfile.Photo;
        existingProfile.Description = petProfile.Description;
        existingProfile.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return existingProfile;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var profile = await _context.PetProfiles.FindAsync(id);
        if (profile == null)
            return false;

        _context.PetProfiles.Remove(profile);
        await _context.SaveChangesAsync();
        return true;
    }
}
