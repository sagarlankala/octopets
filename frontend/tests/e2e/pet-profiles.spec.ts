import { test, expect } from '@playwright/test';

test.describe('Pet Profiles feature workflow', () => {
  
  test('should display pet profiles list and navigate to form', async ({ page }) => {
    // Visit the home page
    await page.goto('/');
    
    // Navigate to pet profiles using the navbar
    await page.getByRole('link', { name: 'My Pets' }).click();
    
    // Verify we're on the pet profiles page
    await expect(page.url()).toContain('/pet-profiles');
    await expect(page.getByRole('heading', { name: 'My Pet Profiles', level: 1 })).toBeVisible();
    
    // Check that we can see existing pet profiles
    const profileCards = await page.locator('.profile-card').count();
    expect(profileCards).toBeGreaterThan(0);
    
    // Verify first profile has expected content
    await expect(page.locator('.profile-card').first().getByRole('heading')).toBeVisible();
  });

  test('should navigate to create new pet profile form', async ({ page }) => {
    // Navigate to pet profiles page
    await page.goto('/pet-profiles');
    
    // Click "Add New Pet Profile" button
    await page.getByRole('link', { name: 'Add New Pet Profile' }).click();
    
    // Verify we're on the form page
    await expect(page.url()).toContain('/pet-profiles/new');
    await expect(page.getByRole('heading', { name: 'Create Pet Profile', level: 1 })).toBeVisible();
    
    // Verify form fields are present
    await expect(page.getByLabel('Pet Name *')).toBeVisible();
    await expect(page.getByLabel('Pet Type *')).toBeVisible();
    await expect(page.getByLabel('Breed')).toBeVisible();
    await expect(page.getByLabel('Age (years)')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
  });

  test('should create a new pet profile', async ({ page }) => {
    // Navigate to create form
    await page.goto('/pet-profiles/new');
    
    // Fill in the form
    await page.getByLabel('Pet Name *').fill('Max');
    await page.getByLabel('Pet Type *').selectOption('dogs');
    await page.getByLabel('Breed').fill('Labrador');
    await page.getByLabel('Age (years)').fill('2');
    await page.getByLabel('Description').fill('Playful and energetic dog');
    
    // Submit the form
    await page.getByRole('button', { name: 'Create Profile' }).click();
    
    // Verify we're redirected back to the profiles list
    await expect(page.url()).toContain('/pet-profiles');
    await expect(page.url()).not.toContain('/new');
  });

  test('should navigate to edit pet profile', async ({ page }) => {
    // Navigate to pet profiles page
    await page.goto('/pet-profiles');
    
    // Click edit button on the first profile
    await page.locator('.profile-card').first().getByRole('link', { name: 'Edit' }).click();
    
    // Verify we're on the edit form page
    await expect(page.url()).toMatch(/\/pet-profiles\/\d+/);
    await expect(page.getByRole('heading', { name: 'Edit Pet Profile', level: 1 })).toBeVisible();
    
    // Verify form is pre-filled with existing data
    const nameInput = page.getByLabel('Pet Name *');
    await expect(nameInput).not.toHaveValue('');
  });

  test('should cancel form and return to profiles list', async ({ page }) => {
    // Navigate to create form
    await page.goto('/pet-profiles/new');
    
    // Click cancel button
    await page.getByRole('button', { name: 'Cancel' }).click();
    
    // Verify we're back on the profiles list
    await expect(page.url()).toContain('/pet-profiles');
    await expect(page.url()).not.toContain('/new');
    await expect(page.getByRole('heading', { name: 'My Pet Profiles', level: 1 })).toBeVisible();
  });
});
