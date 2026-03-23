import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';
import { useCart } from '../context/CartContext';

const CATEGORY_META = {
  fruitJuices:    { label: 'Fruit Juices',      icon: '🍊', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=60&q=60' },
  specialJuices:  { label: 'Special Juices',    icon: '✨', img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=60&q=60' },
  dryFruitJuices: { label: 'Dry Fruit',         icon: '🥜', img: 'https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=60&q=60' },
  vegetableJuices:{ label: 'Veg Juices',        icon: '🥦', img: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=60&q=60' },
  fruitSalads:    { label: 'Fruit Salads',       icon: '🥗', img: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=60&q=60' },
  milkShakes:     { label: 'Shakes',             icon: '🥛', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=60&q=60' },
  summerSpecials: { label: 'Summer',             icon: '☀️', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=60&q=60' },
  punchShots:     { label: 'Punch & Shots',      icon: '🥃', img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=60&q=60' },
  snacks:         { label: 'Snacks',             icon: '🍿', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=60&q=60' },
};

const BADGE_STYLES = {
  'Bestseller':   { bg:'rgba(245,158,11,0.2)',  color:'#f59e0b', border:'rgba(245,158,11,0.3)' },
  "Chef's Pick":  { bg:'rgba(168,85,247,0.2)',  color:'#a855f7', border:'rgba(168,85,247,0.3)' },
  'Popular':      { bg:'rgba(244,160,23,0.2)',  color:'#f4a017', border:'rgba(244,160,23,0.3)' },
  'Veg':          { bg:'rgba(34,197,94,0.2)',   color:'#22c55e', border:'rgba(34,197,94,0.3)' },
  'Seasonal':     { bg:'rgba(249,115,22,0.2)',  color:'#f97316', border:'rgba(249,115,22,0.3)' },
  'Premium':      { bg:'rgba(244,160,23,0.25)', color:'#f7b84b', border:'rgba(244,160,23,0.4)' },
  'Royal':        { bg:'rgba(244,160,23,0.2)',  color:'#f4a017', border:'rgba(244,160,23,0.3)' },
  'Royal Special':{ bg:'rgba(244,160,23,0.25)', color:'#f7b84b', border:'rgba(244,160,23,0.4)' },
  'Special':      { bg:'rgba(168,85,247,0.15)', color:'#c084fc', border:'rgba(168,85,247,0.25)' },
  'Must Try':     { bg:'rgba(239,68,68,0.15)',  color:'#f87171', border:'rgba(239,68,68,0.25)' },
  'Healthy':      { bg:'rgba(34,197,94,0.15)',  color:'#4ade80', border:'rgba(34,197,94,0.25)' },
  'Medicinal':    { bg:'rgba(34,197,94,0.15)',  color:'#4ade80', border:'rgba(34,197,94,0.25)' },
  'Summer Fav':   { bg:'rgba(249,115,22,0.15)', color:'#fb923c', border:'rgba(249,115,22,0.25)' },
  'Summer Special':{ bg:'rgba(249,115,22,0.15)',color:'#fb923c', border:'rgba(249,115,22,0.25)' },
  'Summer':       { bg:'rgba(249,115,22,0.15)', color:'#fb923c', border:'rgba(249,115,22,0.25)' },
  'Exotic':       { bg:'rgba(239,68,68,0.15)',  color:'#f87171', border:'rgba(239,68,68,0.25)' },
  'Fan Fav':      { bg:'rgba(236,72,153,0.15)', color:'#f472b6', border:'rgba(236,72,153,0.25)' },
  'Signature':    { bg:'rgba(244,160,23,0.2)',  color:'#f4a017', border:'rgba(244,160,23,0.35)' },
  'Family':       { bg:'rgba(59,130,246,0.15)', color:'#60a5fa', border:'rgba(59,130,246,0.25)' },
};

function getBadgeStyle(badge) {
  return BADGE_STYLES[badge] || { bg:'rgba(244,160,23,0.15)', color:'#f4a017', border:'rgba(244,160,23,0.25)' };
}

function PriceDisplay({ item }) {
  if (item.jumbo) return <><span style={{color:'#f4a017'}} className="font-display text-lg">Rs.{item.price}</span><span className="text-cream/35 text-xs font-body ml-1">/ Rs.{item.jumbo}</span></>;
  if (item.full) return <><span style={{color:'#f4a017'}} className="font-display text-lg">Rs.{item.price}</span><span className="text-cream/35 text-xs font-body ml-1">/ Rs.{item.full}</span></>;
  if (item.special) return <><span style={{color:'#f4a017'}} className="font-display text-lg">Rs.{item.price}</span><span className="text-cream/35 text-xs font-body ml-1">/ Rs.{item.special}</span></>;
  return <span style={{color:'#f4a017'}} className="font-display text-lg">Rs.{item.price}</span>;
}

function ItemModal({ item, onClose }) {
  const { items, addItem, updateQty } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const bs = getBadgeStyle(item.badge);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden"
        style={{ background: '#162416', border: '1px solid rgba(244,160,23,0.2)' }}>
        <div className="relative aspect-video" style={{ background: '#1e3020' }}>
          <img src={item.image} alt={item.name} className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none'; }}/>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(22,36,22,0.8),transparent)' }}/>
          {item.badge && (
            <span className="absolute top-3 left-3 text-xs font-heading px-2.5 py-1 rounded-full"
              style={{ background: bs.bg, color: bs.color, border: `1px solid ${bs.border}` }}>
              {item.badge}
            </span>
          )}
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
            style={{ background: 'rgba(15,31,15,0.8)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h2 className="font-heading font-bold text-cream text-xl leading-tight">{item.name}</h2>
            <div className="text-right flex-shrink-0">
              <PriceDisplay item={item}/>
            </div>
          </div>
          <p className="text-cream/50 text-sm font-body leading-relaxed mb-4">{item.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-cream/70 text-sm font-heading">{item.rating}</span>
              <span className="text-cream/30 text-xs ml-1">({item.reviews})</span>
            </div>
            {!cartItem ? (
              <button onClick={() => { addItem(item); onClose(); }}
                className="flex items-center gap-2 text-dark-900 px-5 py-2 rounded-full font-heading font-bold text-sm transition-all hover:scale-105 glow-amber-sm"
                style={{ background: 'linear-gradient(135deg,#f7b84b,#f4a017)' }}>
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, cartItem.quantity - 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-cream"
                  style={{ background: 'rgba(244,160,23,0.2)', border: '1px solid rgba(244,160,23,0.3)' }}>-</button>
                <span className="text-cream font-heading font-bold w-6 text-center">{cartItem.quantity}</span>
                <button onClick={() => updateQty(item.id, cartItem.quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-dark-900"
                  style={{ background: '#f4a017' }}>+</button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MenuItemCard({ item }) {
  const [modal, setModal] = useState(false);
  const { items, addItem, updateQty } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const bs = getBadgeStyle(item.badge);
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300"
        style={{ background: '#162416', border: '1px solid rgba(244,160,23,0.12)' }}
        onClick={() => setModal(true)}>
        <div className="relative h-36 sm:h-44" style={{ background: '#1e3020' }}>
          <img src={item.image} alt={item.name} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.style.display = 'none'; }}/>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(22,36,22,0.65),transparent 60%)' }}/>
          {item.badge && (
            <span className="absolute top-2 left-2 text-[10px] font-heading px-2 py-0.5 rounded-full"
              style={{ background: bs.bg, color: bs.color, border: `1px solid ${bs.border}` }}>
              {item.badge}
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-heading font-bold text-cream text-sm leading-tight mb-1 line-clamp-2">{item.name}</h3>
          <p className="text-cream/40 text-xs font-body leading-relaxed mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <PriceDisplay item={item}/>
            {!cartItem ? (
              <button onClick={e => { e.stopPropagation(); addItem(item); }}
                className="text-dark-900 px-3 py-1.5 rounded-full font-heading font-bold text-xs transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg,#f7b84b,#f4a017)' }}>
                Add
              </button>
            ) : (
              <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                <button onClick={() => updateQty(item.id, cartItem.quantity - 1)}
                  className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs text-cream"
                  style={{ background: 'rgba(244,160,23,0.2)' }}>-</button>
                <span className="text-cream font-bold text-xs w-5 text-center">{cartItem.quantity}</span>
                <button onClick={() => updateQty(item.id, cartItem.quantity + 1)}
                  className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs text-dark-900"
                  style={{ background: '#f4a017' }}>+</button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <AnimatePresence>{modal && <ItemModal item={item} onClose={() => setModal(false)}/>}</AnimatePresence>
    </>
  );
}

function useIsMobile() {
  const [mobile, setMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return mobile;
}

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const { count, openCart } = useCart();
  const CATEGORIES = Object.keys(menuData);
  const allItems = Object.values(menuData).flat();

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat && menuData[cat]) setActiveCategory(cat);
  }, [searchParams]);

  const isSearching = search.trim().length > 0;
  const items = isSearching
    ? allItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : (activeCategory === 'all' ? allItems : menuData[activeCategory] || []);

  const getCategoryCount = (cat) => cat === 'all' ? allItems.length : (menuData[cat] || []).length;

  const setCategory = (cat) => {
    setActiveCategory(cat);
    setSearch('');
    if (cat !== 'all') setSearchParams({ cat }); else setSearchParams({});
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="min-h-screen" style={{ paddingTop: '7.8rem', paddingBottom: isMobile ? '7rem' : '2rem' }}>

      {/* Header */}
      <div className="border-b px-4 sm:px-6 lg:px-8 py-4" style={{ background: 'rgba(22,36,22,0.8)', borderColor: 'rgba(255,245,230,0.05)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="font-heading text-xs uppercase tracking-widest mb-0.5" style={{ color: '#f4a017' }}>What are you craving?</p>
          <h1 className="font-display text-3xl sm:text-5xl text-cream">Our <span style={{ color: '#f4a017' }}>Menu</span></h1>
        </div>
      </div>

      {/* Search */}
      <div className="sticky top-14 z-30 backdrop-blur-xl border-b px-4 sm:px-6 lg:px-8 py-2.5"
        style={{ background: 'rgba(15,31,15,0.97)', borderColor: 'rgba(255,245,230,0.05)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-lg">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search for juices, salads..."
              className="w-full rounded-full pl-9 pr-8 py-2.5 text-cream text-sm font-body placeholder-cream/30 focus:outline-none transition-colors"
              style={{ background: '#1e3020', border: '1px solid rgba(244,160,23,0.2)' }}/>
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream text-sm">x</button>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Desktop sidebar */}
        {!isMobile && (
          <div className="w-56 flex-shrink-0 sticky top-28 self-start h-[calc(100vh-7rem)] overflow-y-auto py-3 hidden md:block scrollbar-hide"
            style={{ borderRight: '1px solid rgba(255,245,230,0.05)' }}>
            <button onClick={() => setCategory('all')}
              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left transition-all"
              style={{
                background: activeCategory === 'all' && !isSearching ? 'rgba(244,160,23,0.1)' : 'transparent',
                borderLeft: activeCategory === 'all' && !isSearching ? '3px solid #f4a017' : '3px solid transparent',
              }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#1e3020' }}>
                  <img src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=40&q=60" alt="" className="w-full h-full object-cover"/>
                </div>
                <span className="font-heading text-sm" style={{ color: activeCategory === 'all' && !isSearching ? '#f4a017' : 'rgba(255,245,230,0.45)' }}>All Items</span>
              </div>
              <span className="text-xs font-heading px-1.5 py-0.5 rounded-full flex-shrink-0"
                style={{ background: 'rgba(244,160,23,0.15)', color: '#f4a017' }}>{allItems.length}</span>
            </button>
            {CATEGORIES.map(cat => {
              const meta = CATEGORY_META[cat];
              const isActive = activeCategory === cat && !isSearching;
              return (
                <button key={cat} onClick={() => setCategory(cat)}
                  className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left transition-all"
                  style={{
                    background: isActive ? 'rgba(244,160,23,0.1)' : 'transparent',
                    borderLeft: isActive ? '3px solid #f4a017' : '3px solid transparent',
                  }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#1e3020' }}>
                      <img src={meta?.img} alt="" className="w-full h-full object-cover"/>
                    </div>
                    <span className="font-heading text-xs leading-tight" style={{ color: isActive ? '#f4a017' : 'rgba(255,245,230,0.45)' }}>{meta?.label}</span>
                  </div>
                  <span className="text-xs font-heading px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: isActive ? 'rgba(244,160,23,0.2)' : 'rgba(244,160,23,0.08)', color: isActive ? '#f4a017' : 'rgba(255,245,230,0.3)' }}>
                    {getCategoryCount(cat)}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
          {/* Category heading + count */}
          {!isSearching && (
            <div className="mb-4 flex items-center gap-3">
              <h2 className="font-display text-xl text-cream">
                {activeCategory === 'all' ? 'All Items' : CATEGORY_META[activeCategory]?.label}
              </h2>
              <span className="font-heading text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(244,160,23,0.15)', color: '#f4a017' }}>
                {items.length} items
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {items.map(item => <MenuItemCard key={item.id} item={item}/>)}
          </div>
          {items.length === 0 && (
            <div className="text-center py-20">
              <p className="text-cream/50 font-body">No items found for "{search}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom category tab bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t overflow-x-auto scrollbar-hide"
          style={{ background: 'rgba(15,31,15,0.98)', borderColor: 'rgba(244,160,23,0.12)' }}>
          <div className="flex whitespace-nowrap py-1 px-1 gap-0.5">
            <button
              onClick={() => setCategory('all')}
              className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all"
              style={{
                color: activeCategory === 'all' && !isSearching ? '#f4a017' : 'rgba(255,245,230,0.4)',
                borderTop: activeCategory === 'all' && !isSearching ? '2px solid #f4a017' : '2px solid transparent',
                background: activeCategory === 'all' && !isSearching ? 'rgba(244,160,23,0.05)' : 'transparent',
              }}>
              <span className="text-base">🍹</span>
              <span className="text-[9px] font-heading tracking-wide">All</span>
            </button>
            {CATEGORIES.map(cat => {
              const meta = CATEGORY_META[cat];
              const isActive = activeCategory === cat && !isSearching;
              return (
                <button key={cat} onClick={() => setCategory(cat)}
                  className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all"
                  style={{
                    color: isActive ? '#f4a017' : 'rgba(255,245,230,0.4)',
                    borderTop: isActive ? '2px solid #f4a017' : '2px solid transparent',
                    background: isActive ? 'rgba(244,160,23,0.05)' : 'transparent',
                  }}>
                  <span className="text-base">{meta?.icon}</span>
                  <span className="text-[9px] font-heading tracking-wide">{meta?.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile cart bar */}
      {isMobile && count > 0 && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed left-0 right-0 z-50 p-3" style={{ bottom: '4rem' }}>
          <button onClick={openCart} className="w-full text-dark-900 py-4 rounded-2xl font-heading font-bold tracking-wider flex items-center justify-center gap-3 glow-amber"
            style={{ background: 'linear-gradient(135deg,#f7b84b,#f4a017)' }}>
            View Cart ({count} items)
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
