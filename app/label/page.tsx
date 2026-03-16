"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type LabelsMap = Record<string, number[]>;

const FEATURES = [
  { index: 0, label: "Gafas (GLASSES)" },
  { index: 1, label: "Barba (BEARD)" },
  { index: 2, label: "Pelo largo (LONG_AIR)" },
  { index: 3, label: "Pendientes (EARRINGS)" },
  { index: 4, label: "Hombre (MAN)" },
  { index: 5, label: "Mascota (PET)" },
  { index: 6, label: "Grupo, más de una persona (GROUP)" },
];

const EMPTY_FEATURES = [0, 0, 0, 0, 0, 0, 0];

export default function LabelCaricaturesPage() {
  const [files, setFiles] = useState<string[]>([]);
  const [labels, setLabels] = useState<LabelsMap>({});
  const [index, setIndex] = useState(0);
  const [jumpTo, setJumpTo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("");

  const currentFile = files[index] ?? "";
  const currentFeatures = useMemo(
    () => labels[currentFile] ?? EMPTY_FEATURES,
    [currentFile, labels]
  );

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setStatus("");
    try {
      const response = await fetch("/api/labels");
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Error cargando etiquetas");

      setFiles(data.files ?? []);
      setLabels(data.labels ?? {});
      setIndex(0);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveData = useCallback(async () => {
    setIsSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/labels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ labels }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Error guardando etiquetas");
      setStatus(`Guardado correcto (${data.updated} imágenes).`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Error desconocido al guardar");
    } finally {
      setIsSaving(false);
    }
  }, [labels]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!currentFile) return;

      if (event.key >= "1" && event.key <= "7") {
        const featureIndex = Number(event.key) - 1;
        setLabels((prev) => {
          const current = prev[currentFile] ?? [...EMPTY_FEATURES];
          const next = [...current];
          next[featureIndex] = next[featureIndex] === 1 ? 0 : 1;
          return { ...prev, [currentFile]: next };
        });
      }

      if (event.key.toLowerCase() === "a") {
        setIndex((prev) => Math.max(0, prev - 1));
      }

      if (event.key.toLowerCase() === "d") {
        setIndex((prev) => Math.min(files.length - 1, prev + 1));
      }

      if (event.key.toLowerCase() === "s") {
        void saveData();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentFile, files.length, saveData]);

  const setFeatureValue = (featureIndex: number, checked: boolean) => {
    if (!currentFile) return;
    setLabels((prev) => {
      const current = prev[currentFile] ?? [...EMPTY_FEATURES];
      const next = [...current];
      next[featureIndex] = checked ? 1 : 0;
      return { ...prev, [currentFile]: next };
    });
  };

  const goToCaricature = () => {
    const target = Number.parseInt(jumpTo.trim(), 10);
    if (Number.isNaN(target) || target <= 0) {
      setStatus("Introduce un numero de caricatura valido.");
      return;
    }

    const targetFile = `${target}.jpg`;
    const targetIndex = files.indexOf(targetFile);
    if (targetIndex === -1) {
      setStatus(`No existe ${targetFile} en public/caricatures.`);
      return;
    }

    setIndex(targetIndex);
    setStatus(`Posicionado en ${targetFile}.`);
  };

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" sx={{ color: "#033778", fontWeight: 700, mb: 1 }}>
        Etiquetado de caricaturas
      </Typography>
      <Typography sx={{ mb: 3, color: "text.secondary" }}>
        Teclas: 1-7 alternan features, A anterior, D siguiente, S guardar.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Paper sx={{ p: 2, flex: 1 }}>
          {currentFile ? (
            <>
              <Typography sx={{ mb: 1, fontWeight: 600 }}>
                Archivo: {currentFile} ({index + 1}/{files.length})
              </Typography>
              <Box
                component="img"
                src={`/caricatures/${currentFile}`}
                alt={currentFile}
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                  display: "block",
                }}
              />
            </>
          ) : (
            <Typography>No hay archivos para etiquetar.</Typography>
          )}
        </Paper>

        <Paper sx={{ p: 2, width: { xs: "100%", md: 380 } }}>
          <Typography sx={{ fontWeight: 700, mb: 1 }}>Features</Typography>
          <Stack>
            {FEATURES.map((feature) => (
              <FormControlLabel
                key={feature.index}
                control={
                  <Checkbox
                    checked={currentFeatures[feature.index] === 1}
                    onChange={(event) => setFeatureValue(feature.index, event.target.checked)}
                  />
                }
                label={`${feature.index + 1}. ${feature.label}`}
              />
            ))}
          </Stack>

          <Typography sx={{ mt: 2, fontFamily: "monospace", fontSize: "0.9rem" }}>
            {`{ file: "${currentFile}", features: [${currentFeatures.join(",")}] }`}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <TextField
              size="small"
              label="Ir a caricatura"
              placeholder="Ej: 523"
              value={jumpTo}
              onChange={(event) => setJumpTo(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  goToCaricature();
                }
              }}
              sx={{ flex: 1 }}
            />
            <Button variant="outlined" onClick={goToCaricature}>
              Ir
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
              disabled={index === 0}
            >
              Anterior
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIndex((prev) => Math.min(files.length - 1, prev + 1))}
              disabled={index >= files.length - 1}
            >
              Siguiente
            </Button>
            <Button variant="contained" onClick={() => void saveData()} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar"}
            </Button>
          </Stack>

          {status && (
            <Typography sx={{ mt: 2, color: status.startsWith("Guardado") ? "success.main" : "error.main" }}>
              {status}
            </Typography>
          )}
        </Paper>
      </Stack>
    </Box>
  );
}
