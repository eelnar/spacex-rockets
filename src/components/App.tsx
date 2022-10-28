import { useEffect, useState } from 'react';
import '../App.css';
import { Rocket } from '../models/types';
import { getRockets } from '../services/api/spacex';
import RocketList from './RocketList';
import AddNewRocket from './AddNewRocket';
import Snackbar from '@mui/material/Snackbar';

interface Notification {
  type?: 'success' | 'error'
  message?: string
}

function App() {
  const [rocketList, setRocketList] = useState<Rocket[]>([]);
  const [notification, setNotification] = useState<Notification | null>();

  useEffect(() => {
    async function load() {
      let result = await getRockets(setNotification);

      setRocketList(result);
    };

    load();
  }, []);

  const handleAddNewRocket = (rocket: Rocket) => {
    const tmpList = [rocket].concat(rocketList);
    setRocketList(tmpList);
    setNotification({ type: 'success', message: 'Rocket successfully added' });
  };

  const handleRocketUpdate = (update: Rocket) => {
    const newList = rocketList.map((rocket: Rocket) => {
      if (rocket.id === update.id) return update;
      return rocket;
    });

    setRocketList(newList);
    setNotification({ type: 'success', message: 'Rocket successfully updated' });
  };

  const handleRocketDelete = (id: string) => {
    setRocketList(rocketList.filter(e => e.id !== id));
    setNotification({ type: 'success', message: 'Rocket successfully deleted' });
  };

  return (
    <div className="App">
      <div className='app-container'>
        <img alt="name-logo" className='app-name-logo' src={require('../images/name-logo.png')} />
        <div className='app-header'>
          <h3>SpaceX rocket list</h3>
          <AddNewRocket handleAddNewRocket={handleAddNewRocket} />
        </div>
        <RocketList rocketList={rocketList} handleUpdateRocket={handleRocketUpdate} handleDeleteRocket={handleRocketDelete} />
      </div>

      {
        notification &&
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setNotification(null)}>
          <div className={'notification-message' + (notification.type === 'error' ? ' error' : '')}>{notification.message || ''}</div>
        </Snackbar>
      }
    </div>
  );
}

export default App;
