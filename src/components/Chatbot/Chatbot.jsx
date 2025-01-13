import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const loadChatbase = () => {
      if (!document.getElementById("2dVsx_d_GIEVQLvRkM-D5")) {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "2dVsx_d_GIEVQLvRkM-D5";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      }
    };

    const showChatbot = () => {
      const chatbotFrame = document.querySelector("iframe[src*='chatbase']");
      if (chatbotFrame) {
        chatbotFrame.style.display = 'block';
      }
    };

    const hideChatbot = () => {
      const chatbotFrame = document.querySelector("iframe[src*='chatbase']");
      if (chatbotFrame) {
        chatbotFrame.style.display = 'none';
      }
    };

    loadChatbase();

    window.showChatbot = showChatbot;
    window.hideChatbot = hideChatbot;
  }, []);

  return null;
};

export default Chatbot;
