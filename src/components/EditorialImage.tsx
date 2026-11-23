import { useState } from 'react';
import { Compass } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
  fallbackTitle?: string;
}

export function EditorialImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  objectPosition = 'center center',
  priority = false,
  fallbackTitle,
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed || !src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0C3028] via-[#091426] to-[#123D32] flex flex-col items-center justify-center p-6 text-center islamic-lattice-bg">
        <Compass className="w-8 h-8 text-[#C6A35A] mb-3 opacity-80" strokeWidth={1.25} />
        {fallbackTitle && (
          <span className="font-display text-lg text-[#E5CD91] tracking-wide">{fallbackTitle}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      referrerPolicy="no-referrer"
      style={{ objectPosition }}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-90'}`}
    />
  );
}
