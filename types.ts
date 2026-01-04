
export enum FishCategory {
  FRESH = 'Fresco',
  FROZEN = 'Congelado',
  DRIED = 'Seco'
}

export enum OrderStatus {
  PENDING = 'Pendente',
  PREPARING = 'Preparando',
  OUT_FOR_DELIVERY = 'Em Entrega',
  DELIVERED = 'Entregue',
  CANCELLED = 'Cancelado'
}

export enum PaymentMethod {
  BANK_TRANSFER = 'Transferência Bancária',
  MULTICAIXA_EXPRESS = 'Multicaixa Express',
  CASH = 'Dinheiro na Entrega',
  ONLINE_PAYMENT = 'Pagamento Online (Cartão/Express)'
}

export enum EmployeeRole {
  MANAGER = 'Gerente',
  SELLER = 'Vendedor',
  DELIVERY = 'Estafeta',
  HANDLER = 'Tratador de Peixe'
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: EmployeeRole;
  phone: string;
  status: 'Ativo' | 'Inativo';
  hireDate: string;
}

export interface ShopSettings {
  name: string;
  logoUrl?: string;
  nif: string;
  address: string;
  whatsapp: string;
  isOpen: boolean;
  baseDeliveryFee: number;
  ivaRate: number;
  ivaEnabled: boolean;
  accentColor: string;
  openingTime: string;
  closingTime: string;
  notifyOnOpen: boolean;
  notifyOnClose: boolean;
}

export interface Notification {
  id: string;
  orderId: string;
  title: string;
  message: string;
  type: 'status_update' | 'delivery_tracking';
  timestamp: string;
  read: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: FishCategory;
  pricePerKg: number;
  pricePerBox: number;
  stockKg: number;
  stockBoxes: number;
  imageUrl: string;
  expirationDate: string;
  description: string;
}

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  unit: 'kg' | 'box';
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  landmark: string;
  deliverySlot: string;
  isReservation: boolean;
  createdAt: string;
  isPaid?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  totalSpent: number;
  joinDate: string;
}
