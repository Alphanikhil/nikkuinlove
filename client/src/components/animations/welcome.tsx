import { motion } from "framer-motion";

export default function Welcome() {
  const hearts = Array.from({ length: 15 });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          initial={{
            opacity: 0,
            scale: 0.5,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
            y: 0,
            transition: {
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 8
            }
          }}
        >
          {i % 2 === 0 ? "💝" : "❤️"}
        </motion.div>
      ))}
    </motion.div>
  );
}