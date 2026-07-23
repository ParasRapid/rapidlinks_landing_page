import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { width: 140, height: 40 },
  md: { width: 180, height: 52 },
  lg: { width: 220, height: 64 },
};

export default function Logo({
  variant = 'default',
  size = 'md',
  showTagline = false,
  className = '',
}: LogoProps) {
  const dims = sizeMap[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-0 shrink-0 ${className}`} aria-label="RapidLinks - Go to homepage">
      {variant === 'white' ? (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {/* Diamond mark — teal gradient, inverted for white variant */}
            <svg
              width={dims.height * 0.7}
              height={dims.height * 0.7}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="diamondWhite" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#2DD4BF" />
                  <stop offset="1" stopColor="#5EEAD4" />
                </linearGradient>
              </defs>
              <rect x="6" y="6" width="22" height="22" rx="2" transform="rotate(0 6 6)" fill="url(#diamondWhite)" opacity="0.5" />
              <rect x="12" y="12" width="22" height="22" rx="2" fill="url(#diamondWhite)" />
            </svg>
            <span className="font-black text-white tracking-tight" style={{ fontSize: dims.height * 0.42 }}>
              RAPID<span className="text-teal-300">LINKS</span>
            </span>
          </div>
          {showTagline && (
            <span className="text-teal-200 text-xs font-medium ml-10 -mt-1 tracking-wide">
              logistics & courier solution
            </span>
          )}
        </div>
      ) : (
        <Image
          src="/images/Group_50_(4).png"
          alt="RapidLinks — Logistics & Courier Solution"
          width={dims.width}
          height={dims.height}
          className="object-contain"
          priority
        />
      )}
    </Link>
  );
}
