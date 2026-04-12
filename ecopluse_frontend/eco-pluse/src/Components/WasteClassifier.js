import React, { useState, useEffect } from "react";
import {
  Container, Card, CardContent, Typography, Box, Button, 
  Paper, CircularProgress, Divider, IconButton, Stack, Zoom, Fade, Grow
} from "@mui/material";
import { FaLeaf, FaCloudUploadAlt, FaTrashAlt, FaRecycle, FaCheckCircle } from "react-icons/fa";

const WasteClassifier = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [uploadedMsg, setUploadedMsg] = useState(false);

  const themeColor = "#2E7D32"; // Deep Eco Green
  const accentGreen = "#C8E6C9"; // Light Mint

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
    setUploadedMsg(true);
  };

  useEffect(() => {
    if (uploadedMsg) {
      const timer = setTimeout(() => setUploadedMsg(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadedMsg]);

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    setResult("");
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

  const classifyWaste = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const imageBase64 = await toBase64(image);
      const res = await fetch("https://ecopluse-je8y.onrender.com/api/ai/waste-classifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64 }),
      });
      const data = await res.json();
      setResult(data?.message || "Analysis complete: Item identified.");
    } catch (err) {
      setResult("Server connection failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: `linear-gradient(135deg, #f1f8e9 0%, #ffffff 50%, ${accentGreen} 100%)`,
      py: 6 
    }}>
      <Container maxWidth="sm">
        
        {/* HEADER */}
        <Box textAlign="center" mb={4}>
          <Box sx={{ 
            display: 'inline-flex', p: 1.5, borderRadius: '16px', 
            background: 'white', boxShadow: '0 8px 20px rgba(0,0,0,0.05)', mb: 2 
          }}>
            <FaLeaf size={32} color={themeColor} />
          </Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#1b5e20', letterSpacing: '-0.5px' }}>
            EcoScan <span style={{ color: themeColor, fontWeight: 400 }}>AI</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '10px', fontWeight: 700 }}>
            Precision Waste Categorization
          </Typography>
        </Box>

        {/* MAIN INTERFACE */}
        <Card sx={{
          borderRadius: 5,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            
            {/* UPLOAD AREA */}
            {!preview && (
              <Grow in={!preview}>
                <Box
                  component="label"
                  sx={{
                    border: `2px dashed ${themeColor}33`,
                    borderRadius: 4,
                    p: 5,
                    textAlign: "center",
                    cursor: "pointer",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: "rgba(255,255,255,0.5)",
                    "&:hover": {
                      borderColor: themeColor,
                      background: "#f9fff9",
                      transform: "scale(1.01)",
                      boxShadow: '0 10px 20px rgba(0,0,0,0.03)'
                    },
                  }}
                >
                  <input type="file" hidden accept="image/*" onChange={handleImage} />
                  <FaCloudUploadAlt size={48} color={themeColor} style={{ opacity: 0.8, marginBottom: 16 }} />
                  <Typography variant="subtitle1" fontWeight="700">Identify your waste</Typography>
                  <Typography variant="caption" color="text.secondary">Drag and drop or click to upload</Typography>
                </Box>
              </Grow>
            )}

            {/* PREVIEW AREA */}
            {preview && (
              <Box>
                <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                  <Box sx={{ position: 'relative' }}>
                    <Paper elevation={0} sx={{ 
                      borderRadius: 4, overflow: "hidden", border: '4px solid white',
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)", lineHeight: 0
                    }}>
                      <img src={preview} alt="preview" style={{ width: "100%", height: 280, objectFit: "cover" }} />
                    </Paper>
                    <IconButton 
                      onClick={removeImage}
                      sx={{ 
                        position: 'absolute', top: -10, right: -10, 
                        bgcolor: 'white', color: 'error.main', boxShadow: 2,
                        '&:hover': { bgcolor: '#fff5f5' }
                      }}
                    >
                      <FaTrashAlt size={14} />
                    </IconButton>
                  </Box>
                </Zoom>

                <Fade in={!result && !loading}>
                  <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
                    <Button
                      onClick={classifyWaste}
                      variant="contained"
                      fullWidth
                      startIcon={<FaRecycle />}
                      sx={{
                        bgcolor: themeColor,
                        borderRadius: 3,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: '1rem',
                        '&:hover': { bgcolor: '#1b5e20', boxShadow: '0 8px 20px rgba(46,125,50,0.4)' }
                      }}
                    >
                      Classify Material
                    </Button>
                  </Stack>
                </Fade>
              </Box>
            )}

            {/* LOADING STATE */}
            {loading && (
              <Box mt={4} textAlign="center">
                <CircularProgress size={32} sx={{ color: themeColor, mb: 2 }} />
                <Typography variant="body2" fontWeight="600" color="text.secondary">Analyzing chemical composition...</Typography>
              </Box>
            )}

            {/* RESULTS */}
            {result && (
              <Grow in={!!result}>
                <Box mt={4}>
                  <Divider sx={{ mb: 3 }}>
                    <Typography variant="caption" sx={{ px: 2, color: 'text.disabled', fontWeight: 800 }}>RESULT</Typography>
                  </Divider>
                  <Paper sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: '#f1f8e9',
                    border: '1px solid rgba(46, 125, 50, 0.1)',
                    position: 'relative'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <FaCheckCircle color={themeColor} />
                      <Typography variant="h6" fontWeight="800" color="#1b5e20">
                        {result.includes("Recyclable") ? "Recyclable" : 
                         result.includes("Organic") ? "Organic Waste" : "Landfill"}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#2e7d32', lineHeight: 1.6 }}>
                      {result}
                    </Typography>
                  </Paper>
                  <Button 
                    fullWidth 
                    variant="text" 
                    onClick={removeImage} 
                    sx={{ mt: 2, color: 'text.disabled', textTransform: 'none', fontWeight: 600 }}
                  >
                    Start New Scan
                  </Button>
                </Box>
              </Grow>
            )}
          </CardContent>
        </Card>

        {/* BOTTOM NOTIFICATION */}
        <Fade in={uploadedMsg}>
          <Box sx={{ 
            position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
            bgcolor: 'black', color: 'white', px: 3, py: 1, borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 1, boxShadow: 10
          }}>
            <FaCheckCircle color="#81c784" size={14} />
            <Typography variant="caption" fontWeight="600">Image Uploaded</Typography>
          </Box>
        </Fade>

      </Container>
    </Box>
  );
};

export default WasteClassifier;
