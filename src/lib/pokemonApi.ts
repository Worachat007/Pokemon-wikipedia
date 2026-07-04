import { PokemonDetail, PokemonEvolutionStage } from "@/types/pokemon";

export async function getPokemonListPage(url?: string) {
  const response = await fetch(url ?? "https://pokeapi.co/api/v2/pokemon?limit=20", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  return response.json();
}

export async function getPokemonDetail(
  pokemonName: string
): Promise<PokemonDetail> {
  const [pokemonResponse, speciesResponse] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`, {
      next: { revalidate: 3600 },
    }),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`, {
      next: { revalidate: 3600 },
    }),
  ]);

  if (!pokemonResponse.ok || !speciesResponse.ok) {
    throw new Error(`Failed to fetch Pokemon: ${pokemonName}`);
  }

  const pokemon = await pokemonResponse.json();
  const species = await speciesResponse.json();

  const megaForms = getMegaForms(species.varieties ?? []);

  let evolution: PokemonEvolutionStage[] = [];
  if (species.evolution_chain?.url) {
    const evolutionResponse = await fetch(species.evolution_chain.url, {
      next: { revalidate: 3600 },
    });

    if (evolutionResponse.ok) {
      const evolutionData = await evolutionResponse.json();
      evolution = extractEvolutionChain(evolutionData.chain);
    }
  }

  evolution = addMegaEvolutionForms(evolution, megaForms);

  const flavorTextEntry = species.flavor_text_entries?.find(
    (entry: { language: { name: string } }) => entry.language.name === "en"
  );
  const genusEntry = species.genera?.find(
    (entry: { language: { name: string } }) => entry.language.name === "en"
  );

  return {
    ...pokemon,
    species: {
      flavorText: flavorTextEntry?.flavor_text?.replace(/\n|\f/g, " ") ?? "",
      genus: genusEntry?.genus ?? "",
      habitat: species.habitat?.name ?? "Unknown",
      evolution,
      cryUrl: species.cries?.latest ?? null,
    },
  };
}

function extractEvolutionChain(
  node: any,
  result: PokemonEvolutionStage[] = []
): PokemonEvolutionStage[] {
  if (!node?.species) {
    return result;
  }

  const speciesUrl = node.species.url as string;
  const match = speciesUrl.match(/\/pokemon-species\/(\d+)\//);
  const id = match?.[1];
  const imageUrl = id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${node.species.name}.png`;

  result.push({
    name: node.species.name,
    imageUrl,
  });

  if (node.evolves_to?.length) {
    node.evolves_to.forEach((child: any) => extractEvolutionChain(child, result));
  }

  return result;
}

function getMegaForms(varieties: Array<{ is_default: boolean; pokemon: { name: string; url: string } }> = []): Array<{ name: string }> {
  return varieties
    .filter((variety) => !variety.is_default)
    .map((variety) => ({ name: variety.pokemon.name }))
    .filter((form) => form.name.includes("mega"));
}

function addMegaEvolutionForms(
  evolution: PokemonEvolutionStage[],
  forms: Array<{ name: string }> = []
): PokemonEvolutionStage[] {
  if (!forms.length) {
    return evolution;
  }

  const megaForms = forms
    .map((form) => form.name)
    .filter((name) => name.includes("mega"))
    .map((name) => ({
      name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${name}.png`,
      displayName: formatEvolutionName(name),
    }));

  if (!megaForms.length) {
    return evolution;
  }

  return evolution.map((stage) => {
    const baseName = stage.name.toLowerCase();
    const relatedForms = megaForms.filter((form) => {
      const formName = form.name.toLowerCase();
      return formName.startsWith(`${baseName}-`) || formName.startsWith(`${baseName}`);
    });

    if (!relatedForms.length) {
      return stage;
    }

    return {
      ...stage,
      forms: relatedForms,
    };
  });
}

function formatEvolutionName(name: string): string {
  return name
    .split("-")
    .map((part) => {
      if (part.toLowerCase() === "mega") {
        return "Mega";
      }

      if (part.length === 1) {
        return part.toUpperCase();
      }

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}
