/*
  # Add Blast Off Blues Song

  1. New Content
    - Add "Blast Off Blues" song to the songs table
    - Space-themed adventure song for young astronauts
    - Includes background image and audio file references

  2. Changes
    - Insert new song with order_index 5
    - Set background image to /SpaceImage.png
    - Set sample audio to /Space Song.mp3
*/

-- Insert the Blast Off Blues song
INSERT INTO songs (title, description, lyrics, background_image_url, sample_audio_url, order_index)
SELECT 
  'Blast Off Blues',
  'A space-age jam for little astronauts, blasting off into fun and imagination.',
  '# Blast Off Blues

**Verse 1:**
Put on my helmet  
Zip it up tight!  
Put on my helmet  
Ready to ride  
All strapped in  
And ready to go  
Astronauts  
Ready to explore  

**Chorus:**
Flyin'' to the moon!  
Rocket''s blasting off  
See the planets  
Passing by  
On our way  
Up to the sky

**Verse 2:**
Floating weightless,  
Looking around  
Hands held high  
Feet off the ground  
No more gravity  
Hear the engines sound  

Looking down at Earth we see  
Oceans blue and fish in the sea  
Moonquakes around us  
But what can you do?

**Verse 3:**
Can you see the craters now  
Big and deep all over the ground  
Like giant bowls  
Where the lunar rocks sleep  
We can see them  
Time to jump and leap!

**Verse 4:**
Heading back to Earth  
Time to head back  
Let''s all jump in  
Take the rocket for a spin  
All aboard our rocket ship  
Made of gray titanium!

**Final Verse:**
Back to Earth,  
Landing safe and sound  
Our feet and shoes  
Securely on the ground!',
  '/SpaceImage.png',
  '/Space Song.mp3',
  5
WHERE NOT EXISTS (
  SELECT 1 FROM songs WHERE title = 'Blast Off Blues'
);