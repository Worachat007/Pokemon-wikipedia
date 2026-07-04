import { getPokemonDetail } from "@/lib/pokemonApi";
import { PokemonDetail } from "@/types/pokemon";
import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import { StatBar } from "@/components/StatBar";
import { TypeBadge } from "@/components/TypeBadge";
import { PokemonImage } from "@/components/PokemonImage";

interface PokemonDetailPageProps {
  params: Promise<{ pokemonname: string }>;
}

export async function generateMetadata({ params }: PokemonDetailPageProps) {
  const { pokemonname } = await params;
  return {
    title: `${pokemonname.charAt(0).toUpperCase() + pokemonname.slice(1)} | Pokemon App`,
  };
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { pokemonname } = await params;

  let pokemon: PokemonDetail;
  try {
    pokemon = await getPokemonDetail(pokemonname);
  } catch {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" color="error">
          Pokemon "{pokemonname}" ไม่พบ
        </Typography>
      </Container>
    );
  }

  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ mb: 4, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <CardContent>
          <Grid container spacing={3} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ textAlign: "center" }}>
              {imageUrl ? (
                <Box sx={{ position: "relative", width: "100%", height: 300 }}>
                  <PokemonImage
                    src={imageUrl}
                    alt={pokemon.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ position: "relative", width: "100%", height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PokemonImage
                    src={null}
                    alt={pokemon.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
                  {pokemon.name.toUpperCase()}
                </Typography>
                {pokemon.species.cryUrl && (
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      const audio = new Audio(pokemon.species.cryUrl!);
                      void audio.play();
                    }}
                    sx={{
                      border: "2px solid rgba(255,255,255,0.8)",
                      borderRadius: "50%",
                      width: 44,
                      height: 44,
                      backgroundColor: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(4px)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.25)",
                      },
                    }}
                  >
                    🔊
                  </IconButton>
                )}
              </Box>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
                #{String(pokemon.id).padStart(3, "0")}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <TypeBadge types={pokemon.types} />
              </Box>

              <Paper sx={{ p: 2, backgroundColor: "rgba(255,255,255,0.95)" }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="textSecondary">
                      ความสูง
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {pokemon.height / 10} m
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="textSecondary">
                      น้ำหนัก
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {pokemon.weight / 10} kg
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            คำอธิบาย
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {pokemon.species.flavorText || "ไม่มีคำอธิบายภาษาอังกฤษ"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            สกุล: {pokemon.species.genus || "-"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ที่อยู่อาศัย: {pokemon.species.habitat || "-"}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
            สถิติ
          </Typography>

          <Grid container spacing={3}>
            {pokemon.stats.map((stat) => (
              <Grid size={{ xs: 12, sm: 6 }} key={stat.stat.name}>
                <StatBar label={stat.stat.name} value={stat.base_stat} />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              รวม (Total)
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {pokemon.species.evolution.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              วิวัฒนาการ
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {pokemon.species.evolution.map((stage) => (
                <Box key={stage.name}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      backgroundColor: "background.paper",
                    }}
                  >
                    <PokemonImage
                      src={stage.imageUrl}
                      alt={stage.name}
                      style={{ width: 72, height: 72, objectFit: "contain" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {stage.displayName ?? stage.name.replace(/-/g, " ")}
                      </Typography>
                      {stage.forms && stage.forms.length > 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          ร่าง Mega: {stage.forms.map((form) => form.displayName ?? form.name.replace(/-/g, " ")).join(", ")}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {stage.forms && stage.forms.length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1.5, ml: 2 }}>
                      {stage.forms.map((form) => (
                        <Box
                          key={form.name}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            px: 1.5,
                            py: 1,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "warning.main",
                            backgroundColor: "warning.50",
                          }}
                        >
                          <PokemonImage
                            src={form.imageUrl}
                            alt={form.name}
                            style={{ width: 48, height: 48, objectFit: "contain" }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {form.displayName ?? form.name.replace(/-/g, " ")}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {pokemon.abilities.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              ความสามารถ
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {pokemon.abilities.map((ability, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 1.5,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">
                    {ability.ability.name.toUpperCase()}
                  </Typography>
                  {ability.is_hidden && (
                    <Typography
                      variant="caption"
                      sx={{
                        backgroundColor: "#ff9800",
                        color: "white",
                        px: 1,
                        py: 0.5,
                        borderRadius: 0.5,
                      }}
                    >
                      Hidden
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {pokemon.species.cryUrl && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              เสียงโปเกม่อน
            </Typography>
            <audio controls src={pokemon.species.cryUrl} style={{ width: "100%" }}>
              Your browser does not support the audio element.
            </audio>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
