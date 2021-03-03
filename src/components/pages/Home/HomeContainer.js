import React, { useEffect } from 'react';
import RenderHomePage from './RenderHomePage';
import { setCurrentUser } from '../../../state/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import StaffSig from '../IntakePacketContent/ByGuests/ClientRelease/ClientReleaseStaffSig';

function HomeContainer({ LoadingComponent }) {
  const dispatch = useDispatch();
  const LOGGED_IN = useSelector(state => state.LOGGED_IN);
  const LOADING = useSelector(state => state.LOADING);
  const lastLocation = useLastLocation();
  // eslint-disable-next-line

  useEffect(() => {
    if (!LOGGED_IN) {
      dispatch(setCurrentUser());
    }
  }, []);

  if (LOADING) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  } else if (lastLocation && lastLocation.pathname === '/staffsig') {
    return <StaffSig />;
  } else {
    return (
      <>
        <RenderHomePage />
      </>
    );
  }
}

export default HomeContainer;
