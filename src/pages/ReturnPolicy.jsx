import { motion } from "motion/react";
import { RefreshCw, ShieldCheck, AlertCircle } from "lucide-react";

export default function ReturnPolicy() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-20"
      >
        <p className="text-gold text-[10px] tracking-[0.8em] uppercase">
          ◆ Commitment ◆
        </p>
        <h1 className="text-5xl text-luxury-dark">Return Policy</h1>
        <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
      </motion.div>

      <div className="space-y-16 prose prose-stone max-w-none">
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-gold mb-2">
            <ShieldCheck size={24} />
            <h2 className="text-2xl font-display text-luxury-dark m-0">
              Our Guarantee
            </h2>
          </div>
          <p className="font-serif italic text-lg text-luxury-muted leading-relaxed">
            At C.M Scents, your satisfaction with our artisanal perfumes is our
            highest priority. We go to great lengths to ensure every bottle
            meets the highest standards of luxury perfumery.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 p-10 bg-white border border-gold/10">
            <h3 className="font-display text-lg text-luxury-dark border-b border-gold/10 pb-4">
              Eligibility for Returns
            </h3>
            <ul className="list-none p-0 space-y-4 text-sm font-serif italic text-luxury-muted">
              <li className="flex gap-3">
                <span className="text-gold">✓</span>
                Damaged or defective products during transit.
              </li>
              <li className="flex gap-3">
                <span className="text-gold">✓</span>
                Incorrect item received (different from order).
              </li>
              <li className="flex gap-3">
                <span className="text-gold">✓</span>
                Returns must be initiated within 48 hours of delivery.
              </li>
            </ul>
          </div>
          <div className="space-y-6 p-10 bg-white border border-gold/10">
            <h3 className="font-display text-lg text-luxury-dark border-b border-gold/10 pb-4">
              Conditions
            </h3>
            <ul className="list-none p-0 space-y-4 text-sm font-serif italic text-luxury-muted">
              <li className="flex gap-3">
                <span className="text-gold">!</span>
                The product must be in its original, unopened packaging.
              </li>
              <li className="flex gap-3">
                <span className="text-gold">!</span>
                Protective cellophane seals must be intact.
              </li>
              <li className="flex gap-3">
                <span className="text-gold">!</span>
                Proof of purchase is required for all returns.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4 text-gold mb-2">
            <RefreshCw size={24} />
            <h2 className="text-2xl font-display text-luxury-dark m-0">
              The Process
            </h2>
          </div>
          <div className="font-serif italic text-lg text-luxury-muted leading-relaxed space-y-4">
            <p>
              To initiate a return, please contact our support team via WhatsApp
              with photos of the damaged item and your order number. Our team
              will review your request and provide a resolution within 24 hours.
            </p>
            <p>
              In cases of manufacturing defects, we provide a full exchange or
              store credit. Please note that "change of mind" returns are not
              applicable to fragrance products due to hygiene and quality
              control standards.
            </p>
          </div>
        </section>

        <div className="p-8 border border-gold/20 flex items-start gap-6 bg-gold/5">
          <AlertCircle className="text-gold shrink-0 mt-1" size={20} />
          <p className="text-xs uppercase tracking-widest text-luxury-muted leading-relaxed">
            Please ensure you've explored our scent profiles accurately before
            ordering. We are happy to provide guidance via WhatsApp to help you
            choose the right fragrance for your profile.
          </p>
        </div>
      </div>
    </div>
  );
}
