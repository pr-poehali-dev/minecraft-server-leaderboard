import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

interface VisualEffectsProps {
  effects: {
    glow: boolean;
    glowColor: string;
    glowIntensity: number;
    animation: string;
    shadow: boolean;
    shadowColor: string;
    textEffect: string;
    particles: boolean;
  };
  onChange: (effects: any) => void;
}

const VisualEffects = ({ effects, onChange }: VisualEffectsProps) => {
  const animationOptions = [
    { value: "none", label: "Без анимации" },
    { value: "pulse", label: "Пульсация" },
    { value: "bounce", label: "Подпрыгивание" },
    { value: "shake", label: "Дрожание" },
    { value: "rotate", label: "Вращение" },
    { value: "float", label: "Плавание" },
    { value: "glow-pulse", label: "Пульсирующее свечение" },
    { value: "rainbow", label: "Радуга" }
  ];

  const textEffectOptions = [
    { value: "none", label: "Обычный текст" },
    { value: "neon", label: "Неоновый" },
    { value: "gradient", label: "Градиент" },
    { value: "chrome", label: "Хромированный" },
    { value: "fire", label: "Огненный" },
    { value: "ice", label: "Ледяной" },
    { value: "electric", label: "Электрический" }
  ];

  const glowColors = [
    "#00ff41", "#ff0080", "#00bfff", "#8000ff", 
    "#ffff00", "#ff4500", "#ff0040", "#00ffff"
  ];

  const updateEffect = (key: string, value: any) => {
    onChange({ ...effects, [key]: value });
  };

  const getPreviewStyle = () => {
    const styles: any = {
      display: 'inline-block',
      padding: '8px 16px',
      borderRadius: '4px',
      fontSize: '18px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    };

    // Основной цвет текста
    if (effects.textEffect === 'neon') {
      styles.color = effects.glowColor;
      styles.textShadow = `0 0 10px ${effects.glowColor}`;
    } else if (effects.textEffect === 'gradient') {
      styles.background = `linear-gradient(45deg, ${effects.glowColor}, #ffffff)`;
      styles.WebkitBackgroundClip = 'text';
      styles.WebkitTextFillColor = 'transparent';
    } else if (effects.textEffect === 'chrome') {
      styles.background = 'linear-gradient(45deg, #c0c0c0, #ffffff, #c0c0c0)';
      styles.WebkitBackgroundClip = 'text';
      styles.WebkitTextFillColor = 'transparent';
    } else if (effects.textEffect === 'fire') {
      styles.background = 'linear-gradient(45deg, #ff0000, #ff8000, #ffff00)';
      styles.WebkitBackgroundClip = 'text';
      styles.WebkitTextFillColor = 'transparent';
    } else if (effects.textEffect === 'ice') {
      styles.background = 'linear-gradient(45deg, #00bfff, #ffffff, #87ceeb)';
      styles.WebkitBackgroundClip = 'text';
      styles.WebkitTextFillColor = 'transparent';
    } else if (effects.textEffect === 'electric') {
      styles.color = '#00ffff';
      styles.textShadow = '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff';
    }

    // Свечение
    if (effects.glow) {
      const intensity = effects.glowIntensity / 10;
      styles.boxShadow = `0 0 ${intensity * 20}px ${effects.glowColor}`;
    }

    // Тень
    if (effects.shadow) {
      styles.filter = `drop-shadow(3px 3px 6px ${effects.shadowColor})`;
    }

    // Анимации
    if (effects.animation !== 'none') {
      styles.animation = `${effects.animation} 2s infinite`;
    }

    return styles;
  };

  return (
    <div className="space-y-6">
      {/* Превью эффектов */}
      <Card className="bg-cyber-grey/30 border-gray-600">
        <CardContent className="p-6 text-center">
          <Label className="text-white mb-4 block">Превью эффектов</Label>
          <div 
            style={getPreviewStyle()}
            className="inline-block"
          >
            YourNickname
          </div>
        </CardContent>
      </Card>

      {/* Эффект текста */}
      <div>
        <Label className="text-white mb-2 block">Эффект текста</Label>
        <Select 
          value={effects.textEffect} 
          onValueChange={(value) => updateEffect('textEffect', value)}
        >
          <SelectTrigger className="bg-cyber-grey/30 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-cyber-dark border-gray-600">
            {textEffectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-white">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Анимация */}
      <div>
        <Label className="text-white mb-2 block">Анимация</Label>
        <Select 
          value={effects.animation} 
          onValueChange={(value) => updateEffect('animation', value)}
        >
          <SelectTrigger className="bg-cyber-grey/30 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-cyber-dark border-gray-600">
            {animationOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-white">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Свечение */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-white">Свечение</Label>
          <Button
            variant={effects.glow ? "default" : "outline"}
            size="sm"
            onClick={() => updateEffect('glow', !effects.glow)}
            className="text-xs"
          >
            {effects.glow ? "ВКЛ" : "ВЫКЛ"}
          </Button>
        </div>
        
        {effects.glow && (
          <div className="space-y-3">
            <div>
              <Label className="text-white text-sm">Цвет свечения</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {glowColors.map((color) => (
                  <Button
                    key={color}
                    variant="outline"
                    size="sm"
                    className={`h-8 ${effects.glowColor === color ? 'ring-2 ring-white' : ''}`}
                    style={{ 
                      backgroundColor: color + '40',
                      borderColor: color
                    }}
                    onClick={() => updateEffect('glowColor', color)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-white text-sm">Интенсивность</Label>
                <span className="text-white text-sm">{effects.glowIntensity}/10</span>
              </div>
              <Slider
                value={[effects.glowIntensity]}
                onValueChange={(value) => updateEffect('glowIntensity', value[0])}
                max={10}
                min={1}
                step={1}
              />
            </div>
          </div>
        )}
      </div>

      {/* Тень */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-white">Тень</Label>
          <Button
            variant={effects.shadow ? "default" : "outline"}
            size="sm"
            onClick={() => updateEffect('shadow', !effects.shadow)}
            className="text-xs"
          >
            {effects.shadow ? "ВКЛ" : "ВЫКЛ"}
          </Button>
        </div>
        
        {effects.shadow && (
          <div>
            <Label className="text-white text-sm">Цвет тени</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {['#000000', '#333333', '#666666', '#ffffff'].map((color) => (
                <Button
                  key={color}
                  variant="outline"
                  size="sm"
                  className={`h-8 ${effects.shadowColor === color ? 'ring-2 ring-white' : ''}`}
                  style={{ 
                    backgroundColor: color === '#ffffff' ? '#ffffff40' : color + '40',
                    borderColor: color,
                    color: color === '#000000' ? '#ffffff' : color
                  }}
                  onClick={() => updateEffect('shadowColor', color)}
                >
                  {color === '#000000' && '●'}
                  {color === '#333333' && '●'}
                  {color === '#666666' && '●'}
                  {color === '#ffffff' && '○'}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Частицы */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-white">Частицы</Label>
            <div className="text-xs text-gray-400">Звёздочки вокруг никнейма</div>
          </div>
          <Button
            variant={effects.particles ? "default" : "outline"}
            size="sm"
            onClick={() => updateEffect('particles', !effects.particles)}
            className="text-xs"
          >
            {effects.particles ? "ВКЛ" : "ВЫКЛ"}
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-8px); }
          70% { transform: translateY(-4px); }
          90% { transform: translateY(-2px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VisualEffects;