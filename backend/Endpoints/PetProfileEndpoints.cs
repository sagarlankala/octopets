using Octopets.Backend.Models;
using Octopets.Backend.Repositories.Interfaces;

namespace Octopets.Backend.Endpoints;

public static class PetProfileEndpoints
{
    public static void MapPetProfileEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/petprofiles")
                       .WithTags("Pet Profiles");

        // GET all pet profiles
        group.MapGet("/", async (IPetProfileRepository repository) =>
        {
            var profiles = await repository.GetAllAsync();
            return Results.Ok(profiles);
        })
        .WithName("GetAllPetProfiles")
        .WithDescription("Gets all pet profiles")
        .WithOpenApi();

        // GET pet profile by id
        group.MapGet("/{id:int}", async (int id, IPetProfileRepository repository) =>
        {
            var profile = await repository.GetByIdAsync(id);
            return profile is null ? Results.NotFound() : Results.Ok(profile);
        })
        .WithName("GetPetProfileById")
        .WithDescription("Gets a pet profile by its ID")
        .WithOpenApi(operation =>
        {
            operation.Parameters[0].Description = "The ID of the pet profile";
            return operation;
        });

        // POST new pet profile
        group.MapPost("/", async (PetProfile petProfile, IPetProfileRepository repository, IConfiguration config) =>
        {
            if (!config.GetValue<bool>("ENABLE_CRUD", true))
            {
                throw new InvalidOperationException("CRUD operations are currently disabled");
            }
            var newProfile = await repository.CreateAsync(petProfile);
            return Results.Created($"/api/petprofiles/{newProfile.Id}", newProfile);
        })
        .WithName("CreatePetProfile")
        .WithDescription("Creates a new pet profile")
        .WithOpenApi();

        // PUT update pet profile
        group.MapPut("/{id:int}", async (int id, PetProfile petProfile, IPetProfileRepository repository, IConfiguration config) =>
        {
            if (!config.GetValue<bool>("ENABLE_CRUD", true))
            {
                throw new InvalidOperationException("CRUD operations are currently disabled");
            }
            var updatedProfile = await repository.UpdateAsync(id, petProfile);
            return updatedProfile is null ? Results.NotFound() : Results.Ok(updatedProfile);
        })
        .WithName("UpdatePetProfile")
        .WithDescription("Updates an existing pet profile")
        .WithOpenApi();

        // DELETE pet profile
        group.MapDelete("/{id:int}", async (int id, IPetProfileRepository repository, IConfiguration config) =>
        {
            if (!config.GetValue<bool>("ENABLE_CRUD", true))
            {
                throw new InvalidOperationException("CRUD operations are currently disabled");
            }
            var result = await repository.DeleteAsync(id);
            return result ? Results.NoContent() : Results.NotFound();
        })
        .WithName("DeletePetProfile")
        .WithDescription("Deletes a pet profile")
        .WithOpenApi();
    }
}
