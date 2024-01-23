import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAppoint, GetAppointments, editAppointments } from '../redux/action.js';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const specialties = ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Psychiatrist'];

const Dashboard = () => {
    const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState({});
  const { doctors } = useSelector((store) => store);
  const [editedDoctor, setEditedDoctor] = useState(null);

  const handleEditChange = (field, value) => {
    setEditedDoctor((prev) => ({ ...prev, [field]: value }));
  };
  useEffect(() => {
    dispatch(GetAppointments());
  }, [dispatch]);

  const handleEditClick = (doctor) => {
    setEditedDoctor(doctor);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditedDoctor({});
  };

   
  const handleEditSubmit = async () => {
    
await dispatch(editAppointments(editedDoctor,editedDoctor._id))

    setEditModalOpen(false);
  };
 
  const  Deletesubmit = async (id) => {
    
    await dispatch(DeleteAppoint(id))
    dispatch(GetAppointments());
        
      };
     

   

  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Doctor Dashboard
      </Typography>

      {/* Filter and Search Section */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Filter by Specialization</InputLabel>
            <Select>
              {/* Add options dynamically based on unique specializations in appointments */}
              <MenuItem value="cardiologist">Cardiologist</MenuItem>
              <MenuItem value="dermatologist">Dermatologist</MenuItem>
              <MenuItem value="pediatrician">Pediatrician</MenuItem>
              <MenuItem value="psychiatrist">Psychiatrist</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Search by Doctor Name" fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>

      {/* Doctor Cards */}
      <Grid container spacing={3}>
        {doctors?.map((doctor) => (
          <Grid item key={doctor.id} xs={12} sm={6} md={4}>
            <Card>
              {/* Display Image if available */}
              {doctor.image && (
                <CardMedia
                  component="img"
                  alt={doctor.name}
                  height="140"
                  image={doctor.image}
                  style={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6">{doctor.name}</Typography>
                <Typography color="textSecondary">{doctor.specialization}</Typography>
                <Typography color="textSecondary">Experience: {doctor.experience} years</Typography>
                <Typography color="textSecondary">Location: {doctor.location}</Typography>
                <Typography color="textSecondary">Date: {doctor.date}</Typography>
                <Typography color="textSecondary">Slots: {doctor.slots}</Typography>
                <Typography variant="h6" style={{ marginTop: '10px' }}>
                  Fee: ${doctor.fee}
                </Typography>
                {/* Add Edit and Delete buttons here */}
                <Button variant="outlined" color="primary" style={{ marginRight: '10px' }}    onClick={() => handleEditClick(doctor)}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={()=>Deletesubmit(doctor._id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={editModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Edit Doctor Details</DialogTitle>
        <DialogContent>
  {/* Editable Fields */}
  <TextField
    label="Name"
    fullWidth
    value={editedDoctor?.name}
    onChange={(e) => handleEditChange('name', e.target.value)}
  />
  <TextField
    label="Image URL"
    fullWidth
    value={editedDoctor?.image}
    onChange={(e) => handleEditChange('image', e.target.value)}
  />
  <FormControl fullWidth>
    <InputLabel>Specialization</InputLabel>
    <Select
      value={editedDoctor?.specialization}
      onChange={(e) => handleEditChange('specialization', e.target.value)}
    >
      {specialties.map((specialty) => (
        <MenuItem key={specialty} value={specialty}>
          {specialty}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <TextField
    label="Experience"
    fullWidth
    value={editedDoctor?.experience}
    onChange={(e) => handleEditChange('experience', e.target.value)}
  />
  <TextField
    label="Location"
    fullWidth
    value={editedDoctor?.location}
    onChange={(e) => handleEditChange('location', e.target.value)}
  />
  <TextField
    label="Date"
    type="date"
    fullWidth
    value={editedDoctor?.date}
    onChange={(e) => handleEditChange('date', e.target.value)}
  />
  <TextField
    label="Slots"
    type="number"
    fullWidth
    value={editedDoctor?.slots}
    onChange={(e) => handleEditChange('slots', e.target.value)}
  />
  <TextField
    label="Fee"
    type="number"
    fullWidth
    value={editedDoctor?.fee}
    onChange={(e) => handleEditChange('fee', e.target.value)}
  />
</DialogContent>
        <DialogActions>
          <Button onClick={handleEditModalClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
