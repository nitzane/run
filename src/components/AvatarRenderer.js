import React from 'react';
import Svg, {
  Rect, Circle, Ellipse, Path, G, Defs, LinearGradient as SvgGradient, Stop, ClipPath,
} from 'react-native-svg';

// Viewport: 200 × 300
const W = 200;
const H = 300;

// ── Background scenes ─────────────────────────────────────────────────────────
const BG_SCENES = {
  'bg-park':       { sky: ['#87CEEB','#C8E6C9'], ground: '#66BB6A', groundH: 60 },
  'bg-track':      { sky: ['#90A4AE','#CFD8DC'], ground: '#E64A19', groundH: 50 },
  'bg-city':       { sky: ['#546E7A','#78909C'], ground: '#616161', groundH: 45 },
  'bg-beach':      { sky: ['#29B6F6','#81D4FA'], ground: '#FFD54F', groundH: 55 },
  'bg-forest':     { sky: ['#2E7D32','#66BB6A'], ground: '#388E3C', groundH: 65 },
  'bg-mountain':   { sky: ['#5C6BC0','#9FA8DA'], ground: '#78909C', groundH: 50 },
  'bg-night':      { sky: ['#0D0D2B','#1A237E'], ground: '#212121', groundH: 45 },
  'bg-sunrise':    { sky: ['#FF6F00','#FFCA28'], ground: '#4CAF50', groundH: 55 },
  'bg-autumn':     { sky: ['#BF360C','#FF8F00'], ground: '#795548', groundH: 50 },
  'bg-winter':     { sky: ['#B3E5FC','#E3F2FD'], ground: '#ECEFF1', groundH: 55 },
  'bg-spring':     { sky: ['#F8BBD9','#FCE4EC'], ground: '#A5D6A7', groundH: 55 },
  'bg-pride':      { sky: ['#FF6B6B','#FFB74D'], ground: '#66BB6A', groundH: 55 },
  'bg-space':      { sky: ['#0D0D2B','#1A0A3E'], ground: '#1A237E', groundH: 35 },
  'bg-candy-land': { sky: ['#FCE4EC','#E1BEE7'], ground: '#F48FB1', groundH: 60 },
  'bg-champion':   { sky: ['#1A237E','#283593'], ground: '#1B5E20', groundH: 50 },
};

