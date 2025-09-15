import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface BackgroundSelectorProps {
  background: {
    type: string;
    gradient: {
      colors: string[];
      direction: string;
    };
    pattern: string;
    opacity: number;
    animation: string;
  };
  onChange: (background: any) => void;
}

const BackgroundSelector = ({ background, onChange }: BackgroundSelectorProps) => {
  const [previewMode, setPreviewMode] = useState(false);

  const backgroundTypes = [
    { value: "solid", label: "Сплошной цвет" },
    { value: "gradient", label: "Градиент" },
    { value: "pattern", label: "Узор" },
    { value: "animated", label: "Анимированный" }
  ];

  const gradientPresets = [
    { name: "Киберпанк", colors: ["#00ff41", "#0080ff"] },
    { name: "Закат", colors: ["#ff4500", "#ff0080"] },
    { name: "Океан", colors: ["#00bfff", "#0080ff"] },
    { name: "Пурпурный", colors: ["#8000ff", "#ff0080"] },
    { name: "Огненный", colors: ["#ff0000", "#ff8000"] },
    { name: "Радуга", colors: ["#ff0000", "#ff8000", "#ffff00", "#00ff00", "#00bfff", "#8000ff"] }
  ];

  const patterns = [
    { value: "dots", label: "Точки" },
    { value: "grid", label: "Сетка" },
    { value: "waves", label: "Волны" },
    { value: "circuit", label: "Схемы" },
    { value: "hexagon", label: "Шестиугольники" },
    { value: "stars", label: "Звёзды" }
  ];

  const directions = [
    { value: "to right", label: "→" },
    { value: "to left", label: "←" },
    { value: "to bottom", label: "↓" },
    { value: "to top", label: "↑" },
    { value: "to bottom right", label: "↘" },
    { value: "to bottom left", label: "↙" },
    { value: "45deg", label: "⤴" },
    { value: "-45deg", label: "⤵" }
  ];

  const updateBackground = (key: string, value: any) => {
    onChange({ ...background, [key]: value });
  };

  const updateGradient = (key: string, value: any) => {
    onChange({ 
      ...background, 
      gradient: { ...background.gradient, [key]: value } 
    });
  };

  const getPreviewStyle = () => {
    const baseStyle: any = {
      width: '100%',
      height: '120px',
      borderRadius: '8px',
      border: '2px solid rgba(255,255,255,0.2)',
      position: 'relative',
      overflow: 'hidden'
    };

    if (background.type === 'solid') {
      baseStyle.backgroundColor = background.gradient.colors[0] || '#00ff41';
    } else if (background.type === 'gradient') {
      const colors = background.gradient.colors.join(', ');
      baseStyle.background = `linear-gradient(${background.gradient.direction}, ${colors})`;
    } else if (background.type === 'pattern') {
      baseStyle.backgroundColor = '#1a1a2e';
      baseStyle.backgroundImage = getPatternCSS(background.pattern);
    } else if (background.type === 'animated') {
      baseStyle.background = 'linear-gradient(45deg, #00ff41, #0080ff, #ff0080)';
      baseStyle.backgroundSize = '300% 300%';
      baseStyle.animation = 'gradientShift 3s ease infinite';
    }

    baseStyle.opacity = background.opacity / 100;

    return baseStyle;
  };

  const getPatternCSS = (pattern: string) => {
    switch (pattern) {
      case 'dots':
        return 'radial-gradient(circle, #00ff41 1px, transparent 1px)';
      case 'grid':
        return 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)';
      case 'waves':
        return 'repeating-linear-gradient(45deg, transparent, transparent 10px, #00ff41 10px, #00ff41 20px)';
      case 'circuit':
        return 'repeating-linear-gradient(0deg, transparent, transparent 8px, #00ff41 8px, #00ff41 10px), repeating-linear-gradient(90deg, transparent, transparent 8px, #00ff41 8px, #00ff41 10px)';
      case 'hexagon':
        return 'radial-gradient(circle at 50% 0%, #00ff41 2px, transparent 2px), radial-gradient(circle at 0% 87%, #00ff41 2px, transparent 2px)';
      case 'stars':
        return 'radial-gradient(2px 2px at 20px 30px, #00ff41, transparent), radial-gradient(2px 2px at 40px 70px, #0080ff, transparent)';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Превью */}
      <Card className="bg-cyber-grey/30 border-gray-600">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <Label className="text-white">Превью фона</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="text-xs"
            >
              {previewMode ? "Свернуть" : "Полный экран"}
            </Button>
          </div>
          <div 
            style={getPreviewStyle()}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded">
                Пример профиля
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Тип фона */}
      <div>
        <Label className="text-white mb-2 block">Тип фона</Label>
        <div className="grid grid-cols-2 gap-2">
          {backgroundTypes.map((type) => (
            <Button
              key={type.value}
              variant={background.type === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => updateBackground('type', type.value)}
              className="text-xs"
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Настройки градиента */}
      {background.type === 'gradient' && (
        <div className="space-y-4">
          <div>
            <Label className="text-white mb-2 block">Готовые градиенты</Label>
            <div className="grid grid-cols-2 gap-2">
              {gradientPresets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => updateGradient('colors', preset.colors)}
                  className="text-xs h-12 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(45deg, ${preset.colors.join(', ')})`,
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                  }}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-white mb-2 block">Направление</Label>
            <div className="grid grid-cols-4 gap-2">
              {directions.map((dir) => (
                <Button
                  key={dir.value}
                  variant={background.gradient.direction === dir.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateGradient('direction', dir.value)}
                  className="text-lg"
                >
                  {dir.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Настройки узора */}
      {background.type === 'pattern' && (
        <div>
          <Label className="text-white mb-2 block">Узор</Label>
          <div className="grid grid-cols-2 gap-2">
            {patterns.map((pattern) => (
              <Button
                key={pattern.value}
                variant={background.pattern === pattern.value ? "default" : "outline"}
                size="sm"
                onClick={() => updateBackground('pattern', pattern.value)}
                className="text-xs"
              >
                {pattern.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Прозрачность */}
      <div>
        <div className="flex justify-between mb-2">
          <Label className="text-white">Прозрачность</Label>
          <span className="text-white text-sm">{background.opacity}%</span>
        </div>
        <Slider
          value={[background.opacity]}
          onValueChange={(value) => updateBackground('opacity', value[0])}
          max={100}
          min={10}
          step={5}
        />
      </div>

      {/* Полноэкранный режим превью */}
      {previewMode && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={getPreviewStyle()}
          onClick={() => setPreviewMode(false)}
        >
          <div className="text-white text-center">
            <div className="text-4xl font-bold mb-4">YourNickname</div>
            <div className="text-lg opacity-80">Пример профиля с выбранным фоном</div>
            <div className="text-sm opacity-60 mt-4">Нажмите для закрытия</div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default BackgroundSelector;