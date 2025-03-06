import { motion } from "framer-motion";

const STICKER_URLS = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
  "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6",
  "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8",
  "https://images.unsplash.com/photo-1493406300581-484b937cdc41"
];

interface CatStickerProps {
  stickerId: number;
}

export default function CatSticker({ stickerId }: CatStickerProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="w-24 h-24 rounded-full overflow-hidden shadow-lg"
    >
      <img
        src={STICKER_URLS[(stickerId - 1) % STICKER_URLS.length]}
        alt="Cute cat"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
