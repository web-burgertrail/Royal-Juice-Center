import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStoreTimer } from '../hooks/useStoreTimer';

function LiveStatus() {
  const { isOpen, formatted } = useStoreTimer();
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-heading font-medium ${
      isOpen ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-amber-500/20 border border-amber-500/30'
    }`} style={isOpen ? {} : { color: '#f4a017' }}>
      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`}/>
      {isOpen
        ? <>OPEN NOW · Closes in <span className="font-bold tracking-widest">{formatted}</span></>
        : <>CLOSED · Opens in <span className="font-bold tracking-widest">{formatted}</span></>
      }
    </div>
  );
}

const BRANCHES = [
  { name: 'Royal Juice Center (Main)', address: 'P.No. 290, Shivam Pally, Hyd.', phone: '+91 98627 25825', icon: '👑', maps: 'https://maps.google.com/?q=Shivam+Pally+Hyderabad' },
  { name: 'Royal Juice Center', address: 'Gacchi Bowli, Hyderabad', phone: '+91 83747 23008', icon: '🌟', maps: 'https://maps.google.com/?q=Gachibowli+Hyderabad' },
  { name: 'Taj Juice Center', address: 'Hussaini Alam, Hyderabad', phone: null, icon: '🏛️', maps: 'https://maps.google.com/?q=Hussaini+Alam+Hyderabad' },
];

export default function Contact() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      className="min-h-screen pb-20" style={{ paddingTop: '7rem' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="font-heading text-xs uppercase tracking-widest mb-3" style={{ color: '#f4a017' }}>Get In Touch</p>
          <h1 className="font-display text-5xl sm:text-6xl text-cream mb-4">Find <span style={{ color: '#f4a017' }}>Us</span></h1>
          <div className="flex justify-center mb-4"><LiveStatus /></div>
          <p className="text-cream/40 font-body text-sm">Open daily 8:30 AM – 11:30 PM · All branches</p>
        </motion.div>

        {/* Branches */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {BRANCHES.map(({ name, address, phone, icon, maps }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl text-center" style={{ background: '#162416', border: '1px solid rgba(244,160,23,0.2)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"
                style={{ background: 'rgba(244,160,23,0.15)' }}>
                {icon}
              </div>
              <h3 className="font-heading font-bold text-cream text-sm mb-1">{name}</h3>
              <p className="text-cream/45 text-xs font-body mb-3">{address}</p>
              {phone && <p className="font-heading text-xs mb-3" style={{ color: '#f4a017' }}>{phone}</p>}
              <a href={maps} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-heading px-3 py-1.5 rounded-full transition-all hover:scale-105"
                style={{ background: 'rgba(244,160,23,0.1)', color: '#f4a017', border: '1px solid rgba(244,160,23,0.25)' }}>
                📍 Get Directions
              </a>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp Order */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl p-8 sm:p-10 text-center mb-8" style={{ background: 'rgba(244,160,23,0.06)', border: '1px solid rgba(244,160,23,0.2)' }}>
          <div className="text-5xl mb-4">📱</div>
          <h2 className="font-display text-3xl text-cream mb-2">Order via <span style={{ color: '#f4a017' }}>WhatsApp</span></h2>
          <p className="text-cream/50 font-body text-sm mb-6 max-w-sm mx-auto">
            Send us your order and we'll have it fresh and ready when you arrive!
          </p>
          <a href="https://wa.me/919281410305?text=Hello%20Royal%20Juice%20Center!%20I%20would%20like%20to%20place%20an%20order%20🥤"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-2xl font-heading font-bold text-lg transition-all hover:scale-105 glow-green"
            style={{ background: '#25D366' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Chat on WhatsApp
          </a>
        </motion.div>

        {/* Hours */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl p-6 text-center" style={{ background: '#162416', border: '1px solid rgba(244,160,23,0.15)' }}>
          <h3 className="font-heading font-bold text-cream mb-4 text-lg">⏰ Opening Hours</h3>
          <div className="space-y-2 max-w-xs mx-auto">
            {[
              ['Monday – Sunday', '8:30 AM – 11:30 PM'],
              ['All Branches', 'Same Hours'],
              ['Public Holidays', 'May vary'],
            ].map(([day, time]) => (
              <div key={day} className="flex justify-between text-sm font-body">
                <span className="text-cream/50">{day}</span>
                <span className="font-heading font-semibold" style={{ color: '#f4a017' }}>{time}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
