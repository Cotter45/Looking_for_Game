import { useEffect, useState } from 'react';
import NavBar from './components/navbar';
import Router from './context/router';
import { currentUser, restoreUser } from './context/store/session';
import { useAppDispatch, useAppSelector } from './context/store/utils/store_utils';

import './index.css';

function App() {
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);

  const user = useAppSelector(state => state.session.user);

  useEffect(() => {
    if (loaded) return;
    dispatch(restoreUser());
    console.log(user, "USER")
    setLoaded(true);
  }, [loaded, dispatch])

  return (
    <>
      <NavBar />
      <Router />
    </>
  );
}

export default App;
