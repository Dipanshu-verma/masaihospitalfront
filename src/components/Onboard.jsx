import React, { useState } from "react";

import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Container,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
 
import { useDispatch } from "react-redux";
import { OnboardDoctor } from "../redux/action";
import { Navigate, useNavigate } from "react-router-dom";

const specialties = [
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Psychiatrist",
];
const onboardData = [
  {
    type: "text",
    label: "Name",
    name: "name",
  },
  {
    type: "text",
    label: "Image URL",
    name: "image",
  },
  {
    type: "text",
    label: "Experience",
    name: "experience",
  },
  {
    type: "text",
    label: "Location",
    name: "location",
  },
  {
    label: "Date",
    name: "date",
    type: "date",
  },
  {
    label: "Slots",
    name: "slots",
    type: "number",
  },
  { label: "Fee", name: "fee", type: "number" },
];
const Onboard = () => {

  const [appoinmentForm, setappoinmentForm] = useState({
    name: "",
    image: "",
    specialization: "",
    experience: "",
    location: "",
    date: "",
    slots: "",
    fee: "",
  });


  const handleAppoinementChange = (e) => {
    setappoinmentForm({ ...appoinmentForm, [e.target.name]: e.target.value });
  };
  const naviagte = useNavigate();

  const dispatch = useDispatch();

  const handleAppoinemntSubmit = async (e) => {
   
    e.preventDefault();

    await dispatch(OnboardDoctor(appoinmentForm));

   setappoinmentForm({
    name: "",
    image: "",
    specialization: "",
    experience: "",
    location: "",
    date: "",
    slots: "",
    fee: "",
   })
    naviagte("/dashboard");
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
        <Typography component="h1" variant="h5">
          Onboard Doctor
        </Typography>
        <form onSubmit={handleAppoinemntSubmit} style={{ marginTop: "20px" }}>
          <Grid container spacing={2}>

          {
            onboardData.map((elm)=>(
              
              <Grid item xs={12} sm={6}>
              <TextField
              type={elm.type}
                label={elm.label}
                name={elm.name}
                fullWidth
                value={appoinmentForm[elm.name]}
                onChange={handleAppoinementChange}
                required
              />
            </Grid>
            ))
          }
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Specialization</InputLabel>
                <Select
                  name="specialization"
                  value={appoinmentForm.specialization}
                  onChange={handleAppoinementChange}
                  required
                >
                  {specialties.map((specialty) => (
                    <MenuItem key={specialty} value={specialty}>
                      {specialty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Onboard;
