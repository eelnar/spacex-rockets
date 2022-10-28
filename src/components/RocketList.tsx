import { Rocket, RocketListProps } from '../models/types';
import RocketComponent from './Rocket';

const RocketList = (props: RocketListProps) => {
  const handleRocketUpdate = (rocket: Rocket) => props.handleUpdateRocket(rocket);

  const handleRocketDelete = (id: string) => props.handleDeleteRocket(id);

  return (
    <div className="rocket-list-container">
      {
        props.rocketList?.map((rocket: Rocket) => <div key={rocket?.name} className='rocket-container'>
          <RocketComponent rocket={rocket} handleUpdateRocket={handleRocketUpdate} handleDeleteRocket={handleRocketDelete} />
        </div>
        )}
    </div>
  );
};

export default RocketList;
