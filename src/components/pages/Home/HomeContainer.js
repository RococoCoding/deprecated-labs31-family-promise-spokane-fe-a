import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import RenderHomePage from './RenderHomePage';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { setCurrentUser } from '../../../state/actions/index';
import { useDispatch, useSelector } from 'react-redux';

function HomeContainer({ LoadingComponent }) {
  const dispatch = useDispatch();
  const LOGGED_IN = useSelector(state => state.LOGGED_IN);
  const LOADING = useSelector(state => state.LOADING);
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    if (!LOGGED_IN) {
      dispatch(setCurrentUser());
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  if (LOADING || !userInfo) {
    return (
      <div className="container">
        <LoadingComponent />
      </div>
    );
  }
  return (
    <>
      <RenderHomePage userInfo={userInfo} authService={authService} />
    </>
  );
}

export default HomeContainer;
