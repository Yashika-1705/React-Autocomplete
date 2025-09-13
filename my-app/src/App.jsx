import { useState } from "react";
import {
  TextField,
  Autocomplete,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

function PurchaseRequestForm() {
  const [formData, setFormData] = useState({
    requesterName: "",
    department: "",
    material: "",
    quantity: "",
    justification: "",
  });

  // separate states for materials and departments
  const [materialOptions, setMaterialOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const fetchMaterials = async (value) => {
    if (!value) {
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
    if (!value) {
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
    alert("Purchase request submitted ✅");
  };

  return (
    <Paper
      elevation={4}
      sx={{ maxWidth: 1900, margin: "2rem auto", padding: "2rem" }}
    >
      <Typography variant="h5" gutterBottom>
        Purchase Request Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Requester Name */}
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

          {/* Department with Autocomplete */}
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              options={departmentOptions}
              inputValue={formData.department}
              onInputChange={(e, value) => {
                setFormData({ ...formData, department: value });
                fetchDepartments(value);
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Department" required fullWidth />
              )}
            />
          </Grid>

          {/* Material with Autocomplete */}
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
                <TextField {...params} label="Material Name" required fullWidth />
              )}
            />
          </Grid>

          {/* Quantity */}
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
            />
          </Grid>
          {/* Buttons */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() =>
                setFormData({
                  requesterName: "",
                  department: "",
                  material: "",
                  quantity: "",
                  justification: "",
                })
              }
            >
              Reset
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default PurchaseRequestForm;
