import { motion } from "motion/react";
import { ShieldCheck, Award, Microscope, Search } from "lucide-react";

export default function Authenticity() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-20"
      >
        <p className="text-gold text-[10px] tracking-[0.8em] uppercase">
          ◆ Heritage ◆
        </p>
        <h1 className="text-5xl text-luxury-dark">Authenticity</h1>
        <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
        <div className="space-y-8">
          <div className="space-y-4">
            <Award className="text-gold" size={32} />
            <h2 className="text-3xl font-display text-luxury-dark">
              Artisanal Integrity
            </h2>
          </div>
          <div className="font-serif italic text-lg text-luxury-muted leading-relaxed space-y-6">
            <p>
              Every bottle of{" "}
              <strong className="text-gold font-normal">C.M Scents</strong> is a
              testament to the art of perfumery. We source premium concentrates
              and natural absolutes from the world's most renowned fragrance
              houses to ensure unparalleled sillage and longevity.
            </p>
            <p>
              Authenticity is not just about the brand; it's about the
              chemistry. We maintain strict cold-storage environments for our
              ingredients to preserve the delicate top notes that define our
              unique olfactory signatures.
            </p>
          </div>
        </div>
        <div className="aspect-square bg-luxury-dark relative flex items-center justify-center p-12 order-first md:order-last">
          <div className="absolute inset-4 border border-gold/20" />
          <ShieldCheck className="text-gold opacity-20" size={200} />
          <div className="absolute font-display text-gold tracking-[0.5em] uppercase text-[10px] bottom-12">
            Certified Original
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {[
          {
            icon: <Microscope />,
            title: "Precision Purity",
            desc: "Each batch is tested for clarity and consistency across the full scent pyramid.",
          },
          {
            icon: <Search />,
            title: "Batch Tracking",
            desc: "Every bottle features a unique identifier ensuring its origin in our Lahore studio.",
          },
          {
            icon: <ShieldCheck />,
            title: "Original Design",
            desc: "Our compositions are exclusive to C.M Scents, crafted by master blenders.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-8 border border-gold/10 text-center space-y-4"
          >
            <div className="text-gold flex justify-center">{item.icon}</div>
            <h3 className="font-display text-sm tracking-widest text-luxury-dark uppercase">
              {item.title}
            </h3>
            <p className="text-xs font-serif italic text-luxury-muted leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-32 p-12 border border-gold/20 text-center space-y-8">
        <h2 className="text-2xl text-luxury-dark font-display uppercase tracking-widest">
          The Gold Standard
        </h2>
        <p className="font-serif italic text-lg text-luxury-muted max-w-3xl mx-auto leading-relaxed">
          Wear your fragrance with confidence knowing that you are carrying a
          piece of artisanal excellence designed to leave a lasting impression.
        </p>
      </div>
    </div>
  );
}
