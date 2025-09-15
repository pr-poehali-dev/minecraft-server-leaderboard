import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Index = () => {
  const topPlayers = [
    { name: "ShadowHunter", kills: 2847, wins: 892, rank: "Diamond", avatar: "🔥" },
    { name: "NeonKnight", kills: 2634, wins: 876, rank: "Diamond", avatar: "⚡" },
    { name: "CyberWolf", kills: 2456, wins: 823, rank: "Gold", avatar: "🐺" },
    { name: "GlowMaster", kills: 2298, wins: 789, rank: "Gold", avatar: "✨" },
    { name: "PixelWarrior", kills: 2156, wins: 756, rank: "Silver", avatar: "⚔️" }
  ];

  const serverStats = [
    { label: "Игроков онлайн", value: "847", icon: "Users" },
    { label: "Игр сегодня", value: "2,456", icon: "Gamepad2" },
    { label: "Всего убийств", value: "1.2M", icon: "Sword" },
    { label: "Побед сегодня", value: "892", icon: "Trophy" }
  ];

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Diamond": return "text-neon-blue bg-neon-blue/20 border-neon-blue";
      case "Gold": return "text-yellow-400 bg-yellow-400/20 border-yellow-400";
      case "Silver": return "text-gray-300 bg-gray-300/20 border-gray-300";
      default: return "text-gray-400 bg-gray-400/20 border-gray-400";
    }
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-cyber-dark/60 border-neon-green/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-neon-green flex items-center gap-2 font-['Orbitron']">
                <Icon name="Trophy" size={24} />
                ТОП-5 ИГРОКОВ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPlayers.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-cyber-grey/30 border border-gray-600/50 hover:border-neon-green/50 transition-all duration-300 group">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{player.avatar}</div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-neon-green transition-colors">
                          #{index + 1} {player.name}
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
        </div>

        <section className="mt-12">
          <Card className="bg-cyber-dark/60 border-neon-blue/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-neon-blue flex items-center gap-2 font-['Orbitron']">
                <Icon name="Settings" size={24} />
                КАСТОМИЗАЦИЯ ПРОФИЛЯ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Ранги и достижения</h3>
                  <div className="space-y-2">
                    <Badge className="text-neon-blue bg-neon-blue/20 border-neon-blue">Убийца</Badge>
                    <Badge className="text-neon-green bg-neon-green/20 border-neon-green">Защитник</Badge>
                    <Badge className="text-neon-pink bg-neon-pink/20 border-neon-pink">Строитель</Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Статистика</h3>
                  <div className="text-sm space-y-1 text-gray-300">
                    <div>K/D: <span className="text-neon-green">2.84</span></div>
                    <div>Винрейт: <span className="text-neon-blue">76%</span></div>
                    <div>Время в игре: <span className="text-neon-pink">247ч</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Настройки</h3>
                  <Button className="w-full bg-neon-green/20 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-300">
                    Редактировать профиль
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
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