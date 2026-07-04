"use client";
import { Box, Typography, LinearProgress } from "@mui/material";

interface StatBarProps {
  label: string;
  value: number;
}

export function StatBar({ label, value }: StatBarProps) {
  const maxStat = 255;
  const percentage = (value / maxStat) * 100;

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 120 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ ml: 2 }}>
          {value}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            borderRadius: 4,
            backgroundColor:
              percentage > 70 ? "#4caf50" : percentage > 50 ? "#ff9800" : "#f44336",
          },
        }}
      />
    </Box>
  );
}
