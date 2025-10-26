// ChatBox Component - AI Chat Interface with Accept/Edit/Send Flow
// Used for both AI Mentor and Bargain Bot
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RotateCw, Edit3, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStore, type ChatMessage } from '@/store/useAppStore';
import { generateAutoReply } from '@/lib/aiMockEnhanced';

interface ChatBoxProps {
  botType: 'mentor' | 'bargain';
  botName: string;
  botAvatar: string;
  placeholder?: string;
}

export const ChatBox = ({ botType, botName, botAvatar, placeholder }: ChatBoxProps) => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoReply, setAutoReply] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReply, setEditedReply] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get chat history from store
  const messages = useAppStore(state => 
    botType === 'mentor' ? state.mentorChat : state.bargainChat
  );
  const addMessage = useAppStore(state => 
    botType === 'mentor' ? state.addMentorMessage : state.addBargainMessage
  );

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, autoReply]);

  // Send user message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    addMessage(userMessage);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const reply = generateAutoReply(botType, input);
      setAutoReply(reply.text);
      setEditedReply(reply.text);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds
  };

  // Accept and send auto-generated reply
  const handleAcceptReply = () => {
    if (!autoReply) return;

    const aiMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'ai',
      content: editedReply,
      timestamp: new Date().toISOString()
    };

    addMessage(aiMessage);
    setAutoReply(null);
    setIsEditing(false);
    setEditedReply('');
  };

  // Regenerate auto-reply
  const handleRegenerate = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
    if (!lastUserMessage) return;

    const reply = generateAutoReply(botType, lastUserMessage.content);
    setAutoReply(reply.text);
    setEditedReply(reply.text);
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedReply(autoReply || '');
    }
  };

  return (
    <Card className="flex flex-col h-[600px] max-h-[80vh]">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Avatar className="h-10 w-10">
          <img src={botAvatar} alt={botName} />
        </Avatar>
        <div>
          <h3 className="font-semibold">{botName}</h3>
          <p className="text-xs text-muted-foreground">
            {isTyping ? t('ai.typing') : 'Online'}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <Avatar className="h-8 w-8 flex-shrink-0">
                <img 
                  src={message.sender === 'user' 
                    ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=User' 
                    : botAvatar
                  } 
                  alt={message.sender} 
                />
              </Avatar>
              <div className={`rounded-2xl px-4 py-2 ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              <Avatar className="h-8 w-8">
                <img src={botAvatar} alt={botName} />
              </Avatar>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auto-Generated Reply Card */}
        <AnimatePresence>
          {autoReply && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="border-2 border-primary rounded-lg p-4 bg-primary/5"
            >
              <p className="text-xs font-medium text-primary mb-2">Suggested Reply:</p>
              
              {isEditing ? (
                <Textarea
                  value={editedReply}
                  onChange={(e) => setEditedReply(e.target.value)}
                  className="mb-3 min-h-[100px]"
                />
              ) : (
                <p className="text-sm mb-3 whitespace-pre-wrap">{editedReply}</p>
              )}

              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  onClick={handleAcceptReply}
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  {isEditing ? t('ai.editSend') : t('ai.acceptSend')}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={toggleEdit}
                  className="gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  {isEditing ? 'Preview' : 'Edit'}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRegenerate}
                  className="gap-2"
                >
                  <RotateCw className="h-4 w-4" />
                  {t('ai.regenerate')}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={placeholder || t('ai.sendMessage')}
            className="resize-none min-h-[60px]"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping || !!autoReply}
            size="icon"
            className="h-[60px] w-[60px]"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
