"use client";
import { Chip, Box } from "@mui/material";

interface TypeBadgeProps {
  types: Array<{
    slot: number;
    type: {
      name: string;
    };
  }>;
}

const typeColors: Record<string, { bg: string; text: string }> = {
  normal: { bg: "#A8A878", text: "#fff" },
  fire: { bg: "#F08030", text: "#fff" },
  water: { bg: "#6890F0", text: "#fff" },
  electric: { bg: "#F8D030", text: "#000" },
  grass: { bg: "#78C850", text: "#fff" },
  ice: { bg: "#98D8D8", text: "#000" },
  fighting: { bg: "#C03028", text: "#fff" },
  poison: { bg: "#A040A0", text: "#fff" },
  ground: { bg: "#E0C068", text: "#000" },
  flying: { bg: "#A890F0", text: "#fff" },
  psychic: { bg: "#F85888", text: "#fff" },
  bug: { bg: "#A8B820", text: "#fff" },
  rock: { bg: "#B8A038", text: "#fff" },
  ghost: { bg: "#705898", text: "#fff" },
  dragon: { bg: "#7038F8", text: "#fff" },
  dark: { bg: "#705848", text: "#fff" },
  steel: { bg: "#B8B8D0", text: "#000" },
  fairy: { bg: "#EE99AC", text: "#000" },
};

export function TypeBadge({ types }: TypeBadgeProps) {
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {types.map((t) => {
        const typeInfo = typeColors[t.type.name] || { bg: "#999", text: "#fff" };
        return (
          <Chip
            key={t.slot}
            label={t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
            sx={{
              backgroundColor: typeInfo.bg,
              color: typeInfo.text,
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          />
        );
      })}
    </Box>
  );
}
