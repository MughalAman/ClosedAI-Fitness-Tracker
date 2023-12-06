import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useState } from "react";

const API_KEY = import.meta.env.VITE_CHAT_GPT_API_KEY;

function ChatBot({ closeChat, strings, isChatOpen }) {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hi, I am fitbot by closedAI. How can I help you?",
            sender: 'ChatGPT'
        }
    ]);

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

 async function processMessageToBot(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
        let role = "";
        if (messageObject.sender === "ChatGPT") {
            role = "assistant";
        }else {
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

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
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
                    <MessageInput placeholder="Type message here" onSend={handleSend} />
                 </ChatContainer>
                </MainContainer>
            )}
        </div>
    );
}

export default ChatBot