import { useState, useEffect } from 'react';
import { PhoneSchematic } from '@/components/3d/PhoneSchematic';
import { Terminal } from '@/components/Terminal';
import { ComponentInfo } from '@/components/ComponentInfo';
import { phoneModels, getPhoneById } from '@/data/phones';
import type { PhoneModel } from '@/types/phone';
import { Cpu, Terminal as TerminalIcon, Info, Layers, Power, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

function App() {
  const [currentPhone, setCurrentPhone] = useState<PhoneModel>(phoneModels[0]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showConnections, setShowConnections] = useState(true);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChangePhone = (phoneId: string) => {
    const phone = getPhoneById(phoneId);
    if (phone) {
      setIsLoading(true);
      setSelectedComponent(null);
      setTimeout(() => {
        setCurrentPhone(phone);
        setIsLoading(false);
      }, 500);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <Cpu className="w-16 h-16 text-green-500 animate-pulse mx-auto" />
            <div className="absolute inset-0 w-16 h-16 border-2 border-green-500/30 rounded-full animate-ping mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-green-400 mb-2">Schematic3D Mobile</h1>
          <p className="text-green-600">Cargando esquemático...</p>
          <div className="mt-4 w-48 h-1 bg-green-900/30 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-green-500 animate-[loading_1.5s_ease-in-out]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#0a0a0a] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-[#0c0c0c] border-b border-green-900/50 flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-green-500" />
            <h1 className="text-lg font-bold text-green-400 hidden sm:block">Schematic3D Mobile</h1>
          </div>
          <div className="h-6 w-px bg-green-900/50 hidden sm:block" />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">{currentPhone.brand}</span>
            <span className="text-green-400">{currentPhone.name}</span>
            <span className="text-green-700">({currentPhone.year})</span>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConnections(!showConnections)}
            className={`${showConnections ? 'text-green-400 bg-green-900/20' : 'text-green-700'}`}
          >
            <Layers className="w-4 h-4 mr-1" />
            Conexiones
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTerminal(!showTerminal)}
            className={`${showTerminal ? 'text-green-400 bg-green-900/20' : 'text-green-700'}`}
          >
            <TerminalIcon className="w-4 h-4 mr-1" />
            Terminal
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInfo(!showInfo)}
            className={`${showInfo ? 'text-green-400 bg-green-900/20' : 'text-green-700'}`}
          >
            <Info className="w-4 h-4 mr-1" />
            Info
          </Button>
          <div className="h-6 w-px bg-green-900/50 mx-2" />
          <select
            value={currentPhone.id}
            onChange={(e) => handleChangePhone(e.target.value)}
            className="bg-[#1a1a1a] text-green-400 text-sm border border-green-900/50 rounded px-2 py-1 outline-none focus:border-green-500"
          >
            {phoneModels.map(phone => (
              <option key={phone.id} value={phone.id}>
                {phone.brand} {phone.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-400 p-2"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-[#0c0c0c] border-b border-green-900/50 p-4 space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-green-600 text-sm">Modelo:</label>
            <select
              value={currentPhone.id}
              onChange={(e) => {
                handleChangePhone(e.target.value);
                setShowMobileMenu(false);
              }}
              className="bg-[#1a1a1a] text-green-400 text-sm border border-green-900/50 rounded px-2 py-2 outline-none"
            >
              {phoneModels.map(phone => (
                <option key={phone.id} value={phone.id}>
                  {phone.brand} {phone.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConnections(!showConnections)}
              className={`flex-1 ${showConnections ? 'border-green-500 text-green-400' : 'border-green-900 text-green-700'}`}
            >
              <Layers className="w-4 h-4 mr-1" />
              Conexiones
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTerminal(!showTerminal)}
              className={`flex-1 ${showTerminal ? 'border-green-500 text-green-400' : 'border-green-900 text-green-700'}`}
            >
              <TerminalIcon className="w-4 h-4 mr-1" />
              Terminal
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
              className={`flex-1 ${showInfo ? 'border-green-500 text-green-400' : 'border-green-900 text-green-700'}`}
            >
              <Info className="w-4 h-4 mr-1" />
              Info
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* 3D View */}
        <div className="flex-1 relative">
          <PhoneSchematic
            phone={currentPhone}
            selectedComponent={selectedComponent}
            onComponentSelect={setSelectedComponent}
            showConnections={showConnections}
          />
          
          {/* Overlay Controls */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 border border-green-900/50">
              <p className="text-green-400 text-xs">
                🖱️ Arrastra para rotar | 📜 Scroll para zoom | 👆 Click para seleccionar
              </p>
            </div>
          </div>

          {/* Component Legend */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-green-900/50">
            <h4 className="text-green-400 text-xs font-bold mb-2">Leyenda</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#FF6B35]"/> CPU</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#FF8C42]"/> GPU</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#4ECDC4]"/> RAM</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#45B7D1]"/> Storage</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#96CEB4]"/> Battery</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#DDA0DD]"/> Camera</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#5DADE2]"/> Display</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#F7DC6F]"/> Sensor</div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {(showTerminal || showInfo) && (
          <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col border-l border-green-900/50">
            {showInfo && (
              <div className={`${showTerminal ? 'h-1/2' : 'h-full'} border-b border-green-900/50`}>
                <ComponentInfo
                  component={selectedComponent ? currentPhone.components.find(c => c.id === selectedComponent) || null : null}
                  onClose={() => setSelectedComponent(null)}
                />
              </div>
            )}
            {showTerminal && (
              <div className={`${showInfo ? 'h-1/2' : 'h-full'}`}>
                <Terminal
                  phone={currentPhone}
                  selectedComponent={selectedComponent}
                  onComponentSelect={setSelectedComponent}
                  showConnections={showConnections}
                  setShowConnections={setShowConnections}
                  onChangePhone={handleChangePhone}
                  allPhones={phoneModels}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="h-8 bg-[#0c0c0c] border-t border-green-900/50 flex items-center justify-between px-4 text-xs">
        <div className="flex items-center gap-4">
          <span className="text-green-600">
            Componentes: <span className="text-green-400">{currentPhone.components.length}</span>
          </span>
          <span className="text-green-600">
            Conexiones: <span className="text-green-400">
              {currentPhone.components.reduce((acc, c) => acc + c.connections.length, 0)}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Power className="w-3 h-3 text-green-500" />
          <span className="text-green-600">Schematic3D Mobile v2.0.1</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
