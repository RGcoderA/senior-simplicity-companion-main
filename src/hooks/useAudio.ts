
import { useState, useEffect, useCallback } from 'react';

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Clean up any ongoing speech when component unmounts
    return () => {
      if (audio) {
        window.speechSynthesis.cancel();
      }
    };
  }, [audio]);

  const speak = useCallback((text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure utterance
    utterance.rate = 0.9; // Slightly slower rate for clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Get available voices and use a suitable one if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(voice => voice.lang.includes('en-'));
    
    if (englishVoices.length > 0) {
      // Prefer a female voice if available
      const femaleVoice = englishVoices.find(voice => voice.name.includes('Female') || voice.name.includes('female'));
      utterance.voice = femaleVoice || englishVoices[0];
    }
    
    // Set up event handlers
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    // Store the current utterance and play
    setAudio(utterance);
    window.speechSynthesis.speak(utterance);
    
    return utterance;
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else if (audio) {
      window.speechSynthesis.speak(audio);
      setIsPlaying(true);
    }
  }, [isPlaying, audio]);

  return {
    isPlaying,
    speak,
    togglePlayback
  };
};
