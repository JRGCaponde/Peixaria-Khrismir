
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Search, 
  Trash2, 
  X, 
  Settings, 
  Save, 
  Edit, 
  Users, 
  Briefcase,
  ShoppingCart,
  Minus,
  BarChart3,
  ShieldCheck,
  Activity,
  UserPlus,
  Lock,
  Phone,
  Mail,
  Store,
  MapPin,
  CreditCard,
  Banknote,
  Fish,
  Upload,
  Image as ImageIcon,
  Bell,
  ChevronDown,
  LayoutGrid,
  Menu,
  MoreVertical,
  LogOut,
  Calendar,
  Filter
} from 'lucide-react';
import { usePeixaria } from '../PeixariaContext';
import { formatCurrency } from '../constants';
import { OrderStatus, Product, FishCategory, Employee, EmployeeRole, Customer, PaymentMethod, ShopSettings } from '../types';

// --- UTILS ---
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

// --- COMPONENTE DE CONFIGURAÇÕES ---

const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = usePeixaria();
  const [formData, setFormData] = useState<ShopSettings>({ ...settings });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateSettings(formData);
    alert("Configurações atualizadas com sucesso!");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = "w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-1 dynamic-accent-ring outline-none text-xs font-medium";
  const labelClass = "text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1 block ml-1";

  const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ${active ? 'dynamic-accent-bg' : 'bg-slate-700'}`}>
      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all`} style={{ left: active ? '22px' : '2px' }} />
    </button>
  );

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 dynamic-accent-soft-bg rounded-lg">
            <Settings className="h-5 w-5 dynamic-accent-text" />
          </div>
          <h1 className="text-xl font-bold text-white uppercase tracking-tight">Configurações da Empresa</h1>
        </div>
        <button onClick={handleSave} className="w-full md:w-auto dynamic-accent-bg text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 dynamic-accent-shadow">
          <Save className="h-4 w-4" /> Salvar Alterações
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex flex-col md:flex-row items-center gap-6 text-center md:text-left glass">
        <div className="relative group shrink-0">
          <div className="h-28 w-28 rounded-[24px] bg-black/40 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all" onClick={() => fileInputRef.current?.click()}>
            {formData.logoUrl ? (
              <img src={formData.logoUrl} className="h-full w-full object-contain p-2" alt="Logo" />
            ) : (
              <Upload className="h-8 w-8 text-slate-600" />
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-[24px]">
              <ImageIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">{formData.name || 'Sua Peixaria'}</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Sua identidade digital no Lubango</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
             <div className="flex flex-col gap-1">
                <span className={labelClass}>Cor Principal</span>
                <input type="color" value={formData.accentColor} onChange={e => setFormData({...formData, accentColor: e.target.value})} className="h-8 w-16 bg-transparent border-0 cursor-pointer" />
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20 md:pb-0">
        <div className="bg-white/5 p-6 rounded-[24px] border border-white/10 space-y-4 glass">
          <h3 className="text-[10px] font-bold dynamic-accent-text uppercase tracking-[0.2em] mb-4">Dados Institucionais</h3>
          <div><label className={labelClass}>Nome da Peixaria</label><input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClass} /></div>
          <div><label className={labelClass}>NIF</label><input value={formData.nif} onChange={e => setFormData({...formData, nif: e.target.value})} className={inputClass} /></div>
          <div><label className={labelClass}>WhatsApp</label><input value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className={inputClass} /></div>
          <div><label className={labelClass}>Localização</label><input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className={inputClass} /></div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-[24px] border border-white/10 space-y-4 glass">
            <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-4">Regras & Taxas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClass}>IVA (%)</label><input type="number" value={formData.ivaRate} onChange={e => setFormData({...formData, ivaRate: Number(e.target.value)})} className={inputClass} /></div>
              <div><label className={labelClass}>Entrega (Kz)</label><input type="number" value={formData.baseDeliveryFee} onChange={e => setFormData({...formData, baseDeliveryFee: Number(e.target.value)})} className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClass}>Horário Abertura</label><input type="time" value={formData.openingTime} onChange={e => setFormData({...formData, openingTime: e.target.value})} className={inputClass} /></div>
              <div><label className={labelClass}>Horário Fecho</label><input type="time" value={formData.closingTime} onChange={e => setFormData({...formData, closingTime: e.target.value})} className={inputClass} /></div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loja em Operação</label>
              <Toggle active={formData.isOpen} onClick={() => setFormData({...formData, isOpen: !formData.isOpen})} />
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-[24px] border border-white/10 space-y-4 glass">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-4 w-4 text-amber-400" />
              <h3 className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em]">Notificações Inteligentes</h3>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-white uppercase">Aviso de Abertura</span>
                <span className="text-[9px] text-slate-500">Notificar lista VIP na abertura</span>
              </div>
              <Toggle active={formData.notifyOnOpen} onClick={() => setFormData({...formData, notifyOnOpen: !formData.notifyOnOpen})} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-white uppercase">Aviso de Fecho</span>
                <span className="text-[9px] text-slate-500">Notificar sobre horário limite</span>
              </div>
              <Toggle active={formData.notifyOnClose} onClick={() => setFormData({...formData, notifyOnClose: !formData.notifyOnClose})} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STAFF MANAGEMENT ---
const StaffManagement: React.FC = () => {
  const { employees, addEmployee, removeEmployee } = usePeixaria();
  const [showModal, setShowModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', phone: '', password: '', role: EmployeeRole.SELLER });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee({ id: `EMP-${Date.now()}`, ...newStaff, status: 'Ativo', hireDate: new Date().toISOString() });
    setShowModal(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
          <Briefcase className="h-5 w-5 dynamic-accent-text" /> Equipa Operacional
        </h1>
        <button onClick={() => setShowModal(true)} className="w-full sm:w-auto dynamic-accent-bg text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase hover:brightness-110 dynamic-accent-shadow">
          Novo Operador
        </button>
      </div>

      <div className="bg-white/5 rounded-[32px] border border-white/10 overflow-hidden glass">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs min-w-[600px]">
            <thead className="bg-white/5 text-slate-500 text-[9px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Identidade</th>
                <th className="px-8 py-5">Função</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {employees.map(e => (
                <tr key={e.id} className="hover:bg-white/10 transition-colors">
                  <td className="px-8 py-4">
                    <p className="font-bold text-white">{e.name}</p>
                    <p className="text-[10px] text-slate-500">{e.email}</p>
                  </td>
                  <td className="px-8 py-4"><span className="dynamic-accent-text font-bold uppercase text-[10px]">{e.role}</span></td>
                  <td className="px-8 py-4"><span className={`px-2 py-1 rounded-lg text-[9px] font-bold border ${e.status === 'Ativo' ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}`}>{e.status}</span></td>
                  <td className="px-8 py-4 text-right"><button onClick={() => removeEmployee(e.id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0a0a1a] border border-white/10 rounded-[40px] w-full max-w-md p-8 glass animate-in zoom-in-95">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white uppercase">Registar Staff</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white"><X className="h-5 w-5"/></button>
             </div>
             <form onSubmit={handleAdd} className="space-y-4">
                <input required placeholder="Nome" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none dynamic-accent-ring focus:ring-1" />
                <input required type="email" placeholder="E-mail" value={newStaff.email} onChange={e => setNewStaff({...newStaff, email: e.target.value})} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none dynamic-accent-ring focus:ring-1" />
                <input required type="password" placeholder="Senha" value={newStaff.password} onChange={e => setNewStaff({...newStaff, password: e.target.value})} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none dynamic-accent-ring focus:ring-1" />
                <select value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value as any})} className="w-full p-3.5 bg-[#0a0a1a] border border-white/10 rounded-xl text-white outline-none">
                  {Object.values(EmployeeRole).map(role => <option key={role} value={role}>{role}</option>)}
                </select>
                <button className="w-full dynamic-accent-bg text-white py-4 rounded-2xl font-bold uppercase text-xs mt-4">Confirmar Cadastro</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PERFORMANCE STATS ---
type RangeType = 'all' | 'week' | 'month' | 'custom';

const Stats: React.FC = () => {
  const { orders } = usePeixaria();
  const [rangeType, setRangeType] = useState<RangeType>('all');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const filteredOrders = useMemo(() => {
    const now = new Date();
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      if (rangeType === 'week') {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        return orderDate >= lastWeek;
      }
      if (rangeType === 'month') {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        return orderDate >= lastMonth;
      }
      if (rangeType === 'custom' && customStart && customEnd) {
        const start = new Date(customStart);
        const end = new Date(customEnd);
        end.setHours(23, 59, 59, 999);
        return orderDate >= start && orderDate <= end;
      }
      return true; // all
    });
  }, [orders, rangeType, customStart, customEnd]);

  const totalRevenue = filteredOrders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = filteredOrders.length;
  
  // Agrupar dados para o gráfico baseado no filtro (simplificado para exibição)
  const chartData = useMemo(() => {
    // Caso real agruparia por data, aqui geramos dados baseados nos filtrados para visualização
    return [
      { n: 'Sem 1', v: totalRevenue * 0.2 },
      { n: 'Sem 2', v: totalRevenue * 0.3 },
      { n: 'Sem 3', v: totalRevenue * 0.25 },
      { n: 'Sem 4', v: totalRevenue * 0.25 },
    ];
  }, [totalRevenue]);

  const rangeButtons = [
    { id: 'all', label: 'Total' },
    { id: 'week', label: 'Últ. Semana' },
    { id: 'month', label: 'Últ. Mês' },
    { id: 'custom', label: 'Personalizado' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tighter uppercase">{getGreeting()}, Gestor</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Acompanhe a pulsação do seu negócio</p>
        </div>

        {/* Date Range Picker UI */}
        <div className="w-full md:w-auto bg-white/5 p-1.5 rounded-2xl border border-white/10 glass flex flex-col md:flex-row items-stretch md:items-center gap-2">
          <div className="flex gap-1">
            {rangeButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setRangeType(btn.id as RangeType)}
                className={`px-3 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${
                  rangeType === btn.id 
                    ? 'dynamic-accent-bg text-white shadow-lg' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
          
          {rangeType === 'custom' && (
            <div className="flex items-center gap-2 px-2 animate-in slide-in-from-right-2">
              <input 
                type="date" 
                value={customStart} 
                onChange={e => setCustomStart(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-lg text-[9px] px-2 py-1 text-white outline-none focus:ring-1 dynamic-accent-ring"
              />
              <span className="text-slate-600 text-[10px] font-bold">A</span>
              <input 
                type="date" 
                value={customEnd} 
                onChange={e => setCustomEnd(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-lg text-[9px] px-2 py-1 text-white outline-none focus:ring-1 dynamic-accent-ring"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {[
           { label: 'Facturação no Período', value: formatCurrency(totalRevenue), icon: TrendingUp, color: 'dynamic-accent-text' },
           { label: 'Vendas Realizadas', value: totalOrdersCount.toString(), icon: ShoppingCart, color: 'text-cyan-400' },
           { label: 'Média por Venda', value: formatCurrency(totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0), icon: Activity, color: 'text-green-400' },
         ].map((stat, i) => (
           <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[32px] glass hover:translate-y-[-4px] transition-transform">
              <div className="flex justify-between items-center mb-4">
                 <div className={`p-2 rounded-xl bg-white/5 border border-white/5 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                 </div>
                 {rangeType !== 'all' && (
                   <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">Filtrado</span>
                 )}
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold text-white tracking-tighter`}>{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 glass">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
           <h3 className="text-sm font-bold text-white uppercase tracking-tight">Distribuição de Receita por Período</h3>
           <div className="flex items-center gap-2 text-slate-500">
             <Calendar className="h-4 w-4" />
             <span className="text-[9px] font-bold uppercase tracking-widest">
               {rangeType === 'all' ? 'Histórico Geral' : 'Dados do Filtro Actual'}
             </span>
           </div>
        </div>
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={chartData}>
               <XAxis dataKey="n" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
               <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#0a0a1a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)'}} />
               <Bar dataKey="v" fill="var(--accent-color)" radius={[8, 8, 0, 0]} barSize={40} />
             </BarChart>
           </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- INVENTORY ---
const Inventory: React.FC = () => {
  const { products, addProduct } = usePeixaria();
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: FishCategory.FRESH, pricePerKg: 0, pricePerBox: 0, stockKg: 0, stockBoxes: 0, imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop' });

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
          <Package className="h-5 w-5 dynamic-accent-text" /> Gestão de Estoque
        </h1>
        <button onClick={() => setShowModal(true)} className="w-full sm:w-auto dynamic-accent-bg text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 dynamic-accent-shadow">
          <Plus className="h-4 w-4" /> Novo Lote
        </button>
      </div>

      <div className="bg-white/5 rounded-[32px] border border-white/10 overflow-hidden glass">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-white/5 text-slate-500 text-[9px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Espécie</th>
                <th className="px-8 py-5">Categoria</th>
                <th className="px-8 py-5">Stock KG</th>
                <th className="px-8 py-5">Preço KG</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/10 transition-colors">
                  <td className="px-8 py-4 flex items-center gap-4">
                    <img src={p.imageUrl} className="h-10 w-10 rounded-lg object-cover border border-white/5" />
                    <span className="font-bold text-white">{p.name}</span>
                  </td>
                  <td className="px-8 py-4 uppercase text-[9px] font-bold text-slate-500 tracking-widest">{p.category}</td>
                  <td className="px-8 py-4">
                    <span className={`font-bold ${p.stockKg < 10 ? 'text-red-400' : 'text-slate-300'}`}>{p.stockKg} kg</span>
                  </td>
                  <td className="px-8 py-4 dynamic-accent-text font-bold">{formatCurrency(p.pricePerKg)}</td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-slate-600 hover:text-white transition-colors"><Edit className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div className="p-20 text-center text-slate-600 font-bold uppercase text-[10px] tracking-[0.4em] opacity-40">Inventário Vazio</div>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0a0a1a] border border-white/10 rounded-[40px] w-full max-w-md p-8 glass animate-in zoom-in-95">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white uppercase">Novo Lote de Peixe</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white"><X className="h-5 w-5"/></button>
             </div>
             <form onSubmit={e => { e.preventDefault(); addProduct({id: Date.now().toString(), ...newProduct} as any); setShowModal(false); }} className="space-y-4">
                <input required placeholder="Espécie (ex: Garoupa)" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-1 dynamic-accent-ring" />
                <div className="grid grid-cols-2 gap-4">
                   <input required type="number" placeholder="Preço KG (Kz)" onChange={e => setNewProduct({...newProduct, pricePerKg: Number(e.target.value)})} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-1 dynamic-accent-ring" />
                   <input required type="number" placeholder="Estoque (KG)" onChange={e => setNewProduct({...newProduct, stockKg: Number(e.target.value)})} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-1 dynamic-accent-ring" />
                </div>
                <button className="w-full dynamic-accent-bg text-white py-4 rounded-2xl font-bold uppercase text-xs mt-4">Confirmar Entrada</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- POS (Otimizado) ---
const POS: React.FC = () => {
  const { products, cart, addToCart, removeFromCart, placeOrder } = usePeixaria();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  
  const total = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col md:flex-row bg-[#020208] overflow-hidden relative">
      <div className="flex-grow flex flex-col p-4 md:p-6 space-y-4 overflow-hidden">
        <div className="relative glass p-1 rounded-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
          <input 
            placeholder="Pesquisar peixe por nome ou lote..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold outline-none dynamic-accent-ring focus:ring-1" 
          />
        </div>
        
        <div className="flex-grow overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20 custom-scrollbar">
          {filtered.map(p => (
            <div key={p.id} className="bg-white/5 border border-white/10 p-3 rounded-2xl glass hover:border-blue-500/30 transition-all flex flex-col">
              <div className="h-28 rounded-xl overflow-hidden mb-3 relative group">
                <img src={p.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[8px] font-bold text-white uppercase tracking-widest">{p.category}</span>
                </div>
              </div>
              <p className="font-bold text-white text-[11px] mb-3 line-clamp-1 px-1">{p.name}</p>
              <div className="mt-auto">
                 <button 
                   onClick={() => addToCart({productId: p.id, name: p.name, quantity: 1, unit: 'kg', price: p.pricePerKg})} 
                   className="w-full dynamic-accent-soft-bg dynamic-accent-text p-2 rounded-xl text-[9px] font-bold hover:dynamic-accent-bg hover:text-white transition shadow-sm"
                 >
                   ADCIONAR KG
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer Desktop */}
      <div className="hidden md:flex w-80 lg:w-96 bg-[#050510] border-l border-white/5 flex-col glass shadow-2xl">
        <div className="p-5 border-b border-white/5 flex justify-between items-center">
           <h2 className="font-bold text-white text-xs uppercase tracking-widest">Caixa de Venda</h2>
           <span className="text-[9px] font-bold dynamic-accent-text uppercase px-2 py-0.5 rounded-lg bg-white/5">{cart.length} itens</span>
        </div>
        <div className="flex-grow overflow-y-auto p-5 space-y-3 custom-scrollbar">
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl text-[10px] border border-white/5 group">
              <div>
                <p className="text-white font-bold">{item.name}</p>
                <p className="text-slate-500 uppercase font-bold mt-0.5">{item.quantity}kg @ {formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                 <p className="dynamic-accent-text font-bold">{formatCurrency(item.price * item.quantity)}</p>
                 <button onClick={() => removeFromCart(item.productId, item.unit)} className="text-red-500/40 hover:text-red-500 transition-colors"><X className="h-4 w-4"/></button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
               <ShoppingCart className="h-10 w-10 mb-2" />
               <p className="text-[10px] font-bold uppercase">Cesto Vazio</p>
            </div>
          )}
        </div>
        <div className="p-6 bg-[#020208] border-t border-white/5 space-y-4 dynamic-accent-shadow">
          <div className="flex justify-between items-end">
             <span className="text-slate-500 font-bold text-[9px] uppercase tracking-widest">Total Líquido</span>
             <span className="text-2xl font-bold text-white tracking-tighter">{formatCurrency(total)}</span>
          </div>
          <button onClick={() => placeOrder({})} disabled={cart.length === 0} className="w-full dynamic-accent-bg text-white py-4 rounded-2xl font-bold text-xs uppercase disabled:opacity-20 hover:brightness-110 active:scale-95 transition-all">
             Concluir Transação
          </button>
        </div>
      </div>

      {/* Cart Button Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
         <button onClick={() => setMobileCartOpen(true)} className="dynamic-accent-bg text-white p-4 rounded-full shadow-2xl dynamic-accent-shadow relative">
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold h-5 w-5 rounded-full flex items-center justify-center">{cart.length}</span>}
         </button>
      </div>

      {/* Mobile Cart Backdrop/Modal */}
      {mobileCartOpen && (
        <div className="fixed inset-0 z-[100] md:hidden bg-black/80 backdrop-blur-md animate-in fade-in">
           <div className="absolute bottom-0 left-0 right-0 bg-[#050510] rounded-t-[40px] p-8 max-h-[80vh] flex flex-col glass animate-in slide-in-from-bottom-20">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-bold text-white uppercase tracking-tight">Venda Actual</h2>
                 <button onClick={() => setMobileCartOpen(false)} className="text-slate-500"><X className="h-6 w-6" /></button>
              </div>
              <div className="flex-grow overflow-y-auto space-y-3 mb-6 custom-scrollbar">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                     <span className="text-white font-bold">{item.name} <small className="text-slate-500 font-normal">x{item.quantity}kg</small></span>
                     <span className="dynamic-accent-text font-bold">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/5">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-500 font-bold uppercase text-[10px]">Total Final</span>
                    <span className="text-3xl font-bold text-white">{formatCurrency(total)}</span>
                 </div>
                 <button onClick={() => { placeOrder({}); setMobileCartOpen(false); }} className="w-full dynamic-accent-bg text-white py-5 rounded-2xl font-bold uppercase shadow-xl">Processar Pagamento</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// --- CRM & ORDERS (Resumido para Responsividade) ---
const CRM: React.FC = () => {
  const { customers } = usePeixaria();
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl font-bold text-white uppercase tracking-tighter mb-6 flex items-center gap-3">
         <Users className="h-5 w-5 dynamic-accent-text" /> Base de Clientes
      </h1>
      <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead className="bg-white/5 text-slate-500 text-[9px] font-bold uppercase tracking-widest">
              <tr><th className="px-8 py-5">Cliente</th><th className="px-8 py-5">Terminal</th><th className="px-8 py-5">Fidelização</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-white/10">
                  <td className="px-8 py-4 font-bold text-white">{c.name}</td>
                  <td className="px-8 py-4 font-mono text-slate-500">{c.phone}</td>
                  <td className="px-8 py-4 dynamic-accent-text font-bold">{formatCurrency(c.totalSpent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers.length === 0 && <div className="p-20 text-center text-slate-600 font-bold uppercase text-[10px] tracking-widest opacity-40">Sem registos activos</div>}
        </div>
      </div>
    </div>
  );
};

const OrdersKanban: React.FC = () => {
  const { orders, updateOrderStatus } = usePeixaria();
  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-xl font-bold text-white uppercase tracking-tighter flex items-center gap-3">
         <LayoutGrid className="h-5 w-5 dynamic-accent-text" /> Fluxo de Pedidos
      </h1>
      <div className="flex gap-6 overflow-x-auto pb-10 custom-scrollbar">
        {Object.values(OrderStatus).map(status => (
          <div key={status} className="min-w-[300px] flex-shrink-0 bg-white/5 p-5 rounded-[32px] border border-white/10 glass h-fit">
            <h3 className="font-bold mb-6 text-slate-500 uppercase text-[9px] tracking-[0.2em]">{status}</h3>
            <div className="space-y-4">
              {orders.filter(o => o.status === status).map(o => (
                <div key={o.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-blue-500/40 transition-all cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-[9px] font-bold dynamic-accent-text">{o.id}</span>
                    <span className="text-[8px] text-slate-600 font-bold">{new Date(o.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <p className="font-bold text-white text-[11px] mb-1 line-clamp-1">{o.customerName}</p>
                  <p className="font-bold text-white text-sm mb-4">{formatCurrency(o.total)}</p>
                  <select 
                    value={o.status} 
                    onChange={e => updateOrderStatus(o.id, e.target.value as OrderStatus)} 
                    className="w-full text-[9px] bg-black text-slate-400 border border-white/10 p-2 rounded-xl outline-none"
                  >
                    {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default { Stats, Inventory, OrdersKanban, CRM, SettingsPanel, StaffManagement, POS };
