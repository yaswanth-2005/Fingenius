import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  SendHorizontal,
  Bot,
  Sparkles,
  RefreshCw,
  User,
  Trash2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm FinGenius, your AI financial assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage: string) => {
    setIsTyping(true);

    try {
      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching response: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      const botResponse = data?.response || "I'm not sure about that.";

      setMessages((prev) => [...prev, { id: Date.now().toString(), content: botResponse, sender: "bot", timestamp: new Date() }]);
    } catch (error) {
      console.error("❌ Error generating bot response:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), content: error.message || "Sorry, an error occurred.", sender: "bot", timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");

    // Generate bot response
    generateBotResponse(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: "1",
        content:
          "Hello! I'm FinGenius, your AI financial assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    toast({
      title: "Conversation cleared",
      description: "Your chat history has been reset",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
            {/* Sidebar with suggested prompts */}
            <div className="hidden md:block md:col-span-1 bg-muted/30 rounded-lg p-4 overflow-auto">
              <h3 className="font-medium mb-4 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                Suggested Questions
              </h3>
              <div className="space-y-2">
                {[
                  "How do I start investing with $1000?",
                  "What's the difference between stocks and bonds?",
                  "How much should I save for retirement?",
                  "How can I improve my credit score?",
                  "What's the best way to pay off debt?",
                  "Should I invest in cryptocurrency?",
                  "How do I create a monthly budget?",
                  "What are tax-advantaged investment accounts?",
                ].map((prompt, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => {
                      setInputMessage(prompt);
                    }}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>

            {/* Main chat area */}
            <div className="col-span-1 md:col-span-3 flex flex-col h-full bg-card rounded-lg border">
              {/* Chat header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2 bg-primary">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">FinGenius Assistant</h3>
                    <p className="text-xs text-muted-foreground">
                      Your personal financial advisor
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearConversation}
                  title="Clear conversation"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex flex-col h-[350px] overflow-scroll">
                <div
                  ref={messagesContainerRef}
                  className="flex-grow overflow-y-auto p-4 space-y-4"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-[80%] ${
                          message.sender === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <Avatar
                          className={`h-8 w-8 ${
                            message.sender === "user" ? "ml-2" : "mr-2"
                          } ${
                            message.sender === "user"
                              ? "bg-accent"
                              : "bg-primary"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex">
                        <Avatar className="h-8 w-8 mr-2 bg-primary">
                          <Bot className="h-4 w-4" />
                        </Avatar>
                        <div className="rounded-lg p-3 bg-muted flex items-center">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span className="ml-2 text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <div ref={endOfMessagesRef} /> */}
                </div>
              </div>
              {/* Input area */}
              <div className="p-4 border-t bg-white sticky bottom-0">
                <div className="flex">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask a financial question..."
                    className="flex-grow resize-none"
                    rows={1}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === "" || isTyping}
                    className="ml-2"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  FinGenius provides personalized financial advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatBot;
