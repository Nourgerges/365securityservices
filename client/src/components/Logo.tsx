import logoImage from "../assets/365_logo.png";

export function Logo({ size = "normal", showTagline = true }: { size?: "small" | "normal" | "large" | "x-large", showTagline?: boolean }) {
  const logoSize = 
    size === "small" ? "h-8" : 
    size === "large" ? "h-28" : 
    size === "x-large" ? "h-36" : 
    "h-10";
  const taglineSize = 
    size === "small" ? "text-[10px]" : 
    size === "large" ? "text-xl" : 
    size === "x-large" ? "text-2xl" : 
    "text-xs";

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${logoSize} flex items-center`}>
        <img src={logoImage} alt="365 Security Services Logo" className={`${logoSize} object-contain`} />
      </div>
      {showTagline && (
        <div className="flex flex-col items-center mt-3">
          <span className={`font-orbitron font-bold ${taglineSize} text-[#a87c64] tracking-wider`}>WHERE PROTECTION MEETS PRECISION</span>
        </div>
      )}
    </div>
  );
}
