import type { PhoneModel } from '@/types/phone';

export const phoneModels: PhoneModel[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    year: 2023,
    dimensions: [7.1, 14.7, 0.83],
    components: [
      {
        id: 'a17-pro',
        name: 'A17 Pro Chip',
        type: 'cpu',
        position: [0, 2, 0.2],
        connections: ['ram-8gb', 'gpu-6core', 'nand-256gb'],
        color: '#FF6B35',
        description: 'Chip A17 Pro con tecnología de 3nm'
      },
      {
        id: 'gpu-6core',
        name: 'GPU 6-Core',
        type: 'gpu',
        position: [1.5, 2, 0.2],
        connections: ['a17-pro', 'display-oled'],
        color: '#FF8C42',
        description: 'GPU de 6 núcleos con ray tracing'
      },
      {
        id: 'ram-8gb',
        name: 'RAM 8GB',
        type: 'ram',
        position: [-1.5, 2, 0.2],
        connections: ['a17-pro'],
        color: '#4ECDC4',
        description: 'Memoria RAM LPDDR5 de 8GB'
      },
      {
        id: 'nand-256gb',
        name: 'Storage 256GB',
        type: 'storage',
        position: [0, 0.5, 0.2],
        connections: ['a17-pro'],
        color: '#45B7D1',
        description: 'Almacenamiento NAND Flash de 256GB'
      },
      {
        id: 'battery-3274',
        name: 'Battery 3274mAh',
        type: 'battery',
        position: [0, -3, 0.2],
        connections: ['charging-port', 'a17-pro', 'display-oled'],
        color: '#96CEB4',
        description: 'Batería de ion-litio de 3274mAh'
      },
      {
        id: 'main-camera',
        name: 'Main Camera 48MP',
        type: 'camera',
        position: [-2, 5, -0.3],
        connections: ['a17-pro', 'lidar'],
        color: '#DDA0DD',
        description: 'Cámara principal de 48MP con sensor Sony'
      },
      {
        id: 'ultra-camera',
        name: 'Ultra Wide 12MP',
        type: 'camera',
        position: [0, 5, -0.3],
        connections: ['a17-pro'],
        color: '#DDA0DD',
        description: 'Cámara ultra gran angular de 12MP'
      },
      {
        id: 'tele-camera',
        name: 'Telephoto 12MP',
        type: 'camera',
        position: [2, 5, -0.3],
        connections: ['a17-pro'],
        color: '#DDA0DD',
        description: 'Cámara telefoto de 12MP con zoom 3x'
      },
      {
        id: 'lidar',
        name: 'LiDAR Scanner',
        type: 'sensor',
        position: [2.5, 4.5, -0.3],
        connections: ['main-camera', 'a17-pro'],
        color: '#F7DC6F',
        description: 'Escáner LiDAR para enfoque nocturno'
      },
      {
        id: 'display-oled',
        name: 'Super Retina XDR',
        type: 'display',
        position: [0, 0, 0.5],
        connections: ['a17-pro', 'gpu-6core'],
        color: '#5DADE2',
        description: 'Pantalla OLED de 6.1" con ProMotion 120Hz'
      },
      {
        id: 'charging-port',
        name: 'USB-C Port',
        type: 'connector',
        position: [0, -6.5, 0],
        connections: ['battery-3274', 'a17-pro'],
        color: '#AED6F1',
        description: 'Puerto USB-C con carga rápida 20W'
      },
      {
        id: 'face-id',
        name: 'Face ID',
        type: 'sensor',
        position: [0, 5.5, 0.3],
        connections: ['a17-pro'],
        color: '#F8C471',
        description: 'Sistema de reconocimiento facial TrueDepth'
      },
      {
        id: '5g-antenna',
        name: '5G Antenna',
        type: 'antenna',
        position: [3, 0, 0],
        connections: ['a17-pro'],
        color: '#82E0AA',
        description: 'Módulo 5G mmWave y sub-6GHz'
      },
      {
        id: 'wifi-bt',
        name: 'WiFi 6E + BT 5.3',
        type: 'antenna',
        position: [-3, 0, 0],
        connections: ['a17-pro'],
        color: '#82E0AA',
        description: 'Conectividad inalámbrica de alta velocidad'
      }
    ]
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    year: 2024,
    dimensions: [7.9, 16.3, 0.86],
    components: [
      {
        id: 'snapdragon-8g3',
        name: 'Snapdragon 8 Gen 3',
        type: 'cpu',
        position: [0, 2, 0.2],
        connections: ['ram-12gb', 'gpu-adreno', 'storage-512gb'],
        color: '#FF6B35',
        description: 'Snapdragon 8 Gen 3 para Galaxy'
      },
      {
        id: 'gpu-adreno',
        name: 'Adreno 750',
        type: 'gpu',
        position: [1.5, 2, 0.2],
        connections: ['snapdragon-8g3', 'display-amoled'],
        color: '#FF8C42',
        description: 'GPU Adreno 750 con ray tracing'
      },
      {
        id: 'ram-12gb',
        name: 'RAM 12GB',
        type: 'ram',
        position: [-1.5, 2, 0.2],
        connections: ['snapdragon-8g3'],
        color: '#4ECDC4',
        description: 'Memoria RAM LPDDR5X de 12GB'
      },
      {
        id: 'storage-512gb',
        name: 'Storage 512GB',
        type: 'storage',
        position: [0, 0.5, 0.2],
        connections: ['snapdragon-8g3'],
        color: '#45B7D1',
        description: 'Almacenamiento UFS 4.0 de 512GB'
      },
      {
        id: 'battery-5000',
        name: 'Battery 5000mAh',
        type: 'battery',
        position: [0, -3, 0.2],
        connections: ['usb-c-45w', 'snapdragon-8g3', 'display-amoled'],
        color: '#96CEB4',
        description: 'Batería de 5000mAh con carga súper rápida 45W'
      },
      {
        id: 'main-200mp',
        name: 'Main Camera 200MP',
        type: 'camera',
        position: [-2, 5, -0.3],
        connections: ['snapdragon-8g3'],
        color: '#DDA0DD',
        description: 'Cámara principal de 200MP con OIS'
      },
      {
        id: 'ultra-12mp',
        name: 'Ultra Wide 12MP',
        type: 'camera',
        position: [0, 5, -0.3],
        connections: ['snapdragon-8g3'],
        color: '#DDA0DD',
        description: 'Cámara ultra gran angular de 12MP'
      },
      {
        id: 'tele-50mp',
        name: 'Telephoto 50MP',
        type: 'camera',
        position: [2, 5, -0.3],
        connections: ['snapdragon-8g3'],
        color: '#DDA0DD',
        description: 'Cámara telefoto de 50MP con zoom 5x'
      },
      {
        id: 'tele-10mp',
        name: 'Periscope 10MP',
        type: 'camera',
        position: [2.5, 4.5, -0.3],
        connections: ['snapdragon-8g3'],
        color: '#DDA0DD',
        description: 'Cámara periscopio de 10MP con zoom 10x'
      },
      {
        id: 'display-amoled',
        name: 'Dynamic AMOLED 2X',
        type: 'display',
        position: [0, 0, 0.5],
        connections: ['snapdragon-8g3', 'gpu-adreno'],
        color: '#5DADE2',
        description: 'Pantalla AMOLED de 6.8" con 120Hz y 2600 nits'
      },
      {
        id: 'usb-c-45w',
        name: 'USB-C 45W',
        type: 'connector',
        position: [0, -6.5, 0],
        connections: ['battery-5000', 'snapdragon-8g3'],
        color: '#AED6F1',
        description: 'Puerto USB-C con carga súper rápida 45W'
      },
      {
        id: 'spen',
        name: 'S Pen',
        type: 'sensor',
        position: [-3, 5, -0.3],
        connections: ['snapdragon-8g3'],
        color: '#F8C471',
        description: 'Lápiz óptico S Pen con latencia de 2.8ms'
      },
      {
        id: '5g-sub6',
        name: '5G Sub-6',
        type: 'antenna',
        position: [3.5, 0, 0],
        connections: ['snapdragon-8g3'],
        color: '#82E0AA',
        description: 'Módulo 5G sub-6GHz integrado'
      },
      {
        id: 'wifi-7',
        name: 'WiFi 7',
        type: 'antenna',
        position: [-3.5, 0, 0],
        connections: ['snapdragon-8g3'],
        color: '#82E0AA',
        description: 'Conectividad WiFi 7 de última generación'
      }
    ]
  },
  {
    id: 'pixel-8-pro',
    name: 'Pixel 8 Pro',
    brand: 'Google',
    year: 2023,
    dimensions: [7.6, 16.2, 0.89],
    components: [
      {
        id: 'tensor-g3',
        name: 'Tensor G3',
        type: 'cpu',
        position: [0, 2, 0.2],
        connections: ['ram-12gb-pixel', 'tpu-g3', 'storage-128gb'],
        color: '#FF6B35',
        description: 'Google Tensor G3 con foco en IA'
      },
      {
        id: 'tpu-g3',
        name: 'TPU G3',
        type: 'gpu',
        position: [1.5, 2, 0.2],
        connections: ['tensor-g3', 'display-ltpo'],
        color: '#FF8C42',
        description: 'Unidad de procesamiento tensorial para IA'
      },
      {
        id: 'ram-12gb-pixel',
        name: 'RAM 12GB',
        type: 'ram',
        position: [-1.5, 2, 0.2],
        connections: ['tensor-g3'],
        color: '#4ECDC4',
        description: 'Memoria RAM LPDDR5X de 12GB'
      },
      {
        id: 'storage-128gb',
        name: 'Storage 128GB',
        type: 'storage',
        position: [0, 0.5, 0.2],
        connections: ['tensor-g3'],
        color: '#45B7D1',
        description: 'Almacenamiento UFS 3.1 de 128GB'
      },
      {
        id: 'battery-5050',
        name: 'Battery 5050mAh',
        type: 'battery',
        position: [0, -3, 0.2],
        connections: ['usb-c-30w', 'tensor-g3', 'display-ltpo'],
        color: '#96CEB4',
        description: 'Batería de 5050mAh con carga rápida 30W'
      },
      {
        id: 'main-50mp',
        name: 'Main Camera 50MP',
        type: 'camera',
        position: [-1.5, 5, -0.3],
        connections: ['tensor-g3'],
        color: '#DDA0DD',
        description: 'Cámara principal de 50MP con Octa PD'
      },
      {
        id: 'ultra-48mp',
        name: 'Ultra Wide 48MP',
        type: 'camera',
        position: [0, 5, -0.3],
        connections: ['tensor-g3'],
        color: '#DDA0DD',
        description: 'Cámara ultra gran angular de 48MP'
      },
      {
        id: 'tele-48mp',
        name: 'Telephoto 48MP',
        type: 'camera',
        position: [1.5, 5, -0.3],
        connections: ['tensor-g3'],
        color: '#DDA0DD',
        description: 'Cámara telefoto de 48MP con zoom 5x'
      },
      {
        id: 'temp-sensor',
        name: 'Temp Sensor',
        type: 'sensor',
        position: [2.5, 4.5, -0.3],
        connections: ['tensor-g3'],
        color: '#F7DC6F',
        description: 'Sensor de temperatura para objetos'
      },
      {
        id: 'display-ltpo',
        name: 'Super Actua LTPO',
        type: 'display',
        position: [0, 0, 0.5],
        connections: ['tensor-g3', 'tpu-g3'],
        color: '#5DADE2',
        description: 'Pantalla LTPO OLED de 6.7" con 120Hz'
      },
      {
        id: 'usb-c-30w',
        name: 'USB-C 30W',
        type: 'connector',
        position: [0, -6.5, 0],
        connections: ['battery-5050', 'tensor-g3'],
        color: '#AED6F1',
        description: 'Puerto USB-C con carga rápida 30W'
      },
      {
        id: 'face-unlock',
        name: 'Face Unlock',
        type: 'sensor',
        position: [0, 5.5, 0.3],
        connections: ['tensor-g3'],
        color: '#F8C471',
        description: 'Desbloqueo facial con aprendizaje de ML'
      },
      {
        id: '5g-pixel',
        name: '5G Modem',
        type: 'antenna',
        position: [3.2, 0, 0],
        connections: ['tensor-g3'],
        color: '#82E0AA',
        description: 'Módem 5G integrado en Tensor G3'
      },
      {
        id: 'wifi-6e',
        name: 'WiFi 6E',
        type: 'antenna',
        position: [-3.2, 0, 0],
        connections: ['tensor-g3'],
        color: '#82E0AA',
        description: 'Conectividad WiFi 6E de alta velocidad'
      }
    ]
  }
];

export const getPhoneById = (id: string) => phoneModels.find(p => p.id === id);
export const getAllPhones = () => phoneModels;