// ── Hair shapes ───────────────────────────────────────────────────────────────
function HairLayer({ style, color, accent }) {
  const c = color || '#6B3A2A';
  const a = accent || c;
  const cx = 100, cy = 78, hr = 36; // head center/radius

  switch (style) {
    case 'ponytail':
      return (
        <G>
          {/* cap */}
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 5} ${cy - 10} Q ${cx} ${cy - hr - 10} ${cx - hr + 5} ${cy - 10} Z`} fill={c} />
          {/* tail */}
          <Ellipse cx={cx + hr + 8} cy={cy + 20} rx={8} ry={28} fill={c} />
          <Ellipse cx={cx + hr + 8} cy={cy + 40} rx={6} ry={12} fill={a} />
        </G>
      );
    case 'bun':
      return (
        <G>
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 5} ${cy - 10} Q ${cx} ${cy - hr - 8} ${cx - hr + 5} ${cy - 10} Z`} fill={c} />
          <Circle cx={cx} cy={cy - hr - 4} r={14} fill={a} />
          <Circle cx={cx} cy={cy - hr - 4} r={10} fill={c} />
        </G>
      );
    case 'space-buns':
      return (
        <G>
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 5} ${cy - 8} Q ${cx} ${cy - hr - 5} ${cx - hr + 5} ${cy - 8} Z`} fill={c} />
          <Circle cx={cx - 20} cy={cy - hr + 4} r={12} fill={a} />
          <Circle cx={cx + 20} cy={cy - hr + 4} r={12} fill={a} />
          <Circle cx={cx - 20} cy={cy - hr + 4} r={8} fill={c} />
          <Circle cx={cx + 20} cy={cy - hr + 4} r={8} fill={c} />
        </G>
      );
    case 'long':
      return (
        <G>
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 5} ${cy - 10} Q ${cx} ${cy - hr - 8} ${cx - hr + 5} ${cy - 10} Z`} fill={c} />
          {/* left flow */}
          <Path d={`M ${cx - hr + 4} ${cy} Q ${cx - hr - 8} ${cy + 50} ${cx - hr - 2} ${cy + 90}`} stroke={c} strokeWidth={14} fill="none" strokeLinecap="round" />
          {/* right flow */}
          <Path d={`M ${cx + hr - 4} ${cy} Q ${cx + hr + 8} ${cy + 50} ${cx + hr + 2} ${cy + 90}`} stroke={a} strokeWidth={14} fill="none" strokeLinecap="round" />
          {/* back curtain */}
          <Rect x={cx - hr + 4} y={cy} width={hr * 2 - 8} height={70} rx={8} fill={c} />
        </G>
      );
    case 'wavy':
      return (
        <G>
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 5} ${cy - 10} Q ${cx} ${cy - hr - 8} ${cx - hr + 5} ${cy - 10} Z`} fill={c} />
          <Path d={`M ${cx - hr + 4} ${cy} Q ${cx - hr - 10} ${cy + 30} ${cx - hr + 4} ${cy + 55} Q ${cx - hr - 10} ${cy + 80} ${cx - hr} ${cy + 100}`} stroke={c} strokeWidth={13} fill="none" strokeLinecap="round" />
          <Path d={`M ${cx + hr - 4} ${cy} Q ${cx + hr + 10} ${cy + 30} ${cx + hr - 4} ${cy + 55} Q ${cx + hr + 10} ${cy + 80} ${cx + hr} ${cy + 100}`} stroke={a} strokeWidth={13} fill="none" strokeLinecap="round" />
          <Rect x={cx - hr + 5} y={cy} width={hr * 2 - 10} height={60} rx={8} fill={c} />
        </G>
      );
    case 'curly':
      return (
        <G>
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 3} ${cy - 12} Q ${cx} ${cy - hr - 12} ${cx - hr + 3} ${cy - 12} Z`} fill={c} />
          {[[-30,10],[-15,0],[0,-5],[15,0],[30,10]].map(([ox,oy],i) => (
            <Circle key={i} cx={cx + ox} cy={cy - hr + oy - 4} r={8} fill={a} opacity={0.85} />
          ))}
          {[[-28,35],[-10,40],[10,40],[28,35]].map(([ox,oy],i) => (
            <Circle key={i+5} cx={cx + ox} cy={cy + oy} r={7} fill={c} opacity={0.9} />
          ))}
        </G>
      );
    case 'afro':
      return (
        <G>
          <Circle cx={cx} cy={cy - 5} r={hr + 18} fill={c} />
          <Circle cx={cx} cy={cy - 5} r={hr + 14} fill={a} opacity={0.4} />
        </G>
      );
    case 'bob':
      return (
        <G>
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr} ${cy + 20} Q ${cx} ${cy + 30} ${cx - hr} ${cy + 20} Z`} fill={c} />
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 5} ${cy - 8} Q ${cx} ${cy - hr - 5} ${cx - hr + 5} ${cy - 8} Z`} fill={c} />
        </G>
      );
    case 'braids':
      return (
        <G>
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 5} ${cy - 10} Q ${cx} ${cy - hr - 8} ${cx - hr + 5} ${cy - 10} Z`} fill={c} />
          {[-22, -7, 7, 22].map((ox, i) => (
            <G key={i}>
              <Rect x={cx + ox - 4} y={cy + 2} width={8} height={65} rx={4} fill={i % 2 === 0 ? c : a} />
              {[20, 35, 50, 65].map(oy => (
                <Rect key={oy} x={cx + ox - 5} y={cy + oy} width={10} height={4} rx={2} fill={a} opacity={0.6} />
              ))}
            </G>
          ))}
        </G>
      );
    case 'pixie':
      return (
        <G>
          <Path d={`M ${cx - hr + 5} ${cy + 5} A ${hr - 3} ${hr - 3} 0 0 1 ${cx + hr - 5} ${cy + 5} L ${cx + hr} ${cy - 5} Q ${cx + 10} ${cy - hr - 5} ${cx - 10} ${cy - hr - 2} Q ${cx - hr} ${cy - hr + 8} ${cx - hr + 5} ${cy + 5} Z`} fill={c} />
          <Path d={`M ${cx + hr - 8} ${cy - 5} Q ${cx + hr + 10} ${cy - 15} ${cx + hr + 5} ${cy - 25}`} stroke={a} strokeWidth={6} fill="none" strokeLinecap="round" />
        </G>
      );
    case 'braid-pony':
      return (
        <G>
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 5} ${cy - 10} Q ${cx} ${cy - hr - 8} ${cx - hr + 5} ${cy - 10} Z`} fill={c} />
          <Rect x={cx + hr + 2} y={cy - 5} width={10} height={55} rx={5} fill={c} />
          {[5, 18, 32, 45].map(oy => (
            <Rect key={oy} x={cx + hr + 1} y={cy + oy} width={12} height={4} rx={2} fill={a} opacity={0.7} />
          ))}
        </G>
      );
    case 'crown-braid':
      return (
        <G>
          <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 5} ${cy - 10} Q ${cx} ${cy - hr - 8} ${cx - hr + 5} ${cy - 10} Z`} fill={c} />
          <Path d={`M ${cx - hr + 8} ${cy - 15} Q ${cx} ${cy - hr - 20} ${cx + hr - 8} ${cy - 15}`} stroke={a} strokeWidth={9} fill="none" strokeLinecap="round" />
          <Path d={`M ${cx - hr + 8} ${cy - 15} Q ${cx} ${cy - hr - 20} ${cx + hr - 8} ${cy - 15}`} stroke={c} strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray="6,4" />
        </G>
      );
    default:
      return (
        <Path d={`M ${cx - hr} ${cy} A ${hr} ${hr} 0 0 1 ${cx + hr} ${cy} L ${cx + hr - 5} ${cy - 10} Q ${cx} ${cy - hr - 8} ${cx - hr + 5} ${cy - 10} Z`} fill={c} />
      );
  }
}

// ── Makeup ────────────────────────────────────────────────────────────────────
function MakeupLayer({ style, cx = 100, cy = 78 }) {
  switch (style) {
    case 'natural':
      return <G>
        <Ellipse cx={cx - 10} cy={cy + 10} rx={6} ry={3} fill="#FFAB91" opacity={0.4} />
        <Ellipse cx={cx + 10} cy={cy + 10} rx={6} ry={3} fill="#FFAB91" opacity={0.4} />
        <Path d={`M ${cx - 7} ${cy + 17} Q ${cx} ${cy + 22} ${cx + 7} ${cy + 17}`} stroke="#E91E63" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      </G>;
    case 'pink-lips':
      return <G>
        <Ellipse cx={cx - 10} cy={cy + 10} rx={7} ry={3.5} fill="#F48FB1" opacity={0.5} />
        <Ellipse cx={cx + 10} cy={cy + 10} rx={7} ry={3.5} fill="#F48FB1" opacity={0.5} />
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#E91E63" />
        <Path d={`M ${cx - 8} ${cy + 17} Q ${cx} ${cy + 14} ${cx + 8} ${cy + 17}`} fill="#F06292" />
      </G>;
    case 'red-lips':
      return <G>
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#B71C1C" />
        <Path d={`M ${cx - 8} ${cy + 17} Q ${cx} ${cy + 14} ${cx + 8} ${cy + 17}`} fill="#E53935" />
      </G>;
    case 'coral-lips':
      return <G>
        <Ellipse cx={cx - 10} cy={cy + 10} rx={6} ry={3} fill="#FF7043" opacity={0.4} />
        <Ellipse cx={cx + 10} cy={cy + 10} rx={6} ry={3} fill="#FF7043" opacity={0.4} />
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#FF5722" />
        <Path d={`M ${cx - 8} ${cy + 17} Q ${cx} ${cy + 14} ${cx + 8} ${cy + 17}`} fill="#FF7043" />
      </G>;
    case 'berry-lips':
      return <G>
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#6A1B9A" />
        <Path d={`M ${cx - 8} ${cy + 17} Q ${cx} ${cy + 14} ${cx + 8} ${cy + 17}`} fill="#9C27B0" />
      </G>;
    case 'nude':
      return <G>
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#D7A17A" />
        <Path d={`M ${cx - 8} ${cy + 17} Q ${cx} ${cy + 14} ${cx + 8} ${cy + 17}`} fill="#C8956C" />
      </G>;
    case 'glam':
      return <G>
        <Ellipse cx={cx - 10} cy={cy + 10} rx={8} ry={4} fill="#FF80AB" opacity={0.6} />
        <Ellipse cx={cx + 10} cy={cy + 10} rx={8} ry={4} fill="#FF80AB" opacity={0.6} />
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#C2185B" />
        <Path d={`M ${cx - 8} ${cy + 17} Q ${cx} ${cy + 14} ${cx + 8} ${cy + 17}`} fill="#E91E63" />
        {/* eye shadow */}
        <Ellipse cx={cx - 12} cy={cy - 4} rx={9} ry={4} fill="#E040FB" opacity={0.4} />
        <Ellipse cx={cx + 12} cy={cy - 4} rx={9} ry={4} fill="#E040FB" opacity={0.4} />
      </G>;
    case 'smokey':
      return <G>
        <Ellipse cx={cx - 12} cy={cy - 4} rx={10} ry={5} fill="#212121" opacity={0.55} />
        <Ellipse cx={cx + 12} cy={cy - 4} rx={10} ry={5} fill="#212121" opacity={0.55} />
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#B71C1C" />
      </G>;
    case 'purple':
      return <G>
        <Ellipse cx={cx - 12} cy={cy - 4} rx={9} ry={4} fill="#7B1FA2" opacity={0.5} />
        <Ellipse cx={cx + 12} cy={cy - 4} rx={9} ry={4} fill="#7B1FA2" opacity={0.5} />
        <Ellipse cx={cx - 10} cy={cy + 10} rx={7} ry={3} fill="#CE93D8" opacity={0.5} />
        <Ellipse cx={cx + 10} cy={cy + 10} rx={7} ry={3} fill="#CE93D8" opacity={0.5} />
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#9C27B0" />
      </G>;
    case 'sparkle':
      return <G>
        <Ellipse cx={cx - 10} cy={cy + 10} rx={7} ry={3} fill="#FFD700" opacity={0.5} />
        <Ellipse cx={cx + 10} cy={cy + 10} rx={7} ry={3} fill="#FFD700" opacity={0.5} />
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#FF6B9D" />
        {[[-18,-8],[18,-8],[-22,2],[22,2]].map(([ox,oy],i) => (
          <Circle key={i} cx={cx + ox} cy={cy + oy} r={2} fill="#FFD700" />
        ))}
      </G>;
    case 'rainbow':
      return <G>
        <Ellipse cx={cx - 12} cy={cy - 4} rx={9} ry={4} fill="#FF6B6B" opacity={0.45} />
        <Ellipse cx={cx + 12} cy={cy - 4} rx={9} ry={4} fill="#64B5F6" opacity={0.45} />
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#FF6B6B" />
        {[[-15,8],[15,8]].map(([ox,oy],i) => (
          <Circle key={i} cx={cx + ox} cy={cy + oy} r={3} fill={['#FF6B6B','#64B5F6'][i]} opacity={0.6} />
        ))}
      </G>;
    case 'galaxy':
      return <G>
        <Ellipse cx={cx - 12} cy={cy - 4} rx={10} ry={5} fill="#1A237E" opacity={0.6} />
        <Ellipse cx={cx + 12} cy={cy - 4} rx={10} ry={5} fill="#1A237E" opacity={0.6} />
        <Ellipse cx={cx - 10} cy={cy + 10} rx={7} ry={3} fill="#7C4DFF" opacity={0.5} />
        <Ellipse cx={cx + 10} cy={cy + 10} rx={7} ry={3} fill="#7C4DFF" opacity={0.5} />
        <Ellipse cx={cx} cy={cy + 19} rx={8} ry={4} fill="#311B92" />
        {[[-20,-6],[20,-6],[-14,4],[14,4],[0,-10]].map(([ox,oy],i) => (
          <Circle key={i} cx={cx + ox} cy={cy + oy} r={1.5} fill="#E040FB" />
        ))}
      </G>;
    case 'queen':
      return <G>
        <Ellipse cx={cx - 12} cy={cy - 4} rx={11} ry={5} fill="#FFD700" opacity={0.5} />
        <Ellipse cx={cx + 12} cy={cy - 4} rx={11} ry={5} fill="#FFD700" opacity={0.5} />
        <Ellipse cx={cx - 10} cy={cy + 10} rx={8} ry={4} fill="#FFD700" opacity={0.5} />
        <Ellipse cx={cx + 10} cy={cy + 10} rx={8} ry={4} fill="#FFD700" opacity={0.5} />
        <Ellipse cx={cx} cy={cy + 19} rx={9} ry={4.5} fill="#B71C1C" />
        <Path d={`M ${cx - 9} ${cy + 17} Q ${cx} ${cy + 13} ${cx + 9} ${cy + 17}`} fill="#E53935" />
      </G>;
    default:
      return null;
  }
}

// ── Accessory ─────────────────────────────────────────────────────────────────
function AccessoryLayer({ style, color, cx = 100, cy = 78, hr = 36 }) {
  const c = color || '#212121';
  switch (style) {
    case 'cap':
      return <G>
        <Rect x={cx - hr} y={cy - hr + 2} width={hr * 2} height={12} rx={3} fill={c} />
        <Path d={`M ${cx - hr} ${cy - hr + 14} Q ${cx} ${cy - hr - 6} ${cx + hr} ${cy - hr + 14}`} fill={c} />
        <Rect x={cx - hr - 8} y={cy - hr + 12} width={hr + 10} height={6} rx={3} fill={c} />
      </G>;
    case 'visor':
      return <G>
        <Rect x={cx - hr - 6} y={cy - hr + 16} width={hr * 2 + 6} height={6} rx={3} fill={c} />
        <Path d={`M ${cx - hr + 4} ${cy - hr + 5} Q ${cx} ${cy - hr - 5} ${cx + hr - 4} ${cy - hr + 5}`} stroke={c} strokeWidth={6} fill="none" strokeLinecap="round" />
      </G>;
    case 'headband':
      return <G>
        <Path d={`M ${cx - hr + 4} ${cy - hr + 16} Q ${cx} ${cy - hr + 5} ${cx + hr - 4} ${cy - hr + 16}`} stroke={c} strokeWidth={8} fill="none" strokeLinecap="round" />
      </G>;
    case 'beanie':
      return <G>
        <Path d={`M ${cx - hr + 2} ${cy + 2} A ${hr - 2} ${hr} 0 0 1 ${cx + hr - 2} ${cy + 2} L ${cx + hr} ${cy - hr + 6} Q ${cx} ${cy - hr - 15} ${cx - hr} ${cy - hr + 6} Z`} fill={c} />
        <Rect x={cx - hr + 2} y={cy - 4} width={(hr - 2) * 2} height={10} rx={3} fill={c} opacity={0.7} />
        <Circle cx={cx} cy={cy - hr - 15} r={7} fill={color} />
      </G>;
    case 'sunglasses':
      return <G>
        <Rect x={cx - 24} y={cy - 7} width={18} height={12} rx={5} fill={c} opacity={0.75} />
        <Rect x={cx + 6} y={cy - 7} width={18} height={12} rx={5} fill={c} opacity={0.75} />
        <Rect x={cx - 6} y={cy - 3} width={12} height={3} rx={1.5} fill={c} />
        <Rect x={cx - hr + 2} y={cy - 5} width={10} height={3} rx={1.5} fill={c} />
        <Rect x={cx + hr - 12} y={cy - 5} width={10} height={3} rx={1.5} fill={c} />
      </G>;
    case 'crown':
      return <G>
        <Rect x={cx - 22} y={cy - hr - 4} width={44} height={12} rx={3} fill="#FFD700" />
        {[[-16,-8],[0,-14],[16,-8]].map(([ox,oy],i) => (
          <Path key={i} d={`M ${cx + ox - 3} ${cy - hr - 4} L ${cx + ox} ${cy - hr + oy - 4} L ${cx + ox + 3} ${cy - hr - 4}`} fill="#FFC107" />
        ))}
        {[[-12,0],[0,0],[12,0]].map(([ox,oy],i) => (
          <Circle key={i} cx={cx + ox} cy={cy - hr - 2 + oy} r={3} fill="#E91E63" />
        ))}
      </G>;
    case 'tiara':
      return <G>
        <Path d={`M ${cx - 20} ${cy - hr + 6} Q ${cx} ${cy - hr - 16} ${cx + 20} ${cy - hr + 6}`} stroke="#E0E0E0" strokeWidth={3} fill="none" />
        <Circle cx={cx} cy={cy - hr - 16} r={5} fill="#E91E63" />
        <Circle cx={cx - 10} cy={cy - hr - 8} r={3} fill="#CE93D8" />
        <Circle cx={cx + 10} cy={cy - hr - 8} r={3} fill="#CE93D8" />
      </G>;
    case 'headphones':
      return <G>
        <Path d={`M ${cx - hr + 2} ${cy - 5} A ${hr + 2} ${hr + 10} 0 0 1 ${cx + hr - 2} ${cy - 5}`} stroke={c} strokeWidth={5} fill="none" />
        <Rect x={cx - hr - 4} y={cy - 8} width={12} height={18} rx={5} fill={c} />
        <Rect x={cx + hr - 8} y={cy - 8} width={12} height={18} rx={5} fill={c} />
      </G>;
    default:
      return null;
  }
}

// ── Jewelry ───────────────────────────────────────────────────────────────────
function JewelryLayer({ style, color, cx = 100, cy = 78, hr = 36 }) {
  const c = color || '#FFD700';
  switch (style) {
    case 'studs':
      return <G>
        <Circle cx={cx - hr + 4} cy={cy + 4} r={3} fill={c} />
        <Circle cx={cx + hr - 4} cy={cy + 4} r={3} fill={c} />
      </G>;
    case 'hoops':
      return <G>
        <Circle cx={cx - hr + 2} cy={cy + 6} r={6} stroke={c} strokeWidth={2.5} fill="none" />
        <Circle cx={cx + hr - 2} cy={cy + 6} r={6} stroke={c} strokeWidth={2.5} fill="none" />
      </G>;
    case 'drop':
      return <G>
        <Circle cx={cx - hr + 4} cy={cy + 4} r={2.5} fill={c} />
        <Circle cx={cx + hr - 4} cy={cy + 4} r={2.5} fill={c} />
        <Ellipse cx={cx - hr + 4} cy={cy + 14} rx={3} ry={6} fill={c} opacity={0.85} />
        <Ellipse cx={cx + hr - 4} cy={cy + 14} rx={3} ry={6} fill={c} opacity={0.85} />
      </G>;
    case 'necklace':
      return <G>
        <Path d={`M ${cx - 18} ${cy + hr - 8} Q ${cx} ${cy + hr + 4} ${cx + 18} ${cy + hr - 8}`} stroke={c} strokeWidth={2} fill="none" />
        <Circle cx={cx} cy={cy + hr + 4} r={4} fill={c} />
      </G>;
    case 'bracelet':
      return <G>
        <Rect x={cx - 45} y={cy + 90} width={16} height={8} rx={4} fill={c} opacity={0.8} />
      </G>;
    case 'watch':
      return <G>
        <Rect x={cx - 47} y={cy + 85} width={18} height={14} rx={4} fill={c} />
        <Rect x={cx - 44} y={cy + 88} width={12} height={8} rx={2} fill="#FAFAFA" />
        <Circle cx={cx - 38} cy={cy + 92} r={3} fill={c} />
      </G>;
    case 'stars':
      return <G>
        {[[-hr+4,4],[hr-4,4]].map(([ox,oy],i) => (
          <Path key={i} d={`M ${cx+ox} ${cy+oy-4} L ${cx+ox+2} ${cy+oy+1} L ${cx+ox+5} ${cy+oy+1} L ${cx+ox+2} ${cy+oy+4} L ${cx+ox+3} ${cy+oy+8} L ${cx+ox} ${cy+oy+5} L ${cx+ox-3} ${cy+oy+8} L ${cx+ox-2} ${cy+oy+4} L ${cx+ox-5} ${cy+oy+1} L ${cx+ox-2} ${cy+oy+1} Z`} fill="#FFD700" />
        ))}
      </G>;
    case 'moon':
      return <G>
        <Path d={`M ${cx - hr + 8} ${cy} A 6 6 0 1 1 ${cx - hr + 4} ${cy + 8} A 4 4 0 1 0 ${cx - hr + 8} ${cy} Z`} fill={c} />
        <Path d={`M ${cx + hr - 8} ${cy} A 6 6 0 1 1 ${cx + hr - 4} ${cy + 8} A 4 4 0 1 0 ${cx + hr - 8} ${cy} Z`} fill={c} />
      </G>;
    case 'diamond-set':
      return <G>
        <Path d={`M ${cx - hr + 4} ${cy + 2} L ${cx - hr + 7} ${cy + 6} L ${cx - hr + 1} ${cy + 6} Z`} fill={c} />
        <Path d={`M ${cx + hr - 4} ${cy + 2} L ${cx + hr - 7} ${cy + 6} L ${cx + hr - 1} ${cy + 6} Z`} fill={c} />
        <Path d={`M ${cx} ${cy + hr - 6} L ${cx + 5} ${cy + hr} L ${cx - 5} ${cy + hr} Z`} fill={c} />
      </G>;
    default:
      return null;
  }
}

// ── Clothing ──────────────────────────────────────────────────────────────────
function TopLayer({ style, color, accent }) {
  const c = color || '#F06292';
  const a = accent || c;
  const cy = 155;
  switch (style) {
    case 'tank':
      return <G>
        <Ellipse cx={100} cy={cy} rx={38} ry={40} fill={c} />
        {/* straps */}
        <Rect x={70} y={118} width={10} height={20} rx={5} fill={c} />
        <Rect x={120} y={118} width={10} height={20} rx={5} fill={c} />
      </G>;
    case 'crop':
      return <G>
        <Ellipse cx={100} cy={cy} rx={38} ry={35} fill={c} />
        <Rect x={68} y={116} width={12} height={22} rx={6} fill={c} />
        <Rect x={120} y={116} width={12} height={22} rx={6} fill={c} />
        {/* accent hem */}
        <Ellipse cx={100} cy={cy + 34} rx={38} ry={5} fill={a} />
      </G>;
    case 'sports-bra':
      return <G>
        <Ellipse cx={100} cy={cy - 5} rx={36} ry={28} fill={c} />
        <Rect x={70} y={118} width={10} height={18} rx={5} fill={c} />
        <Rect x={120} y={118} width={10} height={18} rx={5} fill={c} />
        {/* band */}
        <Ellipse cx={100} cy={cy + 22} rx={36} ry={6} fill={a} />
      </G>;
    case 'long-sleeve':
      return <G>
        <Ellipse cx={100} cy={cy} rx={38} ry={40} fill={c} />
        {/* sleeves */}
        <Ellipse cx={62} cy={cy + 10} rx={14} ry={38} fill={c} transform="rotate(-15,62,165)" />
        <Ellipse cx={138} cy={cy + 10} rx={14} ry={38} fill={c} transform="rotate(15,138,165)" />
        {/* cuffs */}
        <Ellipse cx={50} cy={cy + 38} rx={10} ry={5} fill={a} transform="rotate(-15,50,193)" />
        <Ellipse cx={150} cy={cy + 38} rx={10} ry={5} fill={a} transform="rotate(15,150,193)" />
      </G>;
    case 'hoodie':
      return <G>
        <Ellipse cx={100} cy={cy + 5} rx={42} ry={42} fill={c} />
        <Ellipse cx={60} cy={cy + 15} rx={16} ry={40} fill={c} transform="rotate(-10,60,170)" />
        <Ellipse cx={140} cy={cy + 15} rx={16} ry={40} fill={c} transform="rotate(10,140,170)" />
        <Ellipse cx={46} cy={cy + 42} rx={12} ry={6} fill={a} transform="rotate(-10,46,197)" />
        <Ellipse cx={154} cy={cy + 42} rx={12} ry={6} fill={a} transform="rotate(10,154,197)" />
        {/* hood */}
        <Path d={`M 74 122 Q 100 105 126 122 L 122 130 Q 100 118 78 130 Z`} fill={a} />
        {/* pocket */}
        <Rect x={84} y={168} width={32} height={14} rx={6} fill={a} opacity={0.5} />
      </G>;
    default:
      return <Ellipse cx={100} cy={cy} rx={38} ry={40} fill={c} />;
  }
}

function BottomLayer({ style, color, accent }) {
  const c = color || '#212121';
  const a = accent || c;
  const waistY = 188;
  switch (style) {
    case 'shorts':
      return <G>
        <Path d={`M 64 ${waistY} L 136 ${waistY} L 128 ${waistY + 48} L 100 ${waistY + 42} L 72 ${waistY + 48} Z`} fill={c} />
        {/* waistband */}
        <Rect x={64} y={waistY - 5} width={72} height={10} rx={4} fill={a} />
      </G>;
    case 'leggings':
      return <G>
        <Path d={`M 64 ${waistY} L 136 ${waistY} L 126 ${waistY + 75} L 100 ${waistY + 72} L 74 ${waistY + 75} Z`} fill={c} />
        <Rect x={64} y={waistY - 5} width={72} height={10} rx={4} fill={a} />
        {/* seam line */}
        <Path d={`M 100 ${waistY + 5} L 100 ${waistY + 72}`} stroke={a} strokeWidth={2} opacity={0.4} />
      </G>;
    case 'skirt':
      return <G>
        <Path d={`M 64 ${waistY} L 136 ${waistY} L 148 ${waistY + 55} L 52 ${waistY + 55} Z`} fill={c} />
        <Rect x={64} y={waistY - 5} width={72} height={10} rx={4} fill={a} />
        {/* pleat lines */}
        {[85, 100, 115].map(x => (
          <Path key={x} d={`M ${x} ${waistY + 5} L ${x - 3} ${waistY + 55}`} stroke={a} strokeWidth={1.5} opacity={0.5} />
        ))}
      </G>;
    case 'capri':
      return <G>
        <Path d={`M 64 ${waistY} L 136 ${waistY} L 128 ${waistY + 58} L 100 ${waistY + 55} L 72 ${waistY + 58} Z`} fill={c} />
        <Rect x={64} y={waistY - 5} width={72} height={10} rx={4} fill={a} />
        <Ellipse cx={74} cy={waistY + 58} rx={8} ry={4} fill={a} />
        <Ellipse cx={126} cy={waistY + 58} rx={8} ry={4} fill={a} />
      </G>;
    default:
      return <Path d={`M 64 ${waistY} L 136 ${waistY} L 128 ${waistY + 48} L 100 ${waistY + 42} L 72 ${waistY + 48} Z`} fill={c} />;
  }
}

function ShoesLayer({ color }) {
  const c = color || '#FAFAFA';
  return <G>
    {/* left shoe */}
    <Ellipse cx={78} cy={270} rx={18} ry={8} fill={c} />
    <Rect x={62} y={258} width={20} height={14} rx={4} fill={c} />
    {/* right shoe */}
    <Ellipse cx={122} cy={270} rx={18} ry={8} fill={c} />
    <Rect x={118} y={258} width={20} height={14} rx={4} fill={c} />
    {/* sole */}
    <Ellipse cx={78} cy={271} rx={18} ry={5} fill="#212121" opacity={0.25} />
    <Ellipse cx={122} cy={271} rx={18} ry={5} fill="#212121" opacity={0.25} />
  </G>;
}

// ── Main renderer ─────────────────────────────────────────────────────────────
export default function AvatarRenderer({ avatar, size = 200 }) {
  if (!avatar) return null;

  const scale = size / W;
  const svgH = H * scale;

  const bg = BG_SCENES[avatar.background] || BG_SCENES['bg-park'];
  const skin = avatar.skinTone || '#F5C5A3';

  // Look up item styles from the avatar IDs
  const hairItem   = avatar._hairItem   || {};
  const topItem    = avatar._topItem    || {};
  const bottomItem = avatar._bottomItem || {};
  const shoeItem   = avatar._shoeItem   || {};
  const accItem    = avatar._accItem    || {};
  const jewItem    = avatar._jewItem    || {};
  const makeItem   = avatar._makeItem   || {};

  const cx = 100, cy = 78, hr = 36;

  return (
    <Svg width={size} height={svgH} viewBox={`0 0 ${W} ${H}`}>
      <Defs>
        <SvgGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={bg.sky[0]} />
          <Stop offset="1" stopColor={bg.sky[1]} />
        </SvgGradient>
        <SvgGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={skin} />
          <Stop offset="1" stopColor={skin} stopOpacity={0.9} />
        </SvgGradient>
      </Defs>

      {/* Background */}
      <Rect x={0} y={0} width={W} height={H} fill="url(#skyGrad)" />
      <Rect x={0} y={H - bg.groundH} width={W} height={bg.groundH} fill={bg.ground} />

      {/* Legs */}
      <Rect x={84} y={225} width={16} height={48} rx={8} fill={skin} />
      <Rect x={100} y={225} width={16} height={48} rx={8} fill={skin} />

      {/* Bottom clothing */}
      <BottomLayer
        style={bottomItem.style}
        color={bottomItem.color}
        accent={bottomItem.accent}
      />

      {/* Body */}
      <Ellipse cx={cx} cy={cy + 80} rx={36} ry={38} fill={skin} />

      {/* Arms */}
      <Ellipse cx={62} cy={cy + 90} rx={12} ry={32} fill={skin} transform="rotate(-10,62,168)" />
      <Ellipse cx={138} cy={cy + 90} rx={12} ry={32} fill={skin} transform="rotate(10,138,168)" />

      {/* Top clothing */}
      <TopLayer
        style={topItem.style}
        color={topItem.color}
        accent={topItem.accent}
      />

      {/* Shoes */}
      <ShoesLayer color={shoeItem.color} />

      {/* Neck */}
      <Rect x={92} y={cy + hr - 2} width={16} height={18} rx={7} fill={skin} />

      {/* Head */}
      <Circle cx={cx} cy={cy} r={hr} fill={skin} />

      {/* Hair (behind face) */}
      <HairLayer style={hairItem.style} color={hairItem.color} accent={hairItem.accent} />

      {/* Face */}
      {/* Eyes */}
      <Circle cx={cx - 12} cy={cy - 2} r={5} fill="#FAFAFA" />
      <Circle cx={cx + 12} cy={cy - 2} r={5} fill="#FAFAFA" />
      <Circle cx={cx - 11} cy={cy - 2} r={3.5} fill="#3E2723" />
      <Circle cx={cx + 11} cy={cy - 2} r={3.5} fill="#3E2723" />
      <Circle cx={cx - 10} cy={cy - 3} r={1.5} fill="#FAFAFA" />
      <Circle cx={cx + 10} cy={cy - 3} r={1.5} fill="#FAFAFA" />
      {/* Eyebrows */}
      <Path d={`M ${cx - 18} ${cy - 10} Q ${cx - 12} ${cy - 14} ${cx - 6} ${cy - 10}`} stroke="#5D4037" strokeWidth={2} fill="none" strokeLinecap="round" />
      <Path d={`M ${cx + 6} ${cy - 10} Q ${cx + 12} ${cy - 14} ${cx + 18} ${cy - 10}`} stroke="#5D4037" strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* Nose */}
      <Circle cx={cx} cy={cy + 8} r={2} fill={skin} opacity={0.7} />

      {/* Makeup */}
      <MakeupLayer style={makeItem.style} cx={cx} cy={cy} />

      {/* Smile (default) */}
      {!makeItem.style && (
        <Path d={`M ${cx - 7} ${cy + 17} Q ${cx} ${cy + 23} ${cx + 7} ${cy + 17}`} stroke="#C2185B" strokeWidth={2} fill="none" strokeLinecap="round" />
      )}

      {/* Accessory */}
      <AccessoryLayer style={accItem.style} color={accItem.color} cx={cx} cy={cy} hr={hr} />

      {/* Jewelry */}
      <JewelryLayer style={jewItem.style} color={jewItem.color} cx={cx} cy={cy} hr={hr} />
    </Svg>
  );
}
