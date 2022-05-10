import { useEffect, useState } from 'react';
import NavBar from './components/navbar';
import Router from './context/router';
import { restoreUser } from './context/store/session';
import { useAppDispatch } from './context/store/utils/store_utils';

import './index.css';
import { restoreTheme } from './util/theme';

function App() {
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    dispatch(restoreUser());
    restoreTheme();
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
