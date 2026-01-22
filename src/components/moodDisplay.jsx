import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MoodDisplay = ({ data, loading }) => {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center p-10 text-white/50 italic"
        >
          Consulting the AI...
        </motion.div>
      ) : data ? (
        <motion.div
          key="result"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center p-8 rounded-3xl border backdrop-blur-md"
          style={{
            backgroundColor: `${data.color}20`,
            borderColor: `${data.color}40`,
          }}
        >
          {/* Dynamic Icon Handling */}
          {(() => {
            const IconComponent = Icons[data.icon] || Icons.Sparkles;
            return (
              <IconComponent size={80} color={data.color} strokeWidth={1.5} />
            );
          })()}

          <h2
            className="mt-6 text-3xl font-bold uppercase tracking-widest text-center"
            style={{ color: data.color }}
          >
            {data.vibe}
          </h2>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default MoodDisplay;
