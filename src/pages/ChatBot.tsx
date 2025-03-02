
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { SendHorizontal, Bot, Sparkles, RefreshCw, User, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm FinGenius, your AI financial assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Basic response patterns - in a real app this would call an AI API
    let botResponse = '';
    
    if (userMessage.toLowerCase().includes('stock')) {
      botResponse = "Stock investments can be a great way to build wealth. Consider diversifying your portfolio and investing for the long term. Would you like some specific stock investment advice?";
    } else if (userMessage.toLowerCase().includes('budget') || userMessage.toLowerCase().includes('saving')) {
      botResponse = "Creating a budget is essential for financial health. The 50/30/20 rule is a good starting point - 50% for needs, 30% for wants, and 20% for savings and debt repayment. Would you like more budgeting tips?";
    } else if (userMessage.toLowerCase().includes('retire') || userMessage.toLowerCase().includes('retirement')) {
      botResponse = "Retirement planning should start early. Consider maximizing your 401(k) contributions, especially if your employer offers matching. IRAs and other tax-advantaged accounts can also be valuable tools.";
    } else if (userMessage.toLowerCase().includes('debt')) {
      botResponse = "When tackling debt, consider the avalanche method (paying highest interest first) or the snowball method (paying smallest balances first). Would you like me to elaborate on these strategies?";
    } else {
      botResponse = "That's an interesting question about finance. Would you like me to provide more specific information or resources on this topic?";
    }
    
    const newBotMessage: Message = {
      id: Date.now().toString(),
      content: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newBotMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    
    // Generate bot response
    generateBotResponse(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm FinGenius, your AI financial assistant. How can I help you today?",
        sender: 'bot',
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
                  "What are tax-advantaged investment accounts?"
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
                    <p className="text-xs text-muted-foreground">Your personal financial advisor</p>
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
              <div className="flex-grow overflow-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className={`h-8 w-8 ${message.sender === 'user' ? 'ml-2' : 'mr-2'} ${message.sender === 'user' ? 'bg-accent' : 'bg-primary'}`}>
                        {message.sender === 'user' ? 
                          <User className="h-4 w-4" /> : 
                          <Bot className="h-4 w-4" />
                        }
                      </Avatar>
                      <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-accent text-accent-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                
                <div ref={endOfMessagesRef} />
              </div>
              
              {/* Input area */}
              <div className="p-4 border-t">
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
                    disabled={inputMessage.trim() === '' || isTyping} 
                    className="ml-2"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  FinGenius provides general financial information, not personalized financial advice.
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
