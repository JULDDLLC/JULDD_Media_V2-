/*
  # Update Creative Team Members

  1. Updates
    - Replace existing cofounders with new team members
    - Add detailed bios and professional information
    - Update order and structure

  2. New Team Members
    - Dan - Composer, educator, disability advocate
    - Julie - Founder, AI creative designer
    - Vicki (Ruh-Roh) - AI Enthusiast, automation expert
    - Morgen - AI Tool Informant, crypto team leader
*/

-- Clear existing cofounders
DELETE FROM cofounders;

-- Insert new team members
INSERT INTO cofounders (name, title, bio, avatar_url, order_index) VALUES
  (
    'Dan', 
    'Composer & Chief Academic Officer', 
    'I am a composer, performer, educator and disability advocate. I am the Chief Academic Officer for the David Z Foundation where we transform lives through the magic of music. BA in Vocal Performance, MA in Music Composition, Education Specialist credentialed in special education for students with extensive support needs. I love to see people connect, learn and grow.',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    1
  ),
  (
    'Julie', 
    'Founder & Creative Director', 
    'Founder of JULDD LLC. Designer and creative using AI to create art, animations, music, websites, and full stack apps. Passionate about pushing the boundaries of what''s possible with artificial intelligence and creative technology.',
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    2
  ),
  (
    'Vicki (Ruh-Roh)', 
    'AI Enthusiast & Automation Expert', 
    'AI Enthusiast | Automation Expert | Information/Knowledge Management Consultant | Always Learning. Specializing in streamlining processes and leveraging AI for maximum efficiency and innovation.',
    'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
    3
  ),
  (
    'Morgen', 
    'AI Tool Informant & Crypto Team Leader', 
    'Your AI Tool Informant. Keeping you updated with one tool at a time. Created by @morgenvictoria3. Leading women''s crypto team in Defcon7 https://defcon-7.com. Expert in emerging AI technologies and blockchain innovation.',
    'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    4
  );