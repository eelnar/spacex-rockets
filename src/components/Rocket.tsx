import React from 'react';
import { RocketActionProps } from '../models/types';
import { Rocket } from '../models/types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import { Menu, MenuItem } from '@mui/material';
import UpdateRocket from './UpdateRocket';

const RocketComponent = (props: RocketActionProps) => {
  const { rocket } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleRocketUpdate = (rocket: Rocket) => {
    props.handleUpdateRocket(rocket);
    handleCloseMenu();
  }

  const handleRocketDelete = (id: string) => {
    props.handleDeleteRocket(id);
    handleCloseMenu();
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#303e5b', textTransform: 'uppercase' }} aria-label="recipe">
            {rocket?.name.charAt(0) + rocket?.name.charAt(rocket?.name.length - 1)}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" aria-haspopup="true" onClick={handleMenuButtonClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              open={openMenu}
              anchorEl={anchorEl}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <UpdateRocket rocket={rocket} handleUpdateRocket={handleRocketUpdate} />
              <MenuItem className='menu-item-delete' onClick={() => handleRocketDelete(rocket?.id)}>Delete</MenuItem>
            </Menu>
          </>
        }
        title={rocket?.name + ' ' + rocket?.type}
      />
      <CardContent>
        <p>{'Cost per launch: $' + rocket?.cost_per_launch / 1000000 + 'M'}</p>
        <p>{'Number of stages: ' + rocket?.stages}</p>
      </CardContent>
    </Card>
  );
};

export default RocketComponent;
