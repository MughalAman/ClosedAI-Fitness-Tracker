import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useState } from "react";
import localizationData from '../assets/localization.json';
import LocalizedStrings from 'react-localization';
import React, { useEffect } from 'react';

const API_KEY = import.meta.env.VITE_CHAT_GPT_API_KEY;

/**
 * React component for a fitness chatbot.
 * @module ChatBot
 * @param {Object} props - React component props.
 * @param {function} props.closeChat - Function to close the chat.
 * @param {Object} props.strings - Localized strings for the chat.
 * @param {boolean} props.isChatOpen - Flag indicating whether the chat is open.
 * @returns {JSX.Element} JSX element representing the ChatBot component.
 */
function ChatBot({ closeChat, isChatOpen }) {
    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem("selectedLanguage") || "en"
      );
    const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

    useEffect(() => {
      async function fetchData() {
        const lang = selectedLanguage; // Call the getLanguage function
        setSelectedLanguage(lang); // Set the selected language based on the result
        setStrings((prevStrings) => {
          const newStrings = new LocalizedStrings(localizationData);
          newStrings.setLanguage(lang);
          return newStrings;
        });
      }
    
      fetchData();
    }, []);
    if (selectedLanguage === 'tr') {
        strings.setLanguage('tr');
    } else if (selectedLanguage === 'en') {
        strings.setLanguage('en');
    } else {
        strings.setLanguage('ru');
    }
    /**
     * State for typing indicator and chat messages.
     * @type {[boolean, function]}
     */
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: strings.chatbot,
            sender: 'ChatGPT'
        }
    ]);

    /**
     * Handles sending a user message to the chatbot.
     * @param {string} message - User's message.
     * @async
     * @function
     */
    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing'
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        setTyping(true);

        await processMessageToBot(newMessages);
    }

    /**
        * Processes the chat messages and sends them to the chatbot for a response.
        * @param {Object[]} chatMessages - Array of chat message objects.
        * @async
        * @function
        */
    async function processMessageToBot(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }

            return {
                role: role,
                content: messageObject.message
            };
        });

        const systemMessage = {
            role: "system",
            content: "You are a fitness coach and answer to all questions regarding fitness, workouts, diets and exercises in a professional manner."
        };

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: 'ChatGPT'
            }]);
            setTyping(false);
        });
    }

    /**
       * JSX representing the ChatBot component.
       * @returns {JSX.Element} JSX element representing the ChatBot component.
       */
    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '47%',
                transform: 'translate(-50%, -50%)',
                width: '400px', // Adjust width as needed
                height: '600px', // Adjust height as needed
                display: isChatOpen ? 'block' : 'none',
            }}
        >
            {isChatOpen && (
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={typing ? <TypingIndicator content="Typing..." /> : null}
                        >
                            {messages.map((message, index) => (
                                <Message key={index} model={message} />
                            ))}
                        </MessageList>
                        <MessageInput placeholder= {strings.typemessage} onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            )}
        </div>
    );
}

export default ChatBot