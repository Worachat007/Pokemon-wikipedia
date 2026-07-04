"use client";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useMemo, useState } from "react";

interface PokemonListItem {
  name: string;
  url: string;
}

interface HomeClientProps {
  initialPokemon: PokemonListItem[];
  nextUrl: string | null;
}

interface PokemonPageResponse {
  next: string | null;
  results: PokemonListItem[];
}

export default function HomeClient({ initialPokemon, nextUrl }: HomeClientProps) {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>(initialPokemon);
  const [currentNextUrl, setCurrentNextUrl] = useState<string | null>(nextUrl);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(Boolean(nextUrl));
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadMorePokemon = async () => {
      if (!currentNextUrl || loading) return;

      setLoading(true);
      try {
        const response = await fetch(currentNextUrl);
        const data: PokemonPageResponse = await response.json();
        setPokemonList((prev) => {
          const existingUrls = new Set(prev.map((pokemon) => pokemon.url));
          const uniqueNew = data.results.filter((pokemon) => !existingUrls.has(pokemon.url));
          return [...prev, ...uniqueNew];
        });
        setCurrentNextUrl(data.next);
        setHasMore(Boolean(data.next));
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadMorePokemon();
  }, [currentNextUrl, loading]);

  const filteredPokemon = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return pokemonList;
    return pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(keyword));
  }, [pokemonList, search]);

  return (
    <>
      <div style={{ padding: 18, marginBottom: 24, borderRadius: 24, background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)", border: "2px solid #cbd5e1", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)" }}>
        <label htmlFor="pokemon-search" style={{ display: "block", marginBottom: 8, fontWeight: 700, color: "#111827" }}>
          🔎 ค้นหา Pokémon
        </label>
        <input
          id="pokemon-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="พิมพ์ชื่อโปเกม่อน"
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 16,
            border: "2px solid #64748b",
            outline: "none",
            fontSize: 16,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            color: "#111827",
            boxShadow: "inset 0 2px 4px rgba(15, 23, 42, 0.08)",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => {
            const pokemonId = pokemon.url.split("/")[6];
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

            return (
              <a
                key={pokemon.url}
                href={`/pokemon/${pokemon.name}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  borderRadius: 24,
                  padding: 18,
                  background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                  border: "2px solid #e2e8f0",
                  boxShadow: "0 16px 32px rgba(15, 23, 42, 0.12)",
                  textDecoration: "none",
                  color: "inherit",
                  textAlign: "center",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(248,250,252,0.8), rgba(255,255,255,0) 60%)",
                    pointerEvents: "none",
                  }}
                />
                <img
                  src={imageUrl}
                  alt={pokemon.name}
                  onError={(event) => {
                    event.currentTarget.src = "/pokemon-placeholder.svg";
                  }}
                  style={{ width: 96, height: 96, objectFit: "contain", marginBottom: 12, filter: "drop-shadow(0 6px 8px rgba(15, 23, 42, 0.2))" }}
                />
                <div style={{ fontSize: 18, fontWeight: 800, textTransform: "capitalize", color: "#111827" }}>
                  {pokemon.name}
                </div>
              </a>
            );
          })
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              borderRadius: 24,
              padding: 24,
              background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
              border: "2px solid #e2e8f0",
              boxShadow: "0 16px 32px rgba(15, 23, 42, 0.12)",
              textAlign: "center",
              color: "#374151",
            }}
          >
            ไม่พบโปเกม่อนที่ตรงกับคำค้นหา
          </div>
        )}
      </div>

      {loading && (
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            marginTop: 24,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              style={{
                borderRadius: 24,
                padding: 18,
                background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                border: "2px solid #e2e8f0",
                boxShadow: "0 16px 32px rgba(15, 23, 42, 0.12)",
              }}
            >
              <Skeleton variant="circular" width={96} height={96} sx={{ mx: "auto", mb: 1.5 }} />
              <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
            </div>
          ))}
        </div>
      )}

      {!loading && !hasMore && (
        <div style={{ textAlign: "center", marginTop: 32, color: "#64748b", fontWeight: 700 }}>
          ✅ โหลดโปเกม่อนครบแล้ว {pokemonList.length} ตัว
        </div>
      )}
    </>
  );
}
