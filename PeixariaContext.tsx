
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, Customer, CartItem, OrderStatus, FishCategory, Notification, ShopSettings, Employee, EmployeeRole } from './types';
import { MOCK_PRODUCTS } from './constants';

interface PeixariaContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  employees: Employee[];
  cart: CartItem[];
  notifications: Notification[];
  settings: ShopSettings;
  isAdminAuthenticated: boolean;
  currentStaff: Employee | null;
  currentCustomer: Customer | null;
  adminEmail: string | null;
  loginAdmin: (email: string, pass: string) => boolean;
  loginStaff: (email: string, pass: string) => boolean;
  loginCustomer: (email: string, pass: string) => boolean;
  logout: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, unit: string) => void;
  clearCart: () => void;
  placeOrder: (orderData: Partial<Order>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  markNotificationsAsRead: () => void;
  updateSettings: (newSettings: ShopSettings) => void;
  addCustomer: (customer: Customer) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  removeEmployee: (id: string) => void;
}

const DEFAULT_SETTINGS: ShopSettings = {
  name: "Khrismir",
  logoUrl: "",
  nif: "",
  address: "Lubango, Huíla - Angola",
  whatsapp: "",
  isOpen: true,
  baseDeliveryFee: 1000,
  ivaRate: 14,
  ivaEnabled: true,
  accentColor: "#3b82f6",
  openingTime: "08:00",
  closingTime: "18:00",
  notifyOnOpen: true,
  notifyOnClose: false
};

const PeixariaContext = createContext<PeixariaContextType | undefined>(undefined);

export const PeixariaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<ShopSettings>(DEFAULT_SETTINGS);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [currentStaff, setCurrentStaff] = useState<Employee | null>(null);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 'admin-01',
      name: 'Administrador Principal',
      email: 'jorgeamaral2009@gmail.com',
      password: 'podescre0',
      role: EmployeeRole.MANAGER,
      phone: '900000000',
      status: 'Ativo',
      hireDate: new Date().toISOString()
    }
  ]);

  // Aplicar cor de destaque dinamicamente
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
    // Gerar uma versão transparente para backgrounds
    const r = parseInt(settings.accentColor.slice(1, 3), 16);
    const g = parseInt(settings.accentColor.slice(3, 5), 16);
    const b = parseInt(settings.accentColor.slice(5, 7), 16);
    document.documentElement.style.setProperty('--accent-color-rgb', `${r}, ${g}, ${b}`);
  }, [settings.accentColor]);

  const loginAdmin = (email: string, pass: string) => {
    if (email === 'jorgeamaral2009@gmail.com' && pass === 'podescre0') {
      setIsAdminAuthenticated(true);
      setAdminEmail(email);
      return true;
    }
    return false;
  };

  const loginStaff = (email: string, pass: string) => {
    const emp = employees.find(e => e.email === email && e.password === pass);
    if (emp) {
      setCurrentStaff(emp);
      return true;
    }
    return false;
  };

  const loginCustomer = (email: string, pass: string) => {
    const cust = customers.find(c => c.email === email && c.password === pass);
    if (cust) {
      setCurrentCustomer(cust);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    setAdminEmail(null);
    setCurrentStaff(null);
    setCurrentCustomer(null);
  };

  const addCustomer = (customer: Customer) => setCustomers(prev => [...prev, customer]);
  const addEmployee = (employee: Employee) => setEmployees(prev => [...prev, employee]);
  const updateEmployee = (updated: Employee) => setEmployees(prev => prev.map(e => e.id === updated.id ? updated : e));
  const removeEmployee = (id: string) => setEmployees(prev => prev.filter(e => e.id !== id));

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === item.productId && i.unit === item.unit);
      if (existing) {
        return prev.map(i => (i.productId === item.productId && i.unit === item.unit) ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, unit: string) => {
    setCart(prev => prev.filter(i => !(i.productId === productId && i.unit === unit)));
  };

  const clearCart = () => setCart([]);

  const addProduct = (p: Product) => setProducts(prev => [...prev, p]);
  const updateProduct = (updated: Product) => setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  const updateSettings = (newSettings: ShopSettings) => setSettings(newSettings);

  const placeOrder = (orderData: Partial<Order>) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerId: currentCustomer?.id || 'guest', 
      customerName: orderData.customerName || currentCustomer?.name || 'Consumidor',
      items: [...cart],
      total: cart.reduce((acc, i) => acc + (i.price * i.quantity), 0),
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString(),
      ...orderData
    } as Order;
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <PeixariaContext.Provider value={{
      products, orders, customers, employees, cart, notifications, settings, 
      isAdminAuthenticated, currentStaff, currentCustomer, adminEmail,
      loginAdmin, loginStaff, loginCustomer, logout,
      addToCart, removeFromCart, clearCart, placeOrder, addProduct,
      updateOrderStatus, updateProduct, markNotificationsAsRead, updateSettings,
      addCustomer, addEmployee, updateEmployee, removeEmployee
    }}>
      {children}
    </PeixariaContext.Provider>
  );
};

export const usePeixaria = () => {
  const context = useContext(PeixariaContext);
  if (!context) throw new Error('usePeixaria must be used within a PeixariaProvider');
  return context;
};
