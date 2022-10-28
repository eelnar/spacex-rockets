import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { AddNewRocketProps } from '../models/types';
import { v4 as uuidv4 } from 'uuid';

const AddNewRocket = (props: AddNewRocketProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [stages, setStages] = useState<number>();
  const [stagesError, setStagesError] = useState<boolean>(false);
  const [costPerLaunch, setCostPerLaunch] = useState<number>();
  const [costPerLaunchError, setCostPerLaunchError] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [typeError, setTypeError] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name) return setNameError(true);
    if (!stages) return setStagesError(true);
    if (!costPerLaunch) return setCostPerLaunchError(true);
    if (!type) return setTypeError(true);

    props.handleAddNewRocket({
      id: uuidv4(),
      name: name,
      stages: stages!,
      cost_per_launch: costPerLaunch!,
      type: type
    });
    setShowModal(false);
  };

  const handleCloseModa = () => {
    setName('');
    setNameError(false);
    setStages(undefined);
    setStagesError(false);
    setCostPerLaunch(undefined);
    setCostPerLaunchError(false);
    setType('');
    setTypeError(false);
    setShowModal(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setShowModal(true)}>+ Add new rocket</Button>
      <Modal
        open={showModal}
        onClose={handleCloseModa}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='app-new-rocket-modal'>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => { setName(e.target.value); setNameError(false) }}
              sx={{ marginBottom: 3 }}
              label="Name"
              variant="outlined"
              fullWidth
              required
              error={nameError}
              helperText={nameError ? 'Name is required' : ''}
            />
            <TextField
              onChange={(e) => { setStages(+e.target.value); setStagesError(false) }}
              sx={{ marginBottom: 3 }}
              label="Stages"
              variant="outlined"
              fullWidth
              required
              error={stagesError}
              helperText={stagesError ? "Stage count can't be zero" : ''}
            />
            <TextField
              onChange={(e) => { setCostPerLaunch(+e.target.value); setCostPerLaunchError(false) }}
              sx={{ marginBottom: 3 }}
              label="Cost per stage"
              variant="outlined"
              fullWidth
              required
              error={costPerLaunchError}
              helperText={costPerLaunchError ? "Cost per launch can't be zero" : ''}
            />
            <TextField
              onChange={(e) => { setType(e.target.value); setTypeError(false) }}
              sx={{ marginBottom: 3 }}
              label="Type"
              variant="outlined"
              fullWidth
              required
              error={typeError}
              helperText={typeError ? "Type is required" : ''}
            />
            <Button type="submit" variant="contained" fullWidth>
              Add rocket
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );

};

export default AddNewRocket;
