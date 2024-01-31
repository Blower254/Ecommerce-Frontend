// EmbedChatComponent.js

// Import necessary React components
import React from 'react';
import { FaComment } from 'react-icons/fa';
import './EmbeddedChat.css'; // Import external CSS file

// Create the EmbedChatComponent that includes the chat icon and iframe
const EmbedChatComponent = () => {
  const toggleChat = () => {
    const chatIframe = document.getElementById('chat-iframe');
    chatIframe.style.display = chatIframe.style.display === 'none' ? 'block' : 'none';
  };

  return (
    <div id="chat-container">
      {/* Chat icon using react-icons */}
      <FaComment
        id="chat-icon"
        onClick={toggleChat}
        aria-label="Toggle Chat"
      />
      
      {/* Embed the agent chat UI using iframe */}
      <iframe 
      id='chat-iframe'
      src="https://embed.fixie.ai/agents/b2776381-451a-4b7e-9012-d6da8af5483a?debug=1"
      allow="clipboard-write" 
      title="Agent Chat"
    />
    </div>
  );
};

// Export the component for use in other parts of your application
export default EmbedChatComponent;
