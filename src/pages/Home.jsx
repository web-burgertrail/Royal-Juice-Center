import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';

const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=1600&q=80',
  'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=1600&q=80',
  'https://images.unsplash.com/photo-1546173159-315724a31696?w=1600&q=80',
  'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1600&q=80',
  'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=1600&q=80',
];

const QUICK_CATS = [
  { label: 'Fruit Juices', img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&q=75', emoji: '🍊' },
  { label: 'Special Juices', img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300&q=75', emoji: '✨' },
  { label: 'Dry Fruit', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=75', emoji: '🌰' },
  { label: 'Fruit Salads', img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&q=75', emoji: '🥗' },
  { label: 'Milk Shakes', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&q=75', emoji: '🥛' },
  { label: 'Snacks', img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&q=75', emoji: '🌯' },
];

const BRANCHES = [
  { name: 'Royal Juice Center', location: 'Main Branch — Shivam Pally, Hyderabad', icon: '👑' },
  { name: 'Royal Juice Center', location: 'Gacchi Bowli, Hyderabad', icon: '🌟' },
  { name: 'Taj Juice Center', location: 'Hussaini Alam, Hyderabad', icon: '🏛️' },
];

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f2d0f 0%, #1a3d0a 50%, #0f1f0f 100%)' }}/>
      <AnimatePresence mode="sync">
        <motion.div key={current} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 0.35, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <img src={HERO_SLIDES[current]} alt="" className="w-full h-full object-cover"/>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,31,15,0.7) 0%, rgba(15,31,15,0.3) 50%, rgba(15,31,15,0.9) 100%)' }}/>
    </div>
  );
}

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const endNum = parseInt(end);
        const startTime = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * endNum));
          if (progress < 1) requestAnimationFrame(step); else setCount(endNum);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const FEATURED = [
  ...menuData.fruitJuices.slice(0, 3),
  ...menuData.specialJuices.slice(0, 2),
  ...menuData.milkShakes.slice(0, 2),
  ...menuData.fruitSalads.slice(0, 2),
  ...menuData.snacks.slice(0, 1),
].filter(Boolean);

const NAVBAR_H = '7.8rem';

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end sm:items-center overflow-hidden" style={{ paddingTop: NAVBAR_H }}>
        <HeroSlideshow />

        {/* Decorative fruit circles */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #f4a017 0%, transparent 70%)' }}/>
        <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }}/>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-heading uppercase tracking-widest"
              style={{ background: 'rgba(244,160,23,0.15)', border: '1px solid rgba(244,160,23,0.3)', color: '#f4a017' }}>
              🌿 Fresh • Natural • Hygienic
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="font-logo leading-none mb-2" style={{ fontSize: 'clamp(2.8rem, 11vw, 6rem)', color: '#f4a017' }}>
              Royal Juice
            </motion.h1>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-display text-cream/80 mb-4" style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}>
              Center & Snacks
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
              className="text-cream/55 text-sm sm:text-base font-body mb-7 max-w-sm leading-relaxed">
              Hyderabad's finest fruit juices, dry fruit specials, fresh salads & snacks — served with royal freshness since decades.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
              className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/menu')}
                className="flex items-center gap-2 text-dark-900 px-6 sm:px-8 py-3 rounded-full font-heading font-bold text-sm tracking-wider uppercase transition-all hover:scale-105 glow-amber"
                style={{ background: 'linear-gradient(135deg, #f7b84b, #f4a017)' }}>
                🍹 View Menu
              </button>
              <a href="https://wa.me/919281410305" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 glass px-6 sm:px-8 py-3 rounded-full font-heading font-bold text-sm tracking-wider uppercase transition-all hover:border-green-500/40 hover:text-green-400 text-cream/80">
                📞 Order Now
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex gap-8 mt-10">
              {[
                { label: 'Menu Items', node: <CountUp end="60" suffix="+" duration={1500}/> },
                { label: 'Happy Customers', node: <CountUp end="50000" suffix="+" duration={2500}/> },
                { label: 'Branches', node: <CountUp end="4" suffix="" duration={800}/> },
              ].map(({ label, node }) => (
                <div key={label}>
                  <p className="font-display text-2xl sm:text-3xl" style={{ color: '#f4a017' }}>{node}</p>
                  <p className="text-cream/40 text-[10px] sm:text-xs font-body tracking-wide mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
          <div className="w-5 h-8 border-2 rounded-full flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(244,160,23,0.3)' }}>
            <div className="w-1 h-1.5 rounded-full" style={{ background: '#f4a017' }}/>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="py-3 overflow-hidden" style={{ background: 'rgba(244,160,23,0.08)', borderTop: '1px solid rgba(244,160,23,0.2)', borderBottom: '1px solid rgba(244,160,23,0.2)' }}>
        <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'marqueeScroll 14s linear infinite' }}>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="flex items-center gap-10 flex-shrink-0">
              <span className="font-logo text-lg" style={{ color: '#f4a017' }}>Royal Juice</span>
              <span style={{ color: 'rgba(244,160,23,0.4)' }}>🍊</span>
              <span className="font-body text-sm text-cream/30 tracking-widest uppercase">Fresh Daily</span>
              <span style={{ color: 'rgba(244,160,23,0.4)' }}>🌿</span>
              <span className="font-body text-sm tracking-widest uppercase" style={{ color: 'rgba(244,160,23,0.6)' }}>Hyderabad</span>
              <span style={{ color: 'rgba(244,160,23,0.4)' }}>🥭</span>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-7">
          <p className="font-heading text-xs uppercase tracking-widest mb-2" style={{ color: '#f4a017' }}>Explore Our Menu</p>
          <h2 className="font-display text-3xl sm:text-4xl text-cream">Order by <span style={{ color: '#f4a017' }}>Category</span></h2>
        </motion.div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-5">
          {QUICK_CATS.map(({ label, img, emoji }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link to="/menu" className="flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden group-hover:scale-105 transition-all duration-300 shadow-md relative"
                  style={{ border: '2px solid rgba(244,160,23,0.15)' }}>
                  <img src={img} alt={label} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.parentElement.style.background = '#1e3020'; e.target.style.display = 'none'; }}/>
                  <div className="absolute inset-0 flex items-end justify-center pb-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(to top, rgba(244,160,23,0.8), transparent)' }}>
                    <span className="text-lg">{emoji}</span>
                  </div>
                </div>
                <span className="text-cream/55 text-xs sm:text-sm font-heading group-hover:text-amber-primary transition-colors text-center leading-tight" style={{'--tw-text-opacity': 1}}>
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-end justify-between mb-5">
          <div>
            <p className="font-heading text-xs uppercase tracking-widest mb-1" style={{ color: '#f4a017' }}>Must Try</p>
            <h2 className="font-display text-3xl sm:text-4xl text-cream">Featured <span style={{ color: '#f4a017' }}>Picks</span></h2>
          </div>
          <Link to="/menu" className="flex items-center gap-1 text-cream/30 hover:text-amber-primary text-xs font-heading transition-colors">
            See all <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {FEATURED.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                style={{ width: '155px', flexShrink: 0 }}>
                <div className="rounded-2xl overflow-hidden transition-all hover:scale-105 duration-300"
                  style={{ background: '#162416', border: '1px solid rgba(244,160,23,0.15)' }}>
                  <div className="relative h-28 bg-dark-700">
                    <img src={item.image} alt={item.name} loading="lazy"
                      className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none'; }}/>
                    {item.badge && (
                      <span className="absolute top-1.5 left-1.5 text-[9px] font-heading px-1.5 py-0.5 rounded-full text-dark-900 font-bold"
                        style={{ background: '#f4a017' }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="font-heading text-cream text-xs font-bold line-clamp-2 leading-tight mb-1">{item.name}</p>
                    <p className="font-display text-sm" style={{ color: '#f4a017' }}>₹{item.price}
                      {item.jumbo && <span className="text-cream/30 text-[10px] font-body ml-1">/ ₹{item.jumbo}</span>}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="py-14" style={{ background: 'rgba(22,36,22,0.8)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="font-heading text-xs uppercase tracking-widest mb-2" style={{ color: '#f4a017' }}>Find Us</p>
            <h2 className="font-display text-4xl text-cream">Our <span style={{ color: '#f4a017' }}>Branches</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {BRANCHES.map(({ name, location, icon }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl"
                style={{ background: 'rgba(244,160,23,0.06)', border: '1px solid rgba(244,160,23,0.2)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                  style={{ background: 'rgba(244,160,23,0.15)', border: '1px solid rgba(244,160,23,0.3)' }}>
                  {icon}
                </div>
                <h3 className="font-heading font-bold text-cream text-base mb-1">{name}</h3>
                <p className="text-cream/50 text-sm font-body">{location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute inset-0 blur-3xl rounded-3xl opacity-20" style={{ background: '#f4a017' }}/>
              <div className="relative grid grid-cols-2 gap-3">
                {[
                  { src: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800&q=80', cls: 'col-span-2 aspect-video' },
                  { src: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80', cls: 'col-span-1 aspect-square' },
                  { src: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80', cls: 'col-span-1 aspect-square' },
                ].map(({ src, cls }, i) => (
                  <div key={i} className={`${cls} rounded-2xl overflow-hidden`}>
                    <img src={src} alt="Royal Juice Center" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="font-heading text-xs uppercase tracking-widest mb-3" style={{ color: '#f4a017' }}>Our Story</p>
              <h2 className="font-display text-4xl sm:text-5xl text-cream mb-5">More Than Just <span style={{ color: '#f4a017' }}>Juice</span></h2>
              <p className="text-cream/50 font-body text-sm leading-relaxed mb-4">
                Royal Juice Center was born from a passion for fresh, natural flavours in the heart of Hyderabad. We source only the finest seasonal fruits to craft juices, salads, and dry fruit specials that nourish both body and soul.
              </p>
              <p className="text-cream/40 font-body text-sm leading-relaxed mb-7">
                Open daily from 8:30 AM to 11:30 PM — serving the freshest drinks and snacks with a royal touch. Walk in or call ahead!
              </p>
              <div className="flex flex-wrap gap-3">
                {['🌿 100% Fresh', '❄️ Chilled Daily', '🥭 Seasonal Fruits', '🏅 25+ Years'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-heading"
                    style={{ background: 'rgba(244,160,23,0.1)', border: '1px solid rgba(244,160,23,0.25)', color: '#f4a017' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl p-10 sm:p-12 text-center overflow-hidden"
            style={{ background: 'rgba(244,160,23,0.08)', border: '1px solid rgba(244,160,23,0.25)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #f4a017, transparent)' }}/>
            <div className="text-5xl mb-4">🥤</div>
            <h2 className="font-display text-4xl sm:text-5xl text-cream mb-3">
              Thirsty? <span style={{ color: '#f4a017' }}>We've Got You.</span>
            </h2>
            <p className="text-cream/50 font-body mb-7 max-w-md mx-auto text-sm">
              Fresh juices, cold shakes, premium salads — served with love in Hyderabad. Visit any of our branches today.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/menu" className="text-dark-900 px-8 py-3.5 rounded-full font-heading font-bold tracking-wider uppercase transition-all hover:scale-105 text-sm glow-amber"
                style={{ background: 'linear-gradient(135deg, #f7b84b, #f4a017)' }}>
                Browse Menu
              </Link>
              <a href="https://wa.me/919281410305" target="_blank" rel="noopener noreferrer"
                className="glass px-8 py-3.5 rounded-full font-heading font-bold tracking-wider uppercase hover:border-green-500/40 hover:text-green-400 transition-all text-sm text-cream/80">
                📱 WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
