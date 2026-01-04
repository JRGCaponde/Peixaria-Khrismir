
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Fish, 
  Menu, 
  ShoppingCart, 
  Briefcase, 
  LogOut, 
  LayoutDashboard,
  Package,
  Users,
  Settings,
  Calculator,
  User as UserIcon,
  ShoppingBag,
  Bell,
  ChevronRight,
  X
} from 'lucide-react';
import { PeixariaProvider, usePeixaria } from './PeixariaContext';
import CustomerPortal from './components/CustomerPortal';
import AdminDashboard from './components/AdminDashboard';

const LoginPage: React.FC = () => {
  const { loginAdmin, loginStaff, loginCustomer, isAdminAuthenticated, currentStaff, currentCustomer, addCustomer, settings } = usePeixaria();
  const [tab, setTab] = useState<'admin' | 'staff' | 'customer'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regData, setRegData] = useState({ name: '', email: '', phone: '', password: '' });

  if (isAdminAuthenticated) return <Navigate to="/admin" />;
  if (currentStaff) return <Navigate to="/admin/pos" />;
  if (currentCustomer) return <Navigate to="/" />;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    if (tab === 'admin') success = loginAdmin(email, password);
    else if (tab === 'staff') success = loginStaff(email, password);
    else success = loginCustomer(email, password);

    if (!success) setError('Credenciais inválidas.');
    else setError('');
  };

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[50px] shadow-2xl w-full max-w-md border border-white/10 glass animate-in fade-in zoom-in-95">
        <div className="text-center mb-10">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} className="h-16 w-16 mx-auto mb-6 object-contain" alt="Logo" />
          ) : (
            <Fish className="h-12 w-12 dynamic-accent-text mx-auto mb-6" />
          )}
          <h1 className="text-3xl font-bold text-white tracking-tighter uppercase">{settings.name}</h1>
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.3em] mt-2">Sua Peixaria Premium</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/5 glass">
          {['customer', 'staff', 'admin'].map((t) => (
            <button key={t} onClick={() => { setTab(t as any); setError(''); }} className={`flex-1 py-3 rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest ${tab === t ? 'dynamic-accent-bg text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
              {t === 'customer' ? 'Comprar' : t === 'staff' ? 'Staff' : 'Gestor'}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4.5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none text-sm font-bold dynamic-accent-ring focus:ring-1" placeholder="E-mail de acesso" />
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4.5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none text-sm font-bold dynamic-accent-ring focus:ring-1" placeholder="Senha" />
          {error && <p className="text-red-400 text-[10px] text-center font-bold uppercase tracking-widest">{error}</p>}
          <button className="w-full dynamic-accent-bg text-white py-5 rounded-2xl font-bold uppercase text-xs shadow-xl active:scale-95 transition-all mt-4">Sincronizar Acesso</button>
          {tab === 'customer' && <button type="button" onClick={() => setShowRegisterModal(true)} className="w-full text-blue-400 text-[10px] font-bold uppercase tracking-widest mt-2 hover:brightness-125 transition">Criar Conta Nova</button>}
        </form>
      </div>

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-[#0a0a1a] border border-white/10 rounded-[50px] w-full max-w-md p-10 glass animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-tighter">Novo Cliente</h2>
            <form onSubmit={e => { e.preventDefault(); addCustomer({ id: `CST-${Date.now()}`, ...regData, totalSpent: 0, joinDate: new Date().toISOString() }); setShowRegisterModal(false); }} className="space-y-4">
              <input required placeholder="Nome Completo" value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} className="w-full p-4.5 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none dynamic-accent-ring focus:ring-1" />
              <input required placeholder="Terminal WhatsApp" value={regData.phone} onChange={e => setRegData({...regData, phone: e.target.value})} className="w-full p-4.5 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none dynamic-accent-ring focus:ring-1" />
              <input required placeholder="E-mail" value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} className="w-full p-4.5 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none dynamic-accent-ring focus:ring-1" />
              <input required placeholder="Senha" type="password" value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} className="w-full p-4.5 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none dynamic-accent-ring focus:ring-1" />
              <button className="w-full dynamic-accent-bg text-white py-5 rounded-2xl font-bold uppercase text-xs mt-6 shadow-xl">Confirmar Cadastro</button>
              <button type="button" onClick={() => setShowRegisterModal(false)} className="w-full text-slate-500 text-[10px] uppercase font-bold mt-4">Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { cart, isAdminAuthenticated, currentStaff, currentCustomer, logout, settings } = usePeixaria();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-[#050510] text-slate-300">
      {/* Top Navbar Desktop */}
      <nav className="border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl sticky top-0 z-50 h-16 flex items-center glass">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 dynamic-accent-soft-bg rounded-xl group-hover:rotate-12 transition-transform">
               {settings.logoUrl ? (
                 <img src={settings.logoUrl} className="h-6 w-6 object-contain" alt="Logo" />
               ) : (
                 <Fish className="h-5 w-5 dynamic-accent-text" />
               )}
            </div>
            <span className="text-lg font-bold text-white uppercase tracking-tighter">{settings.name}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {!isAdminPath ? (
              <>
                <Link to="/" className={`text-[10px] font-bold uppercase tracking-widest hover:dynamic-accent-text transition-colors ${location.pathname === '/' ? 'dynamic-accent-text' : 'text-slate-400'}`}>Mercado</Link>
                <Link to="/profile" className={`text-[10px] font-bold uppercase tracking-widest hover:dynamic-accent-text transition-colors ${location.pathname === '/profile' ? 'dynamic-accent-text' : 'text-slate-400'}`}>Meus Pedidos</Link>
                <Link to="/checkout" className="relative p-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors glass">
                  <ShoppingBag className="h-5 w-5 dynamic-accent-text" />
                  {cart.length > 0 && <span className="absolute -top-1 -right-1 dynamic-accent-bg text-white text-[9px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-lg">{cart.length}</span>}
                </Link>
                {currentCustomer ? (
                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{currentCustomer.name.split(' ')[0]}</span>
                      <button onClick={logout} className="p-2 text-slate-500 hover:text-red-400 transition-colors"><LogOut className="h-5 w-5"/></button>
                   </div>
                ) : (
                   <Link to="/login" className="text-[10px] font-bold dynamic-accent-text border-2 dynamic-accent-border px-5 py-2 rounded-xl uppercase tracking-widest hover:dynamic-accent-bg hover:text-white transition-all">Entrar</Link>
                )}
              </>
            ) : (
              <>
                <Link to="/admin" className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest">Painel</Link>
                <Link to="/admin/pos" className="text-[10px] font-bold dynamic-accent-text uppercase tracking-widest font-black">POS Venda</Link>
                <Link to="/admin/inventory" className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest">Estoque</Link>
                <Link to="/admin/settings" className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest">Configs</Link>
                <button onClick={logout} className="p-2 text-slate-500 hover:text-red-400 transition-colors"><LogOut className="h-5 w-5"/></button>
              </>
            )}
          </div>
          
          {/* Mobile Cart Link Only */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/checkout" className="relative p-2">
                <ShoppingBag className="h-6 w-6 dynamic-accent-text" />
                {cart.length > 0 && <span className="absolute -top-1 -right-1 dynamic-accent-bg text-white text-[9px] font-bold h-5 w-5 rounded-full flex items-center justify-center">{cart.length}</span>}
             </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow pb-24 md:pb-0">{children}</main>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#0a0a1a]/90 backdrop-blur-2xl border border-white/10 h-16 rounded-[28px] z-50 flex items-center justify-around px-4 glass shadow-2xl">
         {!isAdminPath ? (
           <>
             <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'dynamic-accent-text' : 'text-slate-500'}`}>
                <Fish className="h-5 w-5" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Loja</span>
             </Link>
             <Link to="/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'dynamic-accent-text' : 'text-slate-500'}`}>
                <Package className="h-5 w-5" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Pedidos</span>
             </Link>
             <Link to="/login" className="flex flex-col items-center gap-1 text-slate-500">
                <UserIcon className="h-5 w-5" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Conta</span>
             </Link>
           </>
         ) : (
           <>
             <Link to="/admin" className={`flex flex-col items-center gap-1 ${location.pathname === '/admin' ? 'dynamic-accent-text' : 'text-slate-500'}`}>
                <LayoutDashboard className="h-5 w-5" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Home</span>
             </Link>
             <Link to="/admin/pos" className={`flex flex-col items-center gap-1 ${location.pathname === '/admin/pos' ? 'dynamic-accent-text' : 'text-slate-500'}`}>
                <Calculator className="h-5 w-5" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Caixa</span>
             </Link>
             <Link to="/admin/settings" className={`flex flex-col items-center gap-1 ${location.pathname === '/admin/settings' ? 'dynamic-accent-text' : 'text-slate-500'}`}>
                <Settings className="h-5 w-5" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Ajustes</span>
             </Link>
           </>
         )}
      </nav>

      <footer className="hidden md:block bg-[#020208] border-t border-white/5 py-10 text-center text-[9px] font-bold text-slate-700 tracking-[0.4em] uppercase">
        &copy; 2024 {settings.name} • Luanda & Lubango Premium Fish Systems
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PeixariaProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<CustomerPortal.Catalog />} />
            <Route path="/checkout" element={<CustomerPortal.Checkout />} />
            <Route path="/profile" element={<CustomerPortal.Profile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboard.Stats />} />
            <Route path="/admin/pos" element={<AdminDashboard.POS />} />
            <Route path="/admin/inventory" element={<AdminDashboard.Inventory />} />
            <Route path="/admin/crm" element={<AdminDashboard.CRM />} />
            <Route path="/admin/staff" element={<AdminDashboard.StaffManagement />} />
            <Route path="/admin/settings" element={<AdminDashboard.SettingsPanel />} />
            <Route path="/admin/orders" element={<AdminDashboard.OrdersKanban />} />
          </Routes>
        </Layout>
      </HashRouter>
    </PeixariaProvider>
  );
};

export default App;
