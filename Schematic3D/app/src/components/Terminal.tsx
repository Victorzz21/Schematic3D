import { useState, useRef, useEffect } from 'react';
import type { PhoneModel } from '@/types/phone';

interface TerminalProps {
  phone: PhoneModel;
  selectedComponent: string | null;
  onComponentSelect: (id: string | null) => void;
  showConnections: boolean;
  setShowConnections: (show: boolean) => void;
  onChangePhone: (phoneId: string) => void;
  allPhones: PhoneModel[];
}

interface Command {
  input: string;
  output: string[];
  timestamp: string;
}

export function Terminal({ 
  phone, 
  selectedComponent, 
  onComponentSelect, 
  showConnections, 
  setShowConnections,
  onChangePhone,
  allPhones
}: TerminalProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [commands]);

  useEffect(() => {
    // Initial welcome message
    setCommands([{
      input: '',
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║           SCHEMATIC3D MOBILE - v2.0.1                        ║',
        '║           Sistema de Esquemáticos 3D para Celulares          ║',
        '╚══════════════════════════════════════════════════════════════╝',
        '',
        `Modelo cargado: ${phone.brand} ${phone.name} (${phone.year})`,
        `Componentes: ${phone.components.length}`,
        '',
        'Escribe "help" para ver los comandos disponibles.',
        ''
      ],
      timestamp: new Date().toLocaleTimeString()
    }]);
  }, []);

  const executeCommand = (input: string) => {
    const args = input.trim().toLowerCase().split(' ');
    const command = args[0];
    const output: string[] = [];

    switch (command) {
      case 'help':
      case '?':
        output.push(
          '╔══════════════════════════════════════════════════════════════╗',
          '║                    COMANDOS DISPONIBLES                      ║',
          '╠══════════════════════════════════════════════════════════════╣',
          '║  help, ?              - Muestra esta ayuda                   ║',
          '║  list                 - Lista todos los componentes          ║',
          '║  list [tipo]          - Lista componentes por tipo           ║',
          '║  select [id]          - Selecciona un componente             ║',
          '║  info [id]            - Muestra info detallada               ║',
          '║  connections          - Muestra/oculta conexiones            ║',
          '║  trace [id]           - Traza líneas desde componente        ║',
          '║  phones               - Lista modelos disponibles            ║',
          '║  load [id]            - Carga un modelo de celular           ║',
          '║  search [texto]       - Busca componentes                    ║',
          '║  clear                - Limpia la terminal                   ║',
          '║  reset                - Resetea la vista 3D                  ║',
          '║  export               - Exporta esquemático a JSON           ║',
          '║  exit                 - Cierra la aplicación                 ║',
          '╚══════════════════════════════════════════════════════════════╝',
          '',
          'Tipos de componentes: cpu, gpu, ram, storage, battery, camera,',
          '                      display, connector, sensor, antenna'
        );
        break;

      case 'list':
        if (args[1]) {
          const type = args[1];
          const filtered = phone.components.filter(c => c.type === type);
          if (filtered.length === 0) {
            output.push(`No se encontraron componentes de tipo "${type}"`);
          } else {
            output.push(`Componentes de tipo "${type}":`, '');
            filtered.forEach(c => {
              output.push(`  [${c.id.padEnd(15)}] ${c.name}`);
            });
          }
        } else {
          output.push('Lista de componentes:', '');
          output.push('ID                | TIPO      | NOMBRE');
          output.push('──────────────────┼───────────┼─────────────────────────');
          phone.components.forEach(c => {
            output.push(`${c.id.padEnd(17)} | ${c.type.padEnd(9)} | ${c.name}`);
          });
        }
        break;

      case 'select':
        if (!args[1]) {
          output.push('Uso: select [id]');
          output.push('Ejemplo: select a17-pro');
        } else {
          const compId = args[1];
          const component = phone.components.find(c => c.id === compId);
          if (component) {
            onComponentSelect(compId);
            output.push(`Componente seleccionado: ${component.name}`);
            output.push(`Tipo: ${component.type}`);
            output.push(`Posición: [${component.position.join(', ')}]`);
          } else {
            output.push(`Error: Componente "${compId}" no encontrado`);
          }
        }
        break;

      case 'info':
        const infoId = args[1] || selectedComponent;
        if (!infoId) {
          output.push('Uso: info [id] o selecciona un componente primero');
        } else {
          const comp = phone.components.find(c => c.id === infoId);
          if (comp) {
            output.push(
              '╔══════════════════════════════════════════════════════════════╗',
              `║  ${comp.name.padEnd(60)} ║`,
              '╠══════════════════════════════════════════════════════════════╣',
              `║  ID:          ${comp.id.padEnd(50)} ║`,
              `║  Tipo:        ${comp.type.toUpperCase().padEnd(50)} ║`,
              `║  Posición:    [${comp.position.map(p => p.toFixed(2)).join(', ').padEnd(46)}] ║`,
              '║                                                              ║',
              `║  Descripción: ${comp.description.substring(0, 45).padEnd(45)} ║`,
              comp.description.length > 45 ? `║               ${comp.description.substring(45, 90).padEnd(45)} ║` : '',
              '║                                                              ║',
              '║  Conexiones:                                                 ║'
            );
            if (comp.connections.length === 0) {
              output.push('║    (Ninguna)                                                 ║');
            } else {
              comp.connections.forEach(connId => {
                const conn = phone.components.find(c => c.id === connId);
                output.push(`║    → ${(conn ? conn.name : connId).substring(0, 54).padEnd(54)} ║`);
              });
            }
            output.push('╚══════════════════════════════════════════════════════════════╝');
          } else {
            output.push(`Error: Componente "${infoId}" no encontrado`);
          }
        }
        break;

      case 'connections':
        setShowConnections(!showConnections);
        output.push(showConnections ? 'Conexiones ocultas' : 'Conexiones visibles');
        break;

      case 'trace':
        if (!args[1]) {
          output.push('Uso: trace [id]');
          output.push('Traza todas las conexiones desde un componente');
        } else {
          const traceId = args[1];
          const traceComp = phone.components.find(c => c.id === traceId);
          if (traceComp) {
            onComponentSelect(traceId);
            setShowConnections(true);
            output.push(`Trazando conexiones desde: ${traceComp.name}`);
            output.push('');
            output.push('Conexiones directas:');
            traceComp.connections.forEach((connId, idx) => {
              const conn = phone.components.find(c => c.id === connId);
              output.push(`  ${idx + 1}. ${conn ? conn.name : connId} [${connId}]`);
            });
            
            // Find indirect connections
            const indirect: string[] = [];
            traceComp.connections.forEach(connId => {
              const conn = phone.components.find(c => c.id === connId);
              if (conn) {
                conn.connections.forEach(indirectId => {
                  if (indirectId !== traceId && !traceComp.connections.includes(indirectId)) {
                    indirect.push(indirectId);
                  }
                });
              }
            });
            
            if (indirect.length > 0) {
              output.push('');
              output.push('Conexiones indirectas:');
              [...new Set(indirect)].forEach((indId, idx) => {
                const ind = phone.components.find(c => c.id === indId);
                output.push(`  ${idx + 1}. ${ind ? ind.name : indId} [${indId}]`);
              });
            }
          } else {
            output.push(`Error: Componente "${traceId}" no encontrado`);
          }
        }
        break;

      case 'phones':
        output.push('Modelos disponibles:', '');
        output.push('ID                  | MARCA      | NOMBRE              | AÑO');
        output.push('────────────────────┼────────────┼─────────────────────┼─────');
        allPhones.forEach(p => {
          output.push(`${p.id.padEnd(19)} | ${p.brand.padEnd(10)} | ${p.name.padEnd(19)} | ${p.year}`);
        });
        break;

      case 'load':
        if (!args[1]) {
          output.push('Uso: load [id]');
          output.push('Ejemplo: load samsung-s24-ultra');
        } else {
          const phoneId = args[1];
          const newPhone = allPhones.find(p => p.id === phoneId);
          if (newPhone) {
            onChangePhone(phoneId);
            output.push(`Cargando modelo: ${newPhone.brand} ${newPhone.name}...`);
          } else {
            output.push(`Error: Modelo "${phoneId}" no encontrado`);
            output.push('Usa "phones" para ver los modelos disponibles');
          }
        }
        break;

      case 'search':
        if (!args[1]) {
          output.push('Uso: search [texto]');
        } else {
          const query = args.slice(1).join(' ').toLowerCase();
          const results = phone.components.filter(c => 
            c.name.toLowerCase().includes(query) ||
            c.id.toLowerCase().includes(query) ||
            c.type.toLowerCase().includes(query) ||
            c.description.toLowerCase().includes(query)
          );
          output.push(`Resultados de búsqueda para "${query}":`, '');
          if (results.length === 0) {
            output.push('No se encontraron resultados');
          } else {
            results.forEach(c => {
              output.push(`  [${c.type}] ${c.name} (${c.id})`);
            });
          }
        }
        break;

      case 'clear':
        setCommands([]);
        return;

      case 'reset':
        onComponentSelect(null);
        setShowConnections(false);
        output.push('Vista 3D reseteada');
        break;

      case 'export':
        const data = {
          model: phone,
          exportedAt: new Date().toISOString(),
          version: '2.0.1'
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${phone.id}-schematic.json`;
        a.click();
        URL.revokeObjectURL(url);
        output.push(`Esquemático exportado: ${phone.id}-schematic.json`);
        break;

      case 'exit':
        output.push('Cerrando Schematic3D Mobile...');
        output.push('¡Hasta pronto!');
        setTimeout(() => window.close(), 1000);
        break;

      case '':
        break;

      default:
        output.push(`Comando no reconocido: "${command}"`);
        output.push('Escribe "help" para ver los comandos disponibles');
    }

    setCommands(prev => [...prev, {
      input,
      output,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCommandHistory(prev => [...prev, currentInput]);
      setHistoryIndex(-1);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple auto-complete
      const input = currentInput.toLowerCase();
      const commands = ['help', 'list', 'select', 'info', 'connections', 'trace', 'phones', 'load', 'search', 'clear', 'reset', 'export', 'exit'];
      const match = commands.find(cmd => cmd.startsWith(input));
      if (match) {
        setCurrentInput(match);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0c0c0c] border-l border-green-900/50 font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#1a1a1a] border-b border-green-900/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-green-400">PowerShell - Schematic3D</span>
        </div>
        <div className="text-green-600 text-xs">v2.0.1</div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-3 space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {commands.map((cmd, idx) => (
          <div key={idx} className="space-y-1">
            {cmd.input && (
              <div className="flex items-center gap-2">
                <span className="text-green-500">PS</span>
                <span className="text-blue-400">Schematic3D&gt;</span>
                <span className="text-white">{cmd.input}</span>
              </div>
            )}
            {cmd.output.map((line, lineIdx) => (
              <div 
                key={lineIdx} 
                className={`${
                  line.startsWith('╔') || line.startsWith('╚') || line.startsWith('╠') 
                    ? 'text-green-400' 
                    : line.startsWith('Error') 
                      ? 'text-red-400' 
                      : 'text-green-300'
                }`}
              >
                {line || <br />}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Input Line */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border-t border-green-900/50">
        <span className="text-green-500">PS</span>
        <span className="text-blue-400">Schematic3D&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white outline-none font-mono"
          placeholder="Escribe un comando..."
          autoFocus
        />
      </form>
    </div>
  );
}
