import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { UpdateRocketProps } from '../models/types';
import { MenuItem } from '@mui/material';


const UpdateRocket = (props: UpdateRocketProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>(props.rocket.name);
  const [stages, setStages] = useState<number>(props.rocket.stages);
  const [costPerLaunch, setCostPerLaunch] = useState<number>(props.rocket.cost_per_launch);
  const [type, setType] = useState<string>(props.rocket.type);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    props.handleUpdateRocket({
      id: props.rocket?.id,
      name: name,
      stages: stages!,
      cost_per_launch: costPerLaunch!,
      type: type
    });
  };

  const handleCloseModa = () => {
    setName(props.rocket.name);
    setStages(props.rocket.stages);
    setCostPerLaunch(props.rocket.cost_per_launch);
    setType(props.rocket.type);
    setShowModal(false);
  };

  return (
    <>
      <MenuItem onClick={() => setShowModal(true)}>Update</MenuItem>
      <Modal
        open={showModal}
        onClose={handleCloseModa}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='app-new-rocket-modal'>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: 3 }}
              label="Name"
              variant="outlined"
              fullWidth
              required
              error={!name}
              helperText={!name ? 'Name is required' : ''}
            />
            <TextField
              value={stages}
              onChange={(e) => setStages(+e.target.value)}
              sx={{ marginBottom: 3 }}
              label="Stages"
              variant="outlined"
              fullWidth
              required
              error={!stages}
              helperText={!stages ? "Stage count can't be zero" : ''}
            />
            <TextField
              value={costPerLaunch}
              onChange={(e) => setCostPerLaunch(+e.target.value)}
              sx={{ marginBottom: 3 }}
              label="Cost per stage"
              variant="outlined"
              fullWidth
              required
              error={!costPerLaunch}
              helperText={!costPerLaunch ? "Cost per launch can't be zero" : ''}
            />
            <TextField
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ marginBottom: 3 }}
              label="Type"
              variant="outlined"
              fullWidth
              required
              error={!type}
              helperText={!type ? "Type is required" : ''}
            />
            <Button type="submit" variant="contained" fullWidth disabled={!name || !stages || !costPerLaunch || !type}>
              Update rocket
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );

};

export default UpdateRocket;
