import { motion } from "framer-motion";

interface BearCoupleProps {
  position: "left" | "right";
}

export default function BearCouple({ position }: BearCoupleProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1, rotate: position === "left" ? -5 : 5 }}
      className="w-32 h-32 rounded-full overflow-hidden shadow-lg bg-white p-2"
    >
      <img
        src={position === "left" ? "/bear-couple-1.jpg" : "/bear-couple-2.jpg"}
        alt="Cute bear couple"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}