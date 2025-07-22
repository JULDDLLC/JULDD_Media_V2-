import { supabase } from './supabase';

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Default ElevenLabs voice

// Demo mode when no ElevenLabs key is configured
const DEMO_MODE = !ELEVENLABS_API_KEY;

export const generateTTSAudio = async (text: string, filename: string): Promise<string | null> => {
  if (DEMO_MODE) {
    console.log('Demo mode: TTS generation skipped');
    return null;
  }

  try {
    // Check if audio already exists in Supabase storage
    const { data: existingFile } = await supabase.storage
      .from('audio')
      .list('tts', {
        search: filename
      });

    if (existingFile && existingFile.length > 0) {
      const { data } = supabase.storage
        .from('audio')
        .getPublicUrl(`tts/${filename}`);
      return data.publicUrl;
    }

    // Generate new TTS audio
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate TTS audio');
    }

    const audioBlob = await response.blob();
    
    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from('audio')
      .upload(`tts/${filename}`, audioBlob, {
        contentType: 'audio/mpeg'
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('audio')
      .getPublicUrl(`tts/${filename}`);

    return data.publicUrl;
  } catch (error) {
    console.error('TTS generation error:', error);
    return null;
  }
};

export const playTTSPreview = (text: string) => {
  if (DEMO_MODE) {
    // For demo purposes, use Web Speech API as fallback
    if ('speechSynthesis' in window) {
      // Stop any currently playing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      
      // Try to use a child-friendly voice if available
      const voices = speechSynthesis.getVoices();
      const childVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('child') || 
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('woman')
      );
      
      if (childVoice) {
        utterance.voice = childVoice;
      }
      
      speechSynthesis.speak(utterance);
    } else {
      alert(`🎵 Demo Mode - TTS Preview\n\n"${text}"\n\nTo enable ElevenLabs TTS, add your API key to the .env file.`);
    }
  } else {
    // Use ElevenLabs TTS in production
    generateTTSAudio(text, `preview-${Date.now()}.mp3`).then(audioUrl => {
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      }
    });
  }
};