import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  CreditCard, 
  Check, 
  Download, 
  Zap, 
  Sparkles, 
  Shield, 
} from 'lucide-react';

const Billing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // --- Structured empty states so UI never breaks before fetch ---
  const [plans, setPlans] = useState([]);
  const [account, setAccount] = useState({ creditsUsed: 0, creditsTotal: 10000, renewalDateStr: '', SubscriptionPlan: { name: '', price: '' } });
  const [payment, setPayment] = useState({ cardType: '', last4: '', expiry: '', cardholderName: '', billingEmail: '', vatNumber: '' });
  const [invoices, setInvoices] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/billing');
        if (!res.ok) throw new Error('Failed to fetch billing data');
        const data = await res.json();
        setPlans(data.plans || []);
        if (data.account) setAccount(data.account);
        if (data.payment) setPayment(data.payment);
        setInvoices(data.invoices || []);
      } catch (err) {
        console.error('Billing fetch error:', err);
      }
    };
    fetchBillingData();
  }, []);

  const handleUpdateBilling = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('http://localhost:5000/api/billing/payment-method', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardholderName: payment.cardholderName,
          billingEmail: payment.billingEmail,
          vatNumber: payment.vatNumber
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setPayment(updated);
      }
    } catch (err) {
      console.error('Update billing error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Dynamic optimization tip based on backend credit usage
  const usagePercent = account.creditsTotal > 0 ? Math.round((account.creditsUsed / account.creditsTotal) * 100) : 0;
  const optimizationTip = usagePercent >= 80
    ? `You're utilizing ${usagePercent}% of your ${account.SubscriptionPlan?.name || 'current'} Plan credits. Switching to Enterprise could save up to 15% on overage costs next month.`
    : `You're currently at ${usagePercent}% of your credit limit. Your ${account.SubscriptionPlan?.name || 'current'} Plan is well within its usage bounds.`;

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6 md:p-10 max-w-[1400px] mx-auto w-full">
          
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">Billing & Subscription</h1>
            <p className="text-slate-500 text-sm font-bold opacity-75">Manage your workspace plan, payment methods, and invoice history.</p>
          </div>

          <div className="space-y-10">
            
            {/* Top Section: Active Plan & Optimization Tip */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8">
              
              {/* Active Plan Card */}
              <section className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm relative group h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-4 inline-block shadow-lg shadow-blue-100">Current Plan</span>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tighter">{account.SubscriptionPlan?.name || '—'} Plan</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-slate-800 tracking-tighter">
                      {account.SubscriptionPlan?.price || '—'}<span className="text-sm text-slate-400 font-bold tracking-normal">/mo</span>
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      Renews on {account.renewalDateStr || '...'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-12">
                  {(account.SubscriptionPlan?.features || []).map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-slate-50">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Credits Used</p>
                    <p className="text-[11px] font-black text-slate-800">
                      {account.creditsUsed?.toLocaleString()} / {account.creditsTotal?.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-50">
                    <div 
                      className="h-full bg-blue-600 rounded-full shadow-sm transition-all duration-1000" 
                      style={{ width: `${usagePercent}%` }}
                    ></div>
                  </div>
                </div>
              </section>

              {/* Optimization Tip Card (Purple) — dynamically generated from backend */}
              <section className="bg-[#8b5cf6] rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-xl shadow-purple-100 flex flex-col justify-between h-full">
                <div>
                   <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                        <Sparkles size={24} className="text-white" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-80">AI Intelligence</p>
                   </div>
                   <h3 className="text-xl font-black mb-4">Optimization Tip</h3>
                   <p className="text-sm font-bold text-purple-50 leading-relaxed mb-10">
                     {optimizationTip}
                   </p>
                </div>
                
                <button className="w-full py-4 bg-white text-[#8b5cf6] rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-purple-50 transition-all shadow-lg active:scale-95">
                  View Projections
                </button>
                
                <div className="absolute top-[-10%] right-[-10%] opacity-10 rotate-12 transition-transform duration-700 pointer-events-none scale-150">
                   <Zap size={200} />
                </div>
              </section>
            </div>

            {/* Available Plans Section */}
            <section>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Available Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <div key={plan.id} className={`bg-white rounded-[2.5rem] p-10 flex flex-col items-start h-full relative ${plan.accent ? `border ${plan.accent}` : 'border border-slate-50 shadow-sm'}`}>
                    {plan.isActive && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                        Current Plan
                      </span>
                    )}
                    <h3 className="text-xl font-black text-slate-800 mb-1">{plan.name}</h3>
                    <p className="text-xs font-bold text-slate-400 mb-8">{plan.desc}</p>
                    
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-4xl font-black text-slate-800">{plan.price}</span>
                      <span className="text-sm font-bold text-slate-400">/mo</span>
                    </div>

                    <div className="space-y-4 mb-12 flex-1">
                       {(plan.features || []).map((f, j) => (
                         <div key={j} className="flex items-center gap-3">
                           <Check size={14} className="text-blue-600 shrink-0" />
                           <span className="text-[12px] font-bold text-slate-600">{f}</span>
                         </div>
                       ))}
                    </div>

                    <button className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-lg ${plan.color} ${plan.isActive ? 'opacity-80 cursor-default' : 'hover:scale-[1.02]'}`}>
                      {plan.btnText}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Section: Payment Methods & Billing History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12">
              
              {/* Payment Methods Card */}
              <section className="bg-white rounded-[2.8rem] p-12 border border-slate-50 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-[22px] font-black text-slate-800 tracking-tight mb-10">Payment Methods</h2>
                  
                  {/* Card Display */}
                  <div className="p-8 rounded-[1.8rem] bg-white border border-slate-100 flex items-center justify-between mb-12 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]">
                     <div className="flex items-center gap-6">
                       <div className="w-16 h-12 bg-[#F1F5F9] rounded-xl flex items-center justify-center border border-slate-100 text-slate-700">
                          <CreditCard size={26} strokeWidth={2.5} />
                       </div>
                       <div>
                         <p className="text-[16px] font-black text-slate-800">
                           {payment.cardType} ending in {payment.last4 || '****'}
                         </p>
                         <p className="text-[12px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                           Expires {payment.expiry || '--/--'}
                         </p>
                       </div>
                     </div>
                     <button className="text-[13px] font-black text-[#2563EB] hover:text-blue-700 transition-colors mr-2">Edit</button>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Cardholder Name</label>
                      <input 
                        type="text" 
                        value={payment.cardholderName || ''} 
                        onChange={e => setPayment(p => ({ ...p, cardholderName: e.target.value }))}
                        className="w-full px-7 py-5 bg-[#F1F5F9]/50 border border-transparent rounded-[1.4rem] text-[15px] font-black text-slate-800 focus:bg-white focus:border-slate-200 focus:ring-8 focus:ring-blue-50/50 transition-all outline-none" 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Billing Email</label>
                        <input 
                          type="email" 
                          value={payment.billingEmail || ''} 
                          onChange={e => setPayment(p => ({ ...p, billingEmail: e.target.value }))}
                          className="w-full px-7 py-5 bg-[#F1F5F9]/50 border border-transparent rounded-[1.4rem] text-[15px] font-black text-slate-800 focus:bg-white focus:border-slate-200 focus:ring-8 focus:ring-blue-50/50 transition-all outline-none" 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">VAT Number</label>
                        <input 
                          type="text" 
                          value={payment.vatNumber || ''} 
                          onChange={e => setPayment(p => ({ ...p, vatNumber: e.target.value }))}
                          placeholder="Optional" 
                          className="w-full px-7 py-5 bg-[#F1F5F9]/50 border border-transparent rounded-[1.4rem] text-[15px] font-black text-slate-800 focus:bg-white focus:border-slate-200 focus:ring-8 focus:ring-blue-50/50 transition-all outline-none" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-12">
                  <button 
                    onClick={handleUpdateBilling}
                    disabled={isSaving}
                    className="w-full py-5 bg-[#EEF2FF] text-[#2563EB] rounded-[1.4rem] font-black text-[15px] hover:bg-[#E0E7FF] transition-all active:scale-95 shadow-sm disabled:opacity-60"
                  >
                    {isSaving ? 'Saving...' : 'Update Billing Info'}
                  </button>
                </div>
              </section>

              {/* Billing History Card */}
              <section className="bg-white rounded-[2.8rem] p-12 border border-slate-50 shadow-sm overflow-hidden flex flex-col h-full">
                <div className="flex justify-between items-center mb-12">
                   <h2 className="text-[22px] font-black text-slate-800 tracking-tight">Billing History</h2>
                   <button className="flex items-center gap-2 text-[12px] font-black text-[#2563EB] hover:text-blue-700 transition-all">
                      <Download size={14} strokeWidth={3} />
                     Export All
                   </button>
                </div>

                <div className="overflow-x-auto flex-1">
                   <div className="min-w-[500px]">
                      {/* Table Header */}
                      <div className="grid grid-cols-[1.5fr_1.2fr_1.2fr_40px] gap-6 bg-[#F8FAFC] py-5 px-10 rounded-2xl mb-2">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Invoice</p>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Amount</p>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-right"></p>
                      </div>

                      <div className="space-y-0">
                        {invoices.length === 0 ? (
                          <div className="py-12 text-center">
                            <p className="text-[12px] font-black text-slate-300 uppercase tracking-widest">No invoices found</p>
                          </div>
                        ) : (
                          invoices.map((inv) => (
                            <div key={inv.id} className="grid grid-cols-[1.5fr_1.2fr_1.2fr_40px] gap-6 py-7 px-10 hover:bg-slate-50/50 transition-all cursor-default items-center border-b border-slate-50 last:border-0 group">
                               <span className="text-[16px] font-black text-slate-800 tracking-tighter group-hover:text-[#2563EB] transition-colors">{inv.invoiceIdStr}</span>
                               <span className="text-[14px] font-bold text-slate-400 tracking-tight">{inv.dateStr}</span>
                               <span className="text-[16px] font-black text-slate-800 tracking-tighter">{inv.amountStr}</span>
                               <div className="flex justify-end order-last">
                                 <button className="text-blue-500 hover:scale-125 transition-transform">
                                   <Download size={20} strokeWidth={2.5} />
                                 </button>
                               </div>
                            </div>
                          ))
                        )}
                      </div>
                   </div>
                </div>

                <div className="pt-12 text-center pb-2 mt-auto">
                   <button className="text-[13px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-800 transition-colors border-b-2 border-transparent hover:border-slate-800 leading-none pb-1">View All History</button>
                </div>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Billing;
