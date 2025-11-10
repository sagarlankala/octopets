using Octopets.Backend.Models;

namespace Octopets.Backend.Repositories.Interfaces;

public interface IPetProfileRepository
{
    Task<IEnumerable<PetProfile>> GetAllAsync();
    Task<PetProfile?> GetByIdAsync(int id);
    Task<PetProfile> CreateAsync(PetProfile petProfile);
    Task<PetProfile?> UpdateAsync(int id, PetProfile petProfile);
    Task<bool> DeleteAsync(int id);
}
