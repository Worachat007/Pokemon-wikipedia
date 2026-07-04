"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

export default function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui", prepend: true });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted: string[] = [];

    cache.insert = (...args) => {
      const result = prevInsert(...args);
      const serialized = args[1];

      if (serialized?.name) {
        inserted.push(serialized.name);
      }

      return result;
    };

    return {
      cache,
      flush: () => {
        const prevInserted = inserted;
        inserted = [];
        return prevInserted;
      },
    };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }

    let styles = "";
    names.forEach((name) => {
      styles += cache.inserted[name];
    });

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
