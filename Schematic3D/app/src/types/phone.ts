export interface PhoneComponent {
  id: string;
  name: string;
  type: 'cpu' | 'gpu' | 'ram' | 'storage' | 'battery' | 'camera' | 'display' | 'connector' | 'sensor' | 'antenna';
  position: [number, number, number];
  connections: string[];
  color: string;
  description: string;
}

export interface PhoneModel {
  id: string;
  name: string;
  brand: string;
  year: number;
  components: PhoneComponent[];
  dimensions: [number, number, number];
}

export interface Connection {
  from: string;
  to: string;
  type: 'data' | 'power' | 'signal';
}
