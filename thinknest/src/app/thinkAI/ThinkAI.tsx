"use client"

import HeaderTitle from '@/components/HeaderTitle'
import React, { useState } from 'react'
import "./App.css";
import { marked } from 'marked';
import { useAuth } from '@/lib/AuthContext';

const ThinkAI = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string; isLoading?: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const dropdown = "/assets/icons/dropdown.svg";

  const sendMessage = async (message: string = input) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setIsLoading(true);

    // Temporäre Lade-Nachricht
    setMessages((prev) => [
      ...prev,
      { text: "StudyAI schreibt", sender: "bot", isLoading: true },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error("Anfrage fehlgeschlagen");
      }

      const data = await response.json();
      const reply = data.reply || "Keine Antwort erhalten";

      // Entferne die Lade-Nachricht
      setMessages((prev) => prev.slice(0, -1));

      // Füge die Antwort als Tipp-Animation hinzu
      let i = 0;
      const animatedReply = { text: "", sender: "bot" };

      const interval = setInterval(() => {
        if (i < reply.length) {
          animatedReply.text += reply[i];
          setMessages((prev) => [...prev.slice(0, -1), { ...animatedReply }]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 10); // Geschwindigkeit der Animation (50ms pro Buchstabe)

      setMessages((prev) => [...prev, animatedReply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "Fehler: " + (error instanceof Error ? error.message : "Unbekannter Fehler"), sender: "bot" },
      ]);
    }

    setIsLoading(false);
    setInput("");
    setShowButtons(false); // Verstecke die Schaltflächen nach dem Senden einer Nachricht
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="">
      <HeaderTitle title="NestMind" />
      <div className='nestmind'>
        <div className="row">
          <div className="p-4">

            <div className="container d-flex justify-content-center">
              <div className="chat-box-container d-none d-lg-block">
                <div className="bg-light p-3 rounded shadow chat-box dark:bg-gray-600">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${msg.sender} border-black dark:border-gray-500 cloud border rounded-lg m-4 p-1`}
                      style={{
                        alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                        maxWidth: msg.text.length < 20 ? "fit-content" : "90%",
                        padding: "10px",
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.sender === "user" ? "You: " : "NestMind: "}
                      {msg.isLoading ? (
                        <span className="loading-text">
                          ThinkAI schreibt<span className="dots">...</span>
                        </span>
                      ) : (
                        <span dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="input-box mt-5 w-full flex gap-2 flex-1 rounded" style={{ marginBottom: "20px" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="h-10 w-[80%] p-2 border rounded dark:bg-gray-600"
              />
              <button onClick={() => sendMessage()} className="p-2 bg-black text-white rounded w-[9%]">Send</button>
            </div>

            <div className="button-box mt-2 w-full flex gap-2 flex-1 rounded">
              <button onClick={() => setShowButtons(!showButtons)} className={`p-2 border-none w-12 h-12 transform transition-transform duration-300 ${showButtons ? 'rotate-90' : ''}`}>
                <img src={dropdown} alt="Dropdown" />
              </button>
            </div>

            {showButtons && (
              <div className="button-box mt-2 w-full flex gap-2 flex-1 rounded">
                <button onClick={() => sendMessage("Wie kann ich effektiver lernen?")} className="flex-grow p-2 bg-green-600 text-black rounded-xl text-rounded">Wie kann ich effektiver lernen?</button>
                <button onClick={() => sendMessage("Wie kann ich stundenlang konzentriert bleiben?")} className="flex-grow p-2 bg-green-600 text-black rounded-xl">Wie kann ich stundenlang konzentriert bleiben?</button>
                <button onClick={() => sendMessage("Ich fühle mich alleine 😞 kann ich mit dir reden bitte")} className="flex-grow p-2 bg-green-600 text-black rounded-xl">IIch fühle mich alleine 😞 kann ich mit dir reden bitte</button>
              </div>
            )}
          </div>
          <button onClick={clearChat} className="p-2 bg-red-500 text-white rounded mt-6">Clear Chat</button>
        </div>
      </div>
    </div>
  )
}

export default ThinkAI;