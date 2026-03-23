import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Order() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center pb-20" style={{ paddingTop: '7rem' }}>
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="text-6xl mb-6">🥤</div>
        <h1 className="font-display text-4xl text-cream mb-4">Place Your <span style={{ color: '#f4a017' }}>Order</span></h1>
        <p className="text-cream/50 font-body mb-8">Order ahead via WhatsApp and pick up fresh!</p>
        <div className="flex flex-col gap-3">
          <a href="https://wa.me/919281410305?text=Hello%20Royal%20Juice%20Center!%20I%20want%20to%20place%20an%20order."
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 text-white py-4 rounded-2xl font-heading font-bold text-lg transition-all hover:scale-105 glow-green"
            style={{ background: '#25D366' }}>
            📱 Order on WhatsApp
          </a>
          <Link to="/menu" className="py-4 rounded-2xl font-heading font-bold text-dark-900 transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #f7b84b, #f4a017)' }}>
            🍹 Browse Full Menu
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
