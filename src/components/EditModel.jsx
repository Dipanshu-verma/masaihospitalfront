import React from 'react'
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

  
const EditModel = ({handleEditModalClose,editModalOpen,editedDoctor,handleEditChange,handleEditSubmit}) => {
  return (
    <Dialog open={editModalOpen} onClose={handleEditModalClose}>
    <DialogTitle>Edit Doctor Details</DialogTitle>
    <DialogContent>

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
  )
}

export default EditModel