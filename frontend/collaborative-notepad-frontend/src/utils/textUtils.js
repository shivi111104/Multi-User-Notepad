export const summarizeText = (text) => {
    const sentences = text.split('.');
    if (sentences.length <= 2) return text;
    return sentences.filter((_, i) => i % 2 === 0).join('. ') + '.';
  };
  
  export const startSpeechRecognition = (setContent) => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition not supported.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setContent(prev => prev + " " + transcript);
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };
  
    recognition.start();
  };
  