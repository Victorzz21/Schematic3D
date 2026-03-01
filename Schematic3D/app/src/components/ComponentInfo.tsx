import type { PhoneComponent } from '@/types/phone';
import { Cpu, HardDrive, Battery, Camera, Smartphone, Zap, Usb, Eye, Radio } from 'lucide-react';

interface ComponentInfoProps {
  component: PhoneComponent | null;
  onClose: () => void;
}

const getComponentIcon = (type: string) => {
  switch (type) {
    case 'cpu': return <Cpu className="w-6 h-6" />;
    case 'gpu': return <Eye className="w-6 h-6" />;
    case 'ram': return <HardDrive className="w-6 h-6" />;
    case 'storage': return <HardDrive className="w-6 h-6" />;
    case 'battery': return <Battery className="w-6 h-6" />;
    case 'camera': return <Camera className="w-6 h-6" />;
    case 'display': return <Smartphone className="w-6 h-6" />;
    case 'connector': return <Usb className="w-6 h-6" />;
    case 'sensor': return <Eye className="w-6 h-6" />;
    case 'antenna': return <Radio className="w-6 h-6" />;
    default: return <Zap className="w-6 h-6" />;
  }
};

const getComponentColor = (type: string) => {
  switch (type) {
    case 'cpu': return 'text-orange-400 border-orange-400/50 bg-orange-400/10';
    case 'gpu': return 'text-amber-400 border-amber-400/50 bg-amber-400/10';
    case 'ram': return 'text-teal-400 border-teal-400/50 bg-teal-400/10';
    case 'storage': return 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10';
    case 'battery': return 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10';
    case 'camera': return 'text-purple-400 border-purple-400/50 bg-purple-400/10';
    case 'display': return 'text-blue-400 border-blue-400/50 bg-blue-400/10';
    case 'connector': return 'text-sky-400 border-sky-400/50 bg-sky-400/10';
    case 'sensor': return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10';
    case 'antenna': return 'text-green-400 border-green-400/50 bg-green-400/10';
    default: return 'text-gray-400 border-gray-400/50 bg-gray-400/10';
  }
};

export function ComponentInfo({ component, onClose }: ComponentInfoProps) {
  if (!component) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-green-600/50 p-6">
        <Cpu className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-center">Selecciona un componente en la vista 3D<br/>o usa el comando "select [id]" en la terminal</p>
      </div>
    );
  }

  const colorClass = getComponentColor(component.type);

  return (
    <div className="h-full flex flex-col bg-[#0c0c0c] border-l border-green-900/50">
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${colorClass.split(' ')[2]} border-opacity-30`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colorClass}`}>
            {getComponentIcon(component.type)}
          </div>
          <div>
            <h3 className="text-white font-semibold">{component.name}</h3>
            <span className={`text-xs uppercase tracking-wider ${colorClass.split(' ')[0]}`}>
              {component.type}
            </span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-green-600 hover:text-green-400 transition-colors"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ID Badge */}
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-xs">ID:</span>
          <code className="bg-green-900/20 text-green-400 px-2 py-1 rounded text-xs font-mono">
            {component.id}
          </code>
        </div>

        {/* Description */}
        <div className="bg-green-900/10 rounded-lg p-3 border border-green-900/30">
          <p className="text-green-300 text-sm leading-relaxed">
            {component.description}
          </p>
        </div>

        {/* Position */}
        <div>
          <h4 className="text-green-600 text-xs uppercase tracking-wider mb-2">Posición 3D</h4>
          <div className="grid grid-cols-3 gap-2">
            {['X', 'Y', 'Z'].map((axis, idx) => (
              <div key={axis} className="bg-green-900/10 rounded p-2 text-center border border-green-900/30">
                <span className="text-green-600 text-xs">{axis}</span>
                <p className="text-green-400 font-mono text-sm">{component.position[idx].toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Connections */}
        <div>
          <h4 className="text-green-600 text-xs uppercase tracking-wider mb-2">
            Conexiones ({component.connections.length})
          </h4>
          {component.connections.length === 0 ? (
            <p className="text-green-600/50 text-sm italic">Sin conexiones</p>
          ) : (
            <div className="space-y-1">
              {component.connections.map((connId) => (
                <div 
                  key={connId}
                  className="flex items-center gap-2 bg-green-900/10 rounded px-3 py-2 border border-green-900/30"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <code className="text-green-400 text-xs font-mono">{connId}</code>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Color indicator */}
        <div>
          <h4 className="text-green-600 text-xs uppercase tracking-wider mb-2">Color del Componente</h4>
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded border-2 border-white/20"
              style={{ backgroundColor: component.color }}
            />
            <code className="text-green-400 text-xs font-mono">{component.color}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
