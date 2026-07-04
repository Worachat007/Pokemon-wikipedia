import Skeleton from "@mui/material/Skeleton";
import { Suspense } from "react";
import HomeClient from "../components/HomeClient";

interface PokemonListItem {
  name: string;
  url: string;
}

async function getInitialPokemonPage() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch initial Pokemon data");
  }

  return response.json();
}

export default async function Home() {
  const data = await getInitialPokemonPage();
  const initialPokemon: PokemonListItem[] = data.results ?? [];

  return (
    <div
      style={{
        padding: "32px",
        background: "radial-gradient(circle at top, #fff7ed 0%, #fef2f2 35%, #eff6ff 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          marginBottom: 24,
          padding: "24px 28px",
          borderRadius: 28,
          background: "linear-gradient(135deg, #ef4444 0%, #3b82f6 100%)",
          color: "white",
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
          <a
            href="/about"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 700,
              background: "rgba(255,255,255,0.2)",
              padding: "8px 12px",
              borderRadius: 999,
            }}
          >
            About this project
          </a>
        </div>
        <h1 style={{ margin: "0 0 8px", fontSize: "2.25rem", fontWeight: 800, letterSpacing: "0.04em", color: "#ffffff" }}>
          Pokémon Gallery
        </h1>
        <p style={{ margin: 0, color: "#fef2f2", fontSize: "1rem" }}>
          ค้นหาและเปิดดูโปเกม่อนโปรดของคุณแบบเกมมาส์คด้วยสไตล์ Pokémon
        </p>
      </div>

      <Suspense
        fallback={
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                style={{
                  borderRadius: 24,
                  padding: 18,
                  backgroundColor: "white",
                  boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
                }}
              >
                <Skeleton variant="circular" width={96} height={96} sx={{ mx: "auto", mb: 1.5 }} />
                <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
              </div>
            ))}
          </div>
        }
      >
        <HomeClient initialPokemon={initialPokemon} nextUrl={data.next} />
      </Suspense>
    </div>
  );
}
