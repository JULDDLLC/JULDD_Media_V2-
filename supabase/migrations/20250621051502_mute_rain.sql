/*
  # Update Team Member Profile Images

  1. Updates
    - Update all cofounder avatar_url fields to use local profile images
    - Use the images that were uploaded to the public folder

  2. Changes
    - Dan: /dan-profile.jpg
    - Julie: /julie-profile.jpg  
    - Vicki: /vicki-profile.jpg
    - Morgen: /morgen-profile.jpg
*/

-- Update avatar URLs to use local profile images
UPDATE cofounders SET avatar_url = '/dan-profile.jpg' WHERE name = 'Dan';
UPDATE cofounders SET avatar_url = '/julie-profile.jpg' WHERE name = 'Julie';
UPDATE cofounders SET avatar_url = '/vicki-profile.jpg' WHERE name = 'Vicki (Ruh-Roh)';
UPDATE cofounders SET avatar_url = '/morgen-profile.jpg' WHERE name = 'Morgen';