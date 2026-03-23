import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function CartDrawer() {
  const { isOpen, closeCart, items, total, updateQty, removeItem, clearCart } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"/>
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 flex flex-col"
            style={{ background: '#162416', borderLeft: '1px solid rgba(244,160,23,0.2)' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,245,230,0.07)' }}>
              <div>
                <h2 className="font-heading font-bold text-cream text-lg">Your Cart</h2>
                {items.length > 0 && <p className="text-cream/40 text-xs font-body">{items.length} item(s)</p>}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && !confirmClear && (
                  <button onClick={() => setConfirmClear(true)}
                    className="text-red-400/60 hover:text-red-400 text-xs font-heading transition-colors px-2 py-1 rounded-lg"
                    style={{ background: 'rgba(239,68,68,0.08)' }}>
                    Clear all
                  </button>
                )}
                {confirmClear && (
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => { clearCart(); setConfirmClear(false); }}
                      className="text-red-400 text-xs font-heading px-2 py-1 rounded-lg"
                      style={{ background: 'rgba(239,68,68,0.15)' }}>
                      Yes, clear
                    </button>
                    <button onClick={() => setConfirmClear(false)} className="text-cream/40 text-xs font-heading">Cancel</button>
                  </div>
                )}
                <button onClick={closeCart} className="w-8 h-8 rounded-full flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
                  style={{ background: 'rgba(255,245,230,0.07)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4">
                    <img src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=200&q=80" alt="" className="w-full h-full object-cover opacity-60"/>
                  </div>
                  <p className="font-heading font-bold text-cream mb-2">Your cart is empty</p>
                  <p className="text-cream/40 text-sm font-body mb-6">Add some fresh juices to get started!</p>
                  <Link to="/menu" onClick={closeCart}
                    className="text-dark-900 px-6 py-2.5 rounded-full font-heading font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg,#f7b84b,#f4a017)' }}>
                    Browse Menu
                  </Link>
                </div>
              ) : items.map(item => (
                <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="flex gap-3 p-3 rounded-xl" style={{ background: 'rgba(244,160,23,0.06)', border: '1px solid rgba(244,160,23,0.12)' }}>
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#1e3020' }}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none'; }}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-cream text-sm line-clamp-1">{item.name}</p>
                    <p className="font-body text-xs" style={{ color: '#f4a017' }}>Rs.{item.price} each</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs text-cream"
                          style={{ background: 'rgba(244,160,23,0.2)' }}>-</button>
                        <span className="text-cream font-bold text-sm w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs text-dark-900"
                          style={{ background: '#f4a017' }}>+</button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm" style={{ color: '#f4a017' }}>Rs.{item.price * item.quantity}</span>
                        <button onClick={() => removeItem(item.id)} className="text-cream/25 hover:text-red-400 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,245,230,0.07)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-bold text-cream">Total</span>
                  <span className="font-display text-2xl" style={{ color: '#f4a017' }}>Rs.{total}</span>
                </div>
                <a href={`https://wa.me/919281410305?text=${encodeURIComponent(`Hello Royal Juice Center!\n\nI would like to order:\n${items.map(i => `${i.name} x${i.quantity} = Rs.${i.price * i.quantity}`).join('\n')}\n\nTotal: Rs.${total}`)}`}
                  target="_blank" rel="noopener noreferrer" onClick={closeCart}
                  className="flex items-center justify-center gap-2 text-white w-full py-4 rounded-2xl font-heading font-bold text-base transition-all hover:scale-[1.02] glow-green"
                  style={{ background: '#25D366' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Order on WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
