import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteAppoint,
  GetAppointments,
  editAppointments,
} from "../redux/action.js";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CardMedia,
} from "@mui/material";

import EditModel from "./EditModel.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { doctors } = useSelector((store) => store);
  const [editedDoctor, setEditedDoctor] = useState(null);
  const [queryval, SetQueryVal] = useState({
    sort: "",
    specialization: "",
    search: "",
  });

  const handleEditChange = (field, value) => {
    setEditedDoctor((prev) => ({ ...prev, [field]: value }));
  };
  useEffect(() => {
    dispatch(GetAppointments(queryval));
  }, [dispatch, queryval]);

  const handleEditClick = (doctor) => {
    setEditedDoctor(doctor);
    setEditModalOpen(true);
  };

  const handleQueryChange = (type, value) => {
    SetQueryVal({ ...queryval, [type]: value });
  };
  console.log(queryval);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditedDoctor({});
  };

  const handleEditSubmit = async () => {
    await dispatch(editAppointments(editedDoctor, editedDoctor._id));

    setEditModalOpen(false);
  };

  const Deletesubmit = async (id) => {
    await dispatch(DeleteAppoint(id));
    dispatch(GetAppointments(queryval));
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Doctor Dashboard
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Filter by Specialization</InputLabel>
            <Select
              onChange={(e) =>
                handleQueryChange("specialization", e.target.value)
              }
            >
              <MenuItem value="Cardiologist">Cardiologist</MenuItem>
              <MenuItem value="Dermatologist">Dermatologist</MenuItem>
              <MenuItem value="Pediatrician">Pediatrician</MenuItem>
              <MenuItem value="Psychiatrist">Psychiatrist</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Sort by Date</InputLabel>
            <Select onChange={(e) => handleQueryChange("sort", e.target.value)}>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search by Doctor Name"
            fullWidth
            value={queryval.search}
            onChange={(e) => handleQueryChange("search", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {doctors?.map((doctor) => (
          <Grid item key={doctor.id} xs={12} sm={6} md={4}>
            <Card>
              {doctor.image && (
                <CardMedia
                  component="img"
                  alt={doctor.name}
                  height="140"
                  image={doctor.image}
                  style={{ objectFit: "cover" }}
                />
              )}

              <CardContent>
                <Typography variant="h6">{doctor.name}</Typography>
                <Typography color="textSecondary">
                  specialization:{doctor.specialization}
                </Typography>
                <Typography color="textSecondary">
                  Experience: {doctor.experience} years
                </Typography>
                <Typography color="textSecondary">
                  Location: {doctor.location}
                </Typography>
                <Typography color="textSecondary">
                  Date: {new Date(doctor.date).toLocaleString()}
                </Typography>
                <Typography color="textSecondary">
                  Slots: {doctor.slots}
                </Typography>
                <Typography variant="h6" style={{ marginTop: "10px" }}>
                  Fee: ${doctor.fee}
                </Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleEditClick(doctor)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => Deletesubmit(doctor._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <EditModel
        handleEditModalClose={() => handleEditModalClose()}
        editModalOpen={editModalOpen}
        editedDoctor={editedDoctor}
        handleEditChange={(type, value) => handleEditChange(type, value)}
        handleEditSubmit={() => handleEditSubmit()}
      />
    </Container>
  );
};

export default Dashboard;
