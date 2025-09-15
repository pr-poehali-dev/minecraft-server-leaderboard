import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  username: string;
  avatar: string;
  message: string;
  timestamp: Date;
  userColor: string;
  rank: string;
}

interface ChatProps {
  userProfile: {
    nickname: string;
    avatar: string;
    profileColor: string;
    customColor?: string;
  };
  isRegistered: boolean;
}

const Chat = ({ userProfile, isRegistered }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: "ShadowHunter",
      avatar: "🔥",
      message: "Кто готов к рейтинговому матчу?",
      timestamp: new Date(Date.now() - 300000),
      userColor: "#00ff41",
      rank: "Diamond"
    },
    {
      id: 2,
      username: "NeonKnight",
      avatar: "⚡",
      message: "Давайте команду 4х4!",
      timestamp: new Date(Date.now() - 240000),
      userColor: "#ff0080",
      rank: "Diamond"
    },
    {
      id: 3,
      username: "CyberWolf",
      avatar: "🐺",
      message: "gg последняя игра, хорошая тактика",
      timestamp: new Date(Date.now() - 180000),
      userColor: "#00bfff",
      rank: "Gold"
    },
    {
      id: 4,
      username: "GameMaster",
      avatar: "👑",
      message: "Турнир начнётся через 30 минут! Регистрация открыта",
      timestamp: new Date(Date.now() - 120000),
      userColor: "#ffd700",
      rank: "Admin"
    },
    {
      id: 5,
      username: "PixelWarrior",
      avatar: "⚔️",
      message: "Кто может объяснить новую мета стратегию?",
      timestamp: new Date(Date.now() - 60000),
      userColor: "#c0c0c0",
      rank: "Silver"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isRegistered) return;

    const message: Message = {
      id: Date.now(),
      username: userProfile.nickname,
      avatar: userProfile.avatar,
      message: newMessage.trim(),
      timestamp: new Date(),
      userColor: userProfile.customColor || getColorByName(userProfile.profileColor),
      rank: "Новичок"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const getColorByName = (colorName: string): string => {
    const colors: Record<string, string> = {
      "neon-green": "#00ff41",
      "neon-pink": "#ff0080",
      "neon-blue": "#00bfff",
      "gold": "#ffd700",
      "silver": "#c0c0c0"
    };
    return colors[colorName] || "#00ff41";
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Admin": return "text-red-400 bg-red-400/20 border-red-400";
      case "Diamond": return "text-neon-blue bg-neon-blue/20 border-neon-blue";
      case "Gold": return "text-yellow-400 bg-yellow-400/20 border-yellow-400";
      case "Silver": return "text-gray-300 bg-gray-300/20 border-gray-300";
      default: return "text-gray-400 bg-gray-400/20 border-gray-400";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="bg-cyber-dark/80 border-neon-green/30 backdrop-blur-sm h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-neon-green flex items-center gap-2 font-['Orbitron']">
          <Icon name="MessageCircle" size={20} />
          ГЛОБАЛЬНЫЙ ЧАТ
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">{messages.length} сообщений</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-3 pb-4">
            {messages.map((message) => (
              <div key={message.id} className="group hover:bg-cyber-grey/20 p-2 rounded transition-colors">
                <div className="flex items-start gap-3">
                  <div className="text-lg flex-shrink-0">{message.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="font-semibold text-sm"
                        style={{ color: message.userColor }}
                      >
                        {message.username}
                      </span>
                      <Badge className={`text-xs px-1.5 py-0 ${getRankColor(message.rank)}`}>
                        {message.rank}
                      </Badge>
                      <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-200 break-words">
                      {message.message}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
        
        <div className="p-4 border-t border-gray-700/50">
          {isRegistered ? (
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="bg-cyber-grey/30 border-neon-green/30 text-white flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                maxLength={200}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-neon-green/20 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black px-3"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-gray-400 text-sm mb-2">
                Для участия в чате необходимо зарегистрироваться
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="text-neon-green border-neon-green hover:bg-neon-green hover:text-black"
              >
                Регистрация
              </Button>
            </div>
          )}
          
          {isRegistered && (
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Нажмите Enter для отправки</span>
              <span>{newMessage.length}/200</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;