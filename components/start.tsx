"use client"; // nécessaire si tu utilises des hooks ou du state dans un composant dans /app

import { Container, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import TextDecrypt from "./textDecrypt";
import resume from "../data/resume.json";

export default function Content() {
  const [countClients, setCountClients] = useState(0);
  const name = resume.basics.name;

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100vh" }}>
      <Box
        sx={{
          ml: { xs: 2, md: 10, lg: 20 },
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          <TextDecrypt text={`${name}`} />
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "2rem", md: "4rem", lg: "5rem" },
            mb: 3,
          }}
        >
          <TextDecrypt text={resume.basics.job1} />
          <br />
          <TextDecrypt text={resume.basics.job2} />
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {countClients} visiteurs
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCountClients((prev) => prev + 1)}
        >
          Nouveau visiteur
        </Button>
      </Box>
    </Container>
  );
}
