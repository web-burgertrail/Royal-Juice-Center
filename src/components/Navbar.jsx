import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useStoreTimer } from '../hooks/useStoreTimer';

const NAV_TABS = [
  { path: '/', label: 'Home', emoji: '🏠' },
  { path: '/menu', label: 'Menu', emoji: '🍹' },
  { path: '/gallery', label: 'Gallery', emoji: '📸' },
  { path: '/about', label: 'About', emoji: 'ℹ️' },
  { path: '/contact', label: 'Contact', emoji: '📍' },
];

function StoreTimerBar() {
  const { isOpen, formatted } = useStoreTimer();
  return (
    <div className={`w-full py-1.5 px-4 text-center flex items-center justify-center gap-2 ${
      isOpen ? 'bg-green-900/60 border-b border-green-600/30' : 'bg-dark-800/80 border-b border-amber-primary/15'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-amber-primary/70'}`}/>
      <span className={`text-xs font-body ${isOpen ? 'text-green-300' : 'text-cream/50'}`}>
        {isOpen
          ? <>🌿 We're Open! <strong className="text-white font-heading">Closes in</strong>{' '}<span className="text-green-400 font-heading font-bold tracking-widest">{formatted}</span></>
          : <>🌙 We're closed right now.{' '}<span className="text-amber-primary font-heading font-semibold">Opens in <span className="tracking-widest">{formatted}</span></span></>
        }
      </span>
    </div>
  );
}

// Royal Crown Logo SVG
function CrownLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="url(#crownGrad)" stroke="#f4a017" strokeWidth="1.5"/>
      <text x="24" y="22" textAnchor="middle" fontSize="10" fill="#0f1f0f" fontFamily="serif" fontWeight="bold">Royal</text>
      <text x="24" y="32" textAnchor="middle" fontSize="7" fill="#0f1f0f" fontFamily="serif">JUICE</text>
      <defs>
        <linearGradient id="crownGrad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#f7b84b"/>
          <stop offset="100%" stopColor="#f4a017"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const { count, openCart } = useCart();
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-dark-900/97 backdrop-blur-xl">
      <StoreTimerBar />

      {/* Logo row */}
      <div className="flex items-center justify-between px-3 sm:px-5 lg:px-10 py-2 border-b border-cream/5">
        <Link to="/" onClick={handleHomeClick} className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
            <CrownLogo size={36} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-logo text-amber-primary" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.2rem)' }}>
              Royal Juice
            </span>
            <span className="text-cream/40 text-[9px] font-body tracking-widest uppercase">Center & Snacks</span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a href="https://wa.me/919281410305" target="_blank" rel="noopener noreferrer" title="WhatsApp"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0"
            style={{ background: '#25D366' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>

          <button onClick={openCart} aria-label="Cart"
            className="relative flex items-center gap-1 glass px-2.5 py-1.5 rounded-full hover:border-amber-primary/40 transition-all group">
            <span className="text-sm">🛒</span>
            <span className="text-cream/60 text-xs font-body hidden sm:block group-hover:text-white transition-colors">Cart</span>
            {count > 0 && (
              <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-dark-900"
                style={{ background: '#f4a017' }}>
                {count}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="bg-dark-800/50 border-b border-cream/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center overflow-x-auto scrollbar-hide px-2 py-2 gap-1">
            {NAV_TABS.map(({ path, label, emoji }) => {
              const active = location.pathname === path;
              return (
                <Link key={path} to={path} onClick={path === '/' ? handleHomeClick : undefined}
                  className="flex-shrink-0 relative" style={{ textDecoration: 'none' }}>
                  <motion.div
                    animate={{
                      y: active ? -2 : 0,
                      backgroundColor: active ? '#f4a017' : 'transparent',
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 350 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: active ? '5px' : '0px',
                      padding: active ? '6px 13px' : '6px 11px',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      boxShadow: active ? '0 4px 12px rgba(244,160,23,0.45)' : 'none',
                    }}>
                    <motion.span animate={{ scale: active ? 1.1 : 1 }} transition={{ type: 'spring', damping: 20 }}
                      style={{ display: 'flex', alignItems: 'center', fontSize: '15px' }}>
                      {emoji}
                    </motion.span>
                    <motion.span
                      animate={{ width: active ? 'auto' : 0, opacity: active ? 1 : 0 }}
                      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                      style={{
                        overflow: 'hidden', whiteSpace: 'nowrap',
                        color: '#0f1f0f', fontSize: '11px',
                        fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                        letterSpacing: '0.05em', textTransform: 'uppercase',
                      }}>
                      {label}
                    </motion.span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
