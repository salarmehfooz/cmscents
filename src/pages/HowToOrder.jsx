import { motion } from "motion/react";
import { ShoppingBag, Tablet, Truck, CheckCircle } from "lucide-react";

export default function HowToOrder() {
  const steps = [
    {
      icon: <ShoppingBag size={32} />,
      title: "Select Your Fragrance",
      desc: "Browse our signature collection and find the scent that resonates with your personality. Each fragrance has a detailed profile of notes and impressions.",
    },
    {
      icon: <Tablet size={32} />,
      title: "Provide Details",
      desc: 'Click "Buy Now" and fill in your delivery information. We offer simplified one-tap ordering optimized for mobile and desktop.',
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Order Confirmation",
      desc: "Our team will reach out to you via WhatsApp shortly after your order is placed to confirm the details and answer any questions.",
    },
    {
      icon: <Truck size={32} />,
      title: "Swift Delivery",
      desc: "Once confirmed, your artisanal fragrance is packed with care and shipped via premium courier. Expect delivery within 2 to 4 business days.",
    },
  ];

  return (
    <div className="py-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-20"
      >
        <p className="text-gold text-[10px] tracking-[0.8em] uppercase">
          ◆ Experience ◆
        </p>
        <h1 className="text-5xl text-luxury-dark">How to Order</h1>
        <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 border border-gold/10 bg-white hover:border-gold/30 transition-all group"
          >
            <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
              {step.icon}
            </div>
            <h3 className="font-display text-xl text-luxury-dark mb-4 tracking-wide">
              0{idx + 1}. {step.title}
            </h3>
            <p className="font-serif italic text-luxury-muted leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 p-12 bg-luxury-dark text-center space-y-6"
      >
        <h2 className="text-2xl text-gold font-display">Need Assistance?</h2>
        <p className="text-white/60 font-serif italic text-lg max-w-2xl mx-auto leading-relaxed">
          Our concierge team is available from 9 AM to 10 PM daily to assist you
          with your selection or order status.
        </p>
        <div className="pt-4">
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noreferrer"
            className="inline-block border border-gold text-gold hover:bg-gold hover:text-white px-10 py-4 text-[10px] tracking-[0.4em] uppercase transition-all"
          >
            WhatsApp Support
          </a>
        </div>
      </motion.div>
    </div>
  );
}
