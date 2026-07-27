export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'usd';
  isDigital: boolean;
  downloadPath?: string;
  downloadS3Key?: string;
  instructions?: string;
};

export const products: Product[] = [
  {
    id: 'systems-architecture-playbook',
    name: 'Systems Architecture Playbook',
    description: 'A practical field guide to resilient distributed system design.',
    price: 4900,
    currency: 'usd',
    isDigital: true,
    downloadPath: '/lead-magnet.pdf',
    downloadS3Key: 'downloads/systems-architecture-playbook.pdf',
    instructions: 'Download immediately and keep this link for your archives.',
  },
];

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}
