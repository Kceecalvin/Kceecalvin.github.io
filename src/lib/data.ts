export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  category: 'Financial' | 'Physical' | 'Business';
}

export const projects: Project[] = [
  {
    id: 'financial-logic',
    title: 'Algorithmic Signaling & XAUUSD Processing',
    tagline: 'High-frequency trading architecture for BTC and Gold.',
    description: 'A robust system for real-time market signal generation and automated trade execution using MetaTrader 5 integration.',
    techStack: ['Python', 'MT5', 'TensorFlow', 'PostgreSQL'],
    imageUrl: '/assets/trading-architecture.jpg',
    category: 'Financial',
  },
  {
    id: 'physical-systems',
    title: 'IoT Embedded Logic & API Payloads',
    tagline: 'ESP32-based hardware integration with mobile money APIs.',
    description: 'Hardware-level engineering combining ESP32 microcontrollers with secure relay modules and mobile payment gateways.',
    techStack: ['C++', 'ESP32', 'Node.js', 'MQTT'],
    imageUrl: '/assets/hardware-logic.jpg',
    category: 'Physical',
  },
  {
    id: 'business-operations',
    title: 'Commercial Acreage Management Algorithms',
    tagline: 'Operational mathematics for large-scale agricultural tracking.',
    description: 'Cost vs. profit tracking algorithms designed for precision agricultural management and commercial scaling.',
    techStack: ['Next.js', 'D3.js', 'FastAPI', 'AWS'],
    imageUrl: '/assets/business-ops.jpg',
    category: 'Business',
  },
];
