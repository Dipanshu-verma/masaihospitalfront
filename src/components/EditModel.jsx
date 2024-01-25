import React from "react";
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const specialties = [
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Psychiatrist",
];

const EditModel = ({
  handleopenEditModel,
  openEdit,
  editedDoctor,
  handleEdidDoctor,
  handleEditSubmit,
}) => {
  return (
    <Dialog open={openEdit} onClose={handleopenEditModel}>
      <DialogTitle>Edit Doctor Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          value={editedDoctor?.name}
          onChange={(e) => handleEdidDoctor("name", e.target.value)}
        />
        <TextField
          label="Image URL"
          fullWidth
          value={editedDoctor?.image}
          onChange={(e) => handleEdidDoctor("image", e.target.value)}
        />
       
        <TextField
          label="Location"
          fullWidth
          value={editedDoctor?.location}
          onChange={(e) => handleEdidDoctor("location", e.target.value)}
        />
       <TextField
          label="Experience"
          fullWidth
          value={editedDoctor?.experience}
          onChange={(e) => handleEdidDoctor("experience", e.target.value)}
        />

        <TextField
          label="Slots"
          type="number"
          fullWidth
          value={editedDoctor?.slots}
          onChange={(e) => handleEdidDoctor("slots", e.target.value)}
        />
          <TextField
          label="Date"
          type="date"
          fullWidth
          value={editedDoctor?.date}
          onChange={(e) => handleEdidDoctor("date", e.target.value)}
        />
        <TextField
          label="Fee"
          type="number"
          fullWidth
          value={editedDoctor?.fee}
          onChange={(e) => handleEdidDoctor("fee", e.target.value)}
        />

       <FormControl fullWidth>
          <InputLabel>Specialization</InputLabel>
          <Select
            value={editedDoctor?.specialization}
            onChange={(e) => handleEdidDoctor("specialization", e.target.value)}
          >
            {specialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleopenEditModel}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleEditSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModel;
