
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Minus, 
  ShoppingCart, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  X,
  ArrowRight,
  ChevronRight,
  Fish,
  ShoppingBag,
  History,
  Phone,
  MessageCircle
} from 'lucide-react';
import { usePeixaria } from '../PeixariaContext';
import { formatCurrency, DELIVERY_SLOTS } from '../constants';
import { FishCategory, PaymentMethod } from '../types';

const Catalog: React.FC = () => {
  const { products, addToCart, settings } = usePeixaria();
  const [filter, setFilter] = useState<FishCategory | 'All'>('All');
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  if (!settings.isOpen) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center p-12 bg-white/5 rounded-[40px] border border-white/10 glass animate-in zoom-in-95">
        <Clock className="h-10 w-10 dynamic-accent-text mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white tracking-tighter mb-4">FECHADO AGORA</h2>
        <p className="text-slate-500 text-sm mb-8">Abrimos novamente às {settings.openingTime}.</p>
        <div className="flex items-center justify-center gap-4">
           <a href={`https://wa.me/${settings.whatsapp}`} className="flex items-center gap-2 p-3 px-5 rounded-2xl bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-widest">
              <MessageCircle className="h-4 w-4" /> WhatsApp
           </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-700">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase mb-2">
           Peixe <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Fresco</span> no Lubango
        </h1>
        <p className="text-slate-500 text-xs md:text-sm font-medium max-w-lg mx-auto uppercase tracking-widest opacity-80">Do mar para a sua mesa, com qualidade Khrismir.</p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-10 md:mb-16">
        {['All', ...Object.values(FishCategory)].map((cat) => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat as any)} 
            className={`px-5 py-2.5 rounded-full font-bold text-[9px] uppercase tracking-[0.2em] transition-all border ${
              filter === cat 
                ? 'dynamic-accent-bg border-transparent text-white dynamic-accent-shadow' 
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'
            }`}
          >
            {cat === 'All' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {filtered.map(product => (
          <div key={product.id} className="group bg-white/5 rounded-[32px] overflow-hidden border border-white/10 glass hover:translate-y-[-8px] transition-all duration-500">
            <div className="h-40 md:h-52 relative overflow-hidden">
              <img src={product.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 left-4">
                 <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-[8px] font-bold text-white uppercase tracking-widest border border-white/10">{product.category}</span>
              </div>
            </div>
            <div className="p-5 md:p-6 flex flex-col h-full">
              <h3 className="text-base md:text-lg font-bold text-white tracking-tight mb-4 uppercase line-clamp-1">{product.name}</h3>
              <div className="space-y-2 mt-auto">
                <button 
                  onClick={() => addToCart({ productId: product.id, name: product.name, quantity: 1, unit: 'kg', price: product.pricePerKg })} 
                  className="w-full bg-white/5 hover:bg-white/10 text-slate-300 py-3 rounded-2xl transition text-[9px] font-bold border border-white/5 uppercase"
                >
                  KG - {formatCurrency(product.pricePerKg)}
                </button>
                <button 
                  onClick={() => addToCart({ productId: product.id, name: product.name, quantity: 1, unit: 'box', price: product.pricePerBox })} 
                  className="w-full dynamic-accent-bg text-white py-3 rounded-2xl transition text-[9px] font-bold shadow-lg uppercase active:scale-95"
                >
                  CAIXA - {formatCurrency(product.pricePerBox)}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
           <div className="col-span-full py-20 text-center opacity-40">
              <ShoppingBag className="h-10 w-10 mx-auto mb-4" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Sem produtos disponíveis nesta categoria</p>
           </div>
        )}
      </div>
    </div>
  );
};

const Checkout: React.FC = () => {
  const { cart, removeFromCart, placeOrder, settings, currentCustomer } = usePeixaria();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: currentCustomer?.name || '', 
    address: '', 
    landmark: '', 
    phone: currentCustomer?.phone || '', 
    slot: DELIVERY_SLOTS[0], 
    payment: PaymentMethod.MULTICAIXA_EXPRESS, 
    type: 'delivery'
  });

  const total = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const deliveryFee = formData.type === 'delivery' ? settings.baseDeliveryFee : 0;
  const finalAmount = total + deliveryFee;

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="max-w-md mx-auto mt-24 text-center py-16 bg-white/5 rounded-[40px] glass">
        <ShoppingBag className="h-12 w-12 text-slate-700 mx-auto mb-6 opacity-40" />
        <h2 className="text-xl font-bold text-white mb-4 uppercase">Cesto Vazio</h2>
        <Link to="/" className="dynamic-accent-text font-bold text-[10px] uppercase tracking-[0.3em] hover:brightness-125">Ver Catálogo</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto mt-24 text-center p-10 md:p-14 bg-white/5 rounded-[50px] border border-white/10 glass shadow-2xl animate-in zoom-in-95">
        <div className="h-20 w-20 dynamic-accent-soft-bg dynamic-accent-text rounded-full flex items-center justify-center mx-auto mb-10">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">Sucesso!</h2>
        <p className="text-slate-500 text-sm mb-12 uppercase tracking-widest">Seu pedido foi processado e já estamos preparando sua carga fresca.</p>
        <Link to="/profile" className="inline-block dynamic-accent-bg text-white px-12 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl active:scale-95">Rastrear Pedido</Link>
      </div>
    );
  }

  const inputClass = "w-full p-4 bg-white/5 border border-white/10 text-white rounded-2xl outline-none focus:ring-1 dynamic-accent-ring text-sm font-bold placeholder:text-slate-700";
  const labelClass = "text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-2";

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-4 mb-4">
             <div className={`h-1 w-12 rounded-full ${step >= 1 ? 'dynamic-accent-bg' : 'bg-white/10'}`} />
             <div className={`h-1 w-12 rounded-full ${step >= 2 ? 'dynamic-accent-bg' : 'bg-white/10'}`} />
             <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-auto">Etapa {step} de 2</div>
          </div>

          {step === 1 ? (
            <div className="bg-white/5 p-8 rounded-[40px] glass shadow-xl">
              <h2 className="text-xl font-bold text-white mb-10 tracking-tight flex items-center gap-4 uppercase">
                 <ShoppingCart className="h-6 w-6 dynamic-accent-text" /> Resumo do Cesto
              </h2>
              <div className="space-y-6">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5 group">
                    <div className="flex-grow">
                      <span className="text-white font-bold block text-base">{item.name}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.quantity} {item.unit} x {formatCurrency(item.price)}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-bold text-white text-lg">{formatCurrency(item.price * item.quantity)}</span>
                      <button onClick={() => removeFromCart(item.productId, item.unit)} className="text-red-500/30 hover:text-red-500 transition-colors p-2"><X className="h-5 w-5"/></button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full mt-12 dynamic-accent-bg text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:brightness-110 transition shadow-2xl flex items-center justify-center gap-4">
                Seguir para Logística <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="bg-white/5 p-8 rounded-[40px] glass shadow-xl space-y-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-4 uppercase">
                 <MapPin className="h-6 w-6 dynamic-accent-text" /> Dados de Entrega
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Nome Completo</label><input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClass} placeholder="Quem recebe?" /></div>
                <div><label className={labelClass}>Terminal Móvel</label><input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className={inputClass} placeholder="9xx xxx xxx" /></div>
              </div>
              <div><label className={labelClass}>Morada Lubango</label><input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className={inputClass} placeholder="Bairro, Rua, Casa..." /></div>
              
              <div className="pt-8 flex flex-col md:flex-row gap-6">
                <button onClick={() => setStep(1)} className="order-2 md:order-1 px-8 py-5 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition">Voltar</button>
                <button onClick={() => { placeOrder({ customerName: formData.name, deliveryAddress: formData.address }); setStep(3); }} className="order-1 md:order-2 flex-grow dynamic-accent-bg text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl active:scale-95">
                   Confirmar {formatCurrency(finalAmount)}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
           <div className="bg-[#0a0a1a] border border-white/10 p-10 rounded-[40px] glass shadow-2xl sticky top-24">
              <h3 className="font-bold text-slate-500 uppercase tracking-[0.3em] text-[10px] mb-8 border-b border-white/5 pb-4">Checkout Total</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center"><span className="text-slate-400 font-bold uppercase text-[11px]">Subtotal Carga</span><span className="text-white font-bold">{formatCurrency(total)}</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-400 font-bold uppercase text-[11px]">Logística (Taxa)</span><span className="text-white font-bold">{formatCurrency(deliveryFee)}</span></div>
                <div className="pt-8 border-t border-white/5 flex justify-between items-end">
                   <div className="flex flex-col">
                      <span className="dynamic-accent-text font-bold uppercase text-[10px] tracking-widest">Total a Pagar</span>
                      <span className="text-slate-600 text-[9px] font-bold uppercase mt-1">IVA Incluído ({settings.ivaRate}%)</span>
                   </div>
                   <span className="text-4xl font-bold text-white tracking-tighter">{formatCurrency(finalAmount)}</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const { orders } = usePeixaria();
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in duration-700">
      <div className="mb-12 flex justify-between items-end">
         <div>
            <h1 className="text-4xl font-bold text-white tracking-tighter uppercase mb-2">Seus Pedidos</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Controle suas encomendas frescas</p>
         </div>
      </div>
      
      <div className="space-y-6">
        {orders.map(o => (
          <div key={o.id} className="bg-white/5 p-8 rounded-[40px] border border-white/10 glass flex flex-col md:flex-row justify-between items-center group hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-6">
               <div className="bg-white/5 p-4 rounded-2xl border border-white/5 dynamic-accent-text">
                  <Fish className="h-6 w-6" />
               </div>
               <div>
                  <p className="font-bold text-white text-xl tracking-tight mb-1">{o.id}</p>
                  <p className="text-[10px] font-bold dynamic-accent-text uppercase tracking-widest flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full dynamic-accent-bg shadow-[0_0_8px_var(--accent-color)]" /> {o.status}
                  </p>
               </div>
            </div>
            <div className="mt-8 md:mt-0 text-center md:text-right">
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Montante Pago</p>
               <p className="font-bold text-white text-3xl tracking-tighter">{formatCurrency(o.total)}</p>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
           <div className="text-center py-24 bg-white/5 rounded-[40px] glass opacity-30">
              <History className="h-14 w-14 mx-auto mb-6" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Histórico de Pedidos Vazio</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default { Catalog, Checkout, Profile };
