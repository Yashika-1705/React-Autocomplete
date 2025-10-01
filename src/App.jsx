import { useState } from "react";
import {
  TextField,
  Autocomplete,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";

const CustomPopper = styled(Popper)({
  width: "auto !important",
  minWidth: "100%", // ensures at least the width of input
});

function PurchaseRequestForm() {
  const [formData, setFormData] = useState({
    requesterName: "",
    department: "",
    material: "",
    quantity: ""
  });

  const [materialOptions, setMaterialOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const fetchMaterials = async (value) => {
    if (!value || value.length < 3) {
      setMaterialOptions([]);
      return;
    }
    const res = await fetch(
      `http://127.0.0.1:5000/autocomplete/materials?q=${value}`
    );
    const data = await res.json();
    setMaterialOptions(data);
  };

  const fetchDepartments = async (value) => {
    if (!value || value.length < 3) {
      setDepartmentOptions([]);
      return;
    }
    const res = await fetch(
      `http://127.0.0.1:5000/autocomplete/departments?q=${value}`
    );
    const data = await res.json();
    setDepartmentOptions(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("✅ Purchase request submitted!");
  };

  const handleReset = () => {
    setFormData({
      requesterName: "",
      department: "",
      material: "",
      quantity: ""
    });
    setMaterialOptions([]);
    setDepartmentOptions([]);
  };

  return (
    <Paper
      elevation={5}
      sx={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "12px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Purchase Request Form
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box 
        component="form" 
        sx={{

          minHeight: "100vh",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxSizing: "border-box",
        }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          {/* Section 1: Requester Info */}
          <Grid item xs={12}>
            <Typography variant="h6">Requester Information</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Requester Name"
              value={formData.requesterName}
              onChange={(e) =>
                setFormData({ ...formData, requesterName: e.target.value })
              }
              required
            />
          </Grid>


          <Grid item xs={12}>
            <Grid item xs={12}>
              <Typography variant="h6">Department</Typography>
            </Grid>
            <Autocomplete
              freeSolo
              options={departmentOptions}
              inputValue={formData.department}
              onInputChange={(e, value) => {
                setFormData({ ...formData, department: value });
                fetchDepartments(value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Department" required fullWidth sx={{ width: 300}} />
              )}
            />
          </Grid>

          <Divider flexItem sx={{ my: 2, width: "100%" }} />

          {/* Section 2: Order Details */}
          
          <Grid item xs={12}>
            <Typography variant="h6">Material Name</Typography>
          </Grid>

          <Grid item xs={12}>
            
            <Autocomplete
              freeSolo
              options={materialOptions}
              inputValue={formData.material}
              onInputChange={(e, value) => {
                setFormData({ ...formData, material: value });
                fetchMaterials(value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Material Name" required fullWidth sx={{ width: 300}}/>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="number"
              fullWidth
              label="Quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
              inputProps={{ min: 1 }}
            />
          </Grid>
          {/* Action Buttons */}
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit Request
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default PurchaseRequestForm;
