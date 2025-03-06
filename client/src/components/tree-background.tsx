export default function TreeBackground() {
  return (
    <div 
      className="absolute inset-0 opacity-25"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1514064019862-23e2a332a6a6')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "sepia(0.3) hue-rotate(290deg)"
      }}
    />
  );
}
