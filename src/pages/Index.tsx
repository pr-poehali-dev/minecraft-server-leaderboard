import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import Chat from "@/components/Chat";
import ColorPicker from "@/components/ColorPicker";
import VisualEffects from "@/components/VisualEffects";
import BackgroundSelector from "@/components/BackgroundSelector";

const Index = () => {
  const [userProfile, setUserProfile] = useState({
    nickname: "",
    avatar: "🔥",
    profileColor: "neon-green",
    customColor: "#00ff41",
    bio: "",
    favoriteMode: "ranked",
    effects: {
      glow: false,
      glowColor: "#00ff41",
      glowIntensity: 5,
      animation: "none",
      shadow: false,
      shadowColor: "#000000",
      textEffect: "none",
      particles: false
    },
    background: {
      type: "solid",
      gradient: {
        colors: ["#1a1a2e"],
        direction: "to right"
      },
      pattern: "dots",
      opacity: 80,
      animation: "none"
    }
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const topPlayers = [
    { id: 1, name: "ShadowHunter", kills: 2847, wins: 892, rank: "Diamond", avatar: "🔥", kd: 2.84, winrate: 76, playtime: "247ч", bio: "Профессиональный убийца в BedWars", achievements: ["Убийца", "Защитник"] },
    { id: 2, name: "NeonKnight", kills: 2634, wins: 876, rank: "Diamond", avatar: "⚡", kd: 2.73, winrate: 78, playtime: "289ч", bio: "Молниеносные атаки", achievements: ["Строитель", "Снайпер"] },
    { id: 3, name: "CyberWolf", kills: 2456, wins: 823, rank: "Gold", avatar: "🐺", kd: 2.45, winrate: 71, playtime: "198ч", bio: "Одинокий волк арены", achievements: ["Убийца"] },
    { id: 4, name: "GlowMaster", kills: 2298, wins: 789, rank: "Gold", avatar: "✨", kd: 2.32, winrate: 69, playtime: "156ч", bio: "Мастер световых эффектов", achievements: ["Защитник", "Строитель"] },
    { id: 5, name: "PixelWarrior", kills: 2156, wins: 756, rank: "Silver", avatar: "⚔️", kd: 2.18, winrate: 67, playtime: "134ч", bio: "Пиксельный воин", achievements: ["Новичок"] }
  ];

  const serverStats = [
    { label: "Игроков онлайн", value: "847", icon: "Users" },
    { label: "Игр сегодня", value: "2,456", icon: "Gamepad2" },
    { label: "Всего убийств", value: "1.2M", icon: "Sword" },
    { label: "Побед сегодня", value: "892", icon: "Trophy" }
  ];

  const avatarOptions = ["🔥", "⚡", "🐺", "✨", "⚔️", "🎯", "💀", "👑", "🛡️", "🏹", "⭐", "💎"];
  const colorOptions = [
    { name: "neon-green", label: "Неон зелёный", class: "text-neon-green" },
    { name: "neon-pink", label: "Неон розовый", class: "text-neon-pink" },
    { name: "neon-blue", label: "Неон синий", class: "text-neon-blue" },
    { name: "gold", label: "Золотой", class: "text-yellow-400" },
    { name: "silver", label: "Серебряный", class: "text-gray-300" }
  ];

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Diamond": return "text-neon-blue bg-neon-blue/20 border-neon-blue";
      case "Gold": return "text-yellow-400 bg-yellow-400/20 border-yellow-400";
      case "Silver": return "text-gray-300 bg-gray-300/20 border-gray-300";
      default: return "text-gray-400 bg-gray-400/20 border-gray-400";
    }
  };

  const handleRegister = () => {
    if (userProfile.nickname.trim()) {
      setIsRegistered(true);
    }
  };

  const PlayerProfileModal = ({ player }: { player: typeof topPlayers[0] }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full p-3 rounded-lg bg-cyber-grey/30 border border-gray-600/50 hover:border-neon-green/50 transition-all duration-300 group">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{player.avatar}</div>
              <div>
                <div className="font-semibold text-white group-hover:text-neon-green transition-colors text-left">
                  #{topPlayers.indexOf(player) + 1} {player.name}
                </div>
                <Badge className={`text-xs ${getRankColor(player.rank)}`}>
                  {player.rank}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-neon-green font-bold">{player.kills} убийств</div>
              <div className="text-gray-400 text-sm">{player.wins} побед</div>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-cyber-dark border-neon-green/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-neon-green font-['Orbitron'] flex items-center gap-3">
            <span className="text-3xl">{player.avatar}</span>
            {player.name}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {player.bio}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Card className="bg-cyber-grey/30 border-neon-green/30">
            <CardHeader>
              <CardTitle className="text-lg text-neon-green">Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Убийства:</span>
                <span className="text-neon-green font-bold">{player.kills}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Победы:</span>
                <span className="text-neon-blue font-bold">{player.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">K/D:</span>
                <span className="text-neon-pink font-bold">{player.kd}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Винрейт:</span>
                <span className="text-yellow-400 font-bold">{player.winrate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Время в игре:</span>
                <span className="text-white font-bold">{player.playtime}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cyber-grey/30 border-neon-pink/30">
            <CardHeader>
              <CardTitle className="text-lg text-neon-pink">Достижения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge className={`${getRankColor(player.rank)} mb-2`}>
                  {player.rank}
                </Badge>
                {player.achievements.map((achievement, index) => (
                  <Badge key={index} className="mr-2 text-neon-blue bg-neon-blue/20 border-neon-blue">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-grey dark">
      <nav className="border-b border-neon-green/30 bg-cyber-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent font-['Orbitron']">
                BEDWARS PRO
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-neon-green hover:text-neon-green hover:bg-neon-green/10">
                  Главная
                </Button>
                <Button variant="ghost" className="text-white hover:text-neon-green hover:bg-neon-green/10">
                  Рейтинг
                </Button>
                <Button variant="ghost" className="text-white hover:text-neon-green hover:bg-neon-green/10">
                  Статистика
                </Button>
                <Button variant="ghost" className="text-white hover:text-neon-green hover:bg-neon-green/10">
                  Профили
                </Button>
              </div>
              
              {!isRegistered ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-neon-green/20 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-300">
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Регистрация
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-cyber-dark border-neon-green/30 text-white max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-neon-green font-['Orbitron']">
                        Регистрация игрока
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Создай свой уникальный профиль на сервере BedWars Pro
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Tabs defaultValue="basic" className="mt-4">
                      <TabsList className="bg-cyber-grey/30 border-neon-green/30 w-full">
                        <TabsTrigger value="basic" className="text-white text-xs">Основное</TabsTrigger>
                        <TabsTrigger value="colors" className="text-white text-xs">Цвета</TabsTrigger>
                        <TabsTrigger value="effects" className="text-white text-xs">Эффекты</TabsTrigger>
                        <TabsTrigger value="background" className="text-white text-xs">Фон</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="basic" className="space-y-4">
                        <div>
                          <Label htmlFor="nickname" className="text-white">Никнейм</Label>
                          <Input
                            id="nickname"
                            value={userProfile.nickname}
                            onChange={(e) => setUserProfile({...userProfile, nickname: e.target.value})}
                            placeholder="Введи свой никнейм"
                            className="bg-cyber-grey/30 border-neon-green/30 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-white">Аватар</Label>
                          <div className="grid grid-cols-6 gap-2 mt-2">
                            {avatarOptions.map((avatar) => (
                              <Button
                                key={avatar}
                                variant="outline"
                                size="sm"
                                className={`text-2xl h-12 ${userProfile.avatar === avatar ? 'border-neon-green bg-neon-green/20' : 'border-gray-600'}`}
                                onClick={() => setUserProfile({...userProfile, avatar})}
                              >
                                {avatar}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="colors" className="space-y-4">
                        <ColorPicker
                          value={userProfile.customColor}
                          onChange={(color) => setUserProfile({...userProfile, customColor: color})}
                          label="Кастомный цвет никнейма"
                        />
                      </TabsContent>
                      
                      <TabsContent value="effects" className="space-y-4">
                        <VisualEffects
                          effects={userProfile.effects}
                          onChange={(effects) => setUserProfile({...userProfile, effects})}
                        />
                      </TabsContent>
                      
                      <TabsContent value="background" className="space-y-4">
                        <BackgroundSelector
                          background={userProfile.background}
                          onChange={(background) => setUserProfile({...userProfile, background})}
                        />
                      </TabsContent>
                    </Tabs>
                    
                    <Button 
                      onClick={handleRegister} 
                      className="w-full bg-neon-green/20 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black mt-4"
                      disabled={!userProfile.nickname.trim()}
                    >
                      Создать профиль
                    </Button>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-neon-blue/20 border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300"
                      style={{ color: userProfile.customColor }}
                    >
                      <span className="text-xl mr-2">{userProfile.avatar}</span>
                      {userProfile.nickname}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-cyber-dark border-neon-blue/30 text-white max-w-4xl">
                    <DialogHeader>
                      <DialogTitle 
                        className="text-2xl font-bold font-['Orbitron'] flex items-center gap-3"
                        style={{ color: userProfile.customColor }}
                      >
                        <span className="text-3xl">{userProfile.avatar}</span>
                        {userProfile.nickname}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <Tabs defaultValue="profile" className="mt-4">
                      <TabsList className="bg-cyber-grey/30 border-neon-blue/30">
                        <TabsTrigger value="profile" className="text-white">Профиль</TabsTrigger>
                        <TabsTrigger value="customize" className="text-white">Кастомизация</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="profile" className="space-y-4">
                        <Card className="bg-cyber-grey/30 border-neon-blue/30">
                          <CardHeader>
                            <CardTitle className="text-lg text-neon-blue">Ваша статистика</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Убийства:</span>
                              <span className="text-neon-green font-bold">0</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Победы:</span>
                              <span className="text-neon-blue font-bold">0</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Ранг:</span>
                              <Badge className="text-gray-400 bg-gray-400/20 border-gray-400">Новичок</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="customize" className="space-y-4">
                        <Tabs defaultValue="basic" className="w-full">
                          <TabsList className="bg-cyber-grey/30 border-neon-blue/30 w-full">
                            <TabsTrigger value="basic" className="text-white text-xs">Основное</TabsTrigger>
                            <TabsTrigger value="colors" className="text-white text-xs">Цвета</TabsTrigger>
                            <TabsTrigger value="effects" className="text-white text-xs">Эффекты</TabsTrigger>
                            <TabsTrigger value="background" className="text-white text-xs">Фон</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="basic" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-white">Аватар</Label>
                                <div className="grid grid-cols-6 gap-2 mt-2">
                                  {avatarOptions.map((avatar) => (
                                    <Button
                                      key={avatar}
                                      variant="outline"
                                      size="sm"
                                      className={`text-2xl h-12 ${userProfile.avatar === avatar ? 'border-neon-blue bg-neon-blue/20' : 'border-gray-600'}`}
                                      onClick={() => setUserProfile({...userProfile, avatar})}
                                    >
                                      {avatar}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <Label className="text-white">Цвет профиля</Label>
                                <Select value={userProfile.profileColor} onValueChange={(value) => setUserProfile({...userProfile, profileColor: value})}>
                                  <SelectTrigger className="bg-cyber-grey/30 border-neon-blue/30 text-white mt-2">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-cyber-dark border-neon-blue/30">
                                    {colorOptions.map((color) => (
                                      <SelectItem key={color.name} value={color.name} className="text-white">
                                        <span className={color.class}>{color.label}</span>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="colors" className="space-y-4">
                            <ColorPicker
                              value={userProfile.customColor}
                              onChange={(color) => setUserProfile({...userProfile, customColor: color})}
                              label="Кастомный цвет никнейма"
                            />
                          </TabsContent>
                          
                          <TabsContent value="effects" className="space-y-4">
                            <VisualEffects
                              effects={userProfile.effects}
                              onChange={(effects) => setUserProfile({...userProfile, effects})}
                            />
                          </TabsContent>
                          
                          <TabsContent value="background" className="space-y-4">
                            <BackgroundSelector
                              background={userProfile.background}
                              onChange={(background) => setUserProfile({...userProfile, background})}
                            />
                          </TabsContent>
                        </Tabs>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <div className="relative mb-8">
            <img 
              src="/img/16d83bd4-2e0d-4423-97d4-c6fafc1af56b.jpg" 
              alt="BedWars Hero" 
              className="w-full h-64 object-cover rounded-lg border border-neon-green/30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 to-transparent rounded-lg"></div>
            <div className="absolute bottom-6 left-6">
              <h1 className="text-4xl md:text-6xl font-black text-neon-green animate-neon-pulse font-['Orbitron']">
                BEDWARS
              </h1>
              <p className="text-xl text-white/80 mt-2">
                Киберспортивные баттлы в Майнкрафт
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {serverStats.map((stat, index) => (
            <Card key={index} className="bg-cyber-dark/60 border-neon-green/30 backdrop-blur-sm hover:bg-cyber-dark/80 transition-all duration-300 hover:border-neon-green/50 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]">
              <CardContent className="p-6 text-center">
                <Icon name={stat.icon as any} size={32} className="text-neon-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-cyber-dark/60 border-neon-green/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-neon-green flex items-center gap-2 font-['Orbitron']">
                <Icon name="Trophy" size={24} />
                ТОП-5 ИГРОКОВ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPlayers.map((player) => (
                  <PlayerProfileModal key={player.id} player={player} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cyber-dark/60 border-neon-pink/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-neon-pink flex items-center gap-2 font-['Orbitron']">
                <Icon name="BarChart3" size={24} />
                СТАТИСТИКА СЕРВЕРА
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Загрузка сервера</span>
                  <span className="text-neon-pink">84%</span>
                </div>
                <Progress value={84} className="h-2 bg-gray-700" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Активные игры</span>
                  <span className="text-neon-blue">67%</span>
                </div>
                <Progress value={67} className="h-2 bg-gray-700" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Рейтинговые матчи</span>
                  <span className="text-neon-green">92%</span>
                </div>
                <Progress value={92} className="h-2 bg-gray-700" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 rounded-lg bg-cyber-grey/30 border border-neon-pink/30">
                  <div className="text-2xl font-bold text-neon-pink">156</div>
                  <div className="text-xs text-gray-400">Игр в час</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-cyber-grey/30 border border-neon-blue/30">
                  <div className="text-2xl font-bold text-neon-blue">3.2</div>
                  <div className="text-xs text-gray-400">Ср. длительность</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-1">
            <Chat 
              userProfile={userProfile} 
              isRegistered={isRegistered} 
            />
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-neon-green/30 bg-cyber-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-neon-green font-['Orbitron'] text-lg mb-2">BEDWARS PRO</div>
          <div className="text-gray-400 text-sm">
            Лучший сервер для киберспортивного BedWars
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;