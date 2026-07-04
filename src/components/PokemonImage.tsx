"use client";

import { ImgHTMLAttributes, useEffect, useState } from "react";

interface PokemonImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  fallbackSrc?: string;
}

export function PokemonImage({ src, fallbackSrc = "/pokemon-placeholder.svg", alt, ...props }: PokemonImageProps) {
  const [imageSrc, setImageSrc] = useState(src ?? fallbackSrc);

  useEffect(() => {
    setImageSrc(src ?? fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      {...props}
      src={imageSrc ?? fallbackSrc}
      alt={alt}
      onError={() => {
        if (imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
      }}
    />
  );
}
