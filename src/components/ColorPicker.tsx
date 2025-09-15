import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const ColorPicker = ({ value, onChange, label = "Цвет" }: ColorPickerProps) => {
  const [mode, setMode] = useState<'presets' | 'rgb' | 'hex'>('presets');
  const [rgb, setRgb] = useState(() => {
    if (value.startsWith('#')) {
      const hex = value.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    }
    return { r: 0, g: 255, b: 65 };
  });

  const presetColors = [
    { name: "Неон зелёный", color: "#00ff41" },
    { name: "Неон розовый", color: "#ff0080" },
    { name: "Неон синий", color: "#00bfff" },
    { name: "Неон фиолетовый", color: "#8000ff" },
    { name: "Неон жёлтый", color: "#ffff00" },
    { name: "Неон оранжевый", color: "#ff4500" },
    { name: "Киберкрасный", color: "#ff0040" },
    { name: "Электроголубой", color: "#00ffff" },
    { name: "Золотой", color: "#ffd700" },
    { name: "Серебряный", color: "#c0c0c0" },
    { name: "Белый", color: "#ffffff" },
    { name: "Красный", color: "#ff0000" }
  ];

  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const handleRgbChange = (component: 'r' | 'g' | 'b', value: number[]) => {
    const newRgb = { ...rgb, [component]: value[0] };
    setRgb(newRgb);
    onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHexChange = (hexValue: string) => {
    if (hexValue.match(/^#[0-9A-Fa-f]{6}$/)) {
      onChange(hexValue);
      const hex = hexValue.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      setRgb({ r, g, b });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-white">{label}</Label>
        <div 
          className="w-8 h-8 rounded border-2 border-gray-600"
          style={{ backgroundColor: value }}
        />
      </div>

      <div className="flex gap-1 mb-4">
        <Button
          variant={mode === 'presets' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('presets')}
          className="text-xs"
        >
          Палитра
        </Button>
        <Button
          variant={mode === 'rgb' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('rgb')}
          className="text-xs"
        >
          RGB
        </Button>
        <Button
          variant={mode === 'hex' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('hex')}
          className="text-xs"
        >
          HEX
        </Button>
      </div>

      {mode === 'presets' && (
        <div className="grid grid-cols-3 gap-2">
          {presetColors.map((preset) => (
            <Button
              key={preset.color}
              variant="outline"
              size="sm"
              className={`h-12 text-xs ${value === preset.color ? 'ring-2 ring-white' : ''}`}
              style={{ 
                backgroundColor: preset.color + '20',
                borderColor: preset.color,
                color: preset.color
              }}
              onClick={() => {
                onChange(preset.color);
                const hex = preset.color.slice(1);
                const r = parseInt(hex.slice(0, 2), 16);
                const g = parseInt(hex.slice(2, 4), 16);
                const b = parseInt(hex.slice(4, 6), 16);
                setRgb({ r, g, b });
              }}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      )}

      {mode === 'rgb' && (
        <Card className="bg-cyber-grey/30 border-gray-600">
          <CardContent className="p-4 space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-red-400">Красный</Label>
                <span className="text-red-400 text-sm">{rgb.r}</span>
              </div>
              <Slider
                value={[rgb.r]}
                onValueChange={(value) => handleRgbChange('r', value)}
                max={255}
                step={1}
                className="slider-red"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-green-400">Зелёный</Label>
                <span className="text-green-400 text-sm">{rgb.g}</span>
              </div>
              <Slider
                value={[rgb.g]}
                onValueChange={(value) => handleRgbChange('g', value)}
                max={255}
                step={1}
                className="slider-green"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-blue-400">Синий</Label>
                <span className="text-blue-400 text-sm">{rgb.b}</span>
              </div>
              <Slider
                value={[rgb.b]}
                onValueChange={(value) => handleRgbChange('b', value)}
                max={255}
                step={1}
                className="slider-blue"
              />
            </div>
            <div className="text-center text-sm text-gray-400">
              rgb({rgb.r}, {rgb.g}, {rgb.b})
            </div>
          </CardContent>
        </Card>
      )}

      {mode === 'hex' && (
        <div>
          <Input
            value={value}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#00ff41"
            className="bg-cyber-grey/30 border-gray-600 text-white font-mono"
            maxLength={7}
          />
          <div className="text-xs text-gray-400 mt-2">
            Введите цвет в формате HEX (например: #00ff41)
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;