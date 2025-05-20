import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { setUser } from './store/authSlice';
import { auth } from './firebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { Flex, Spinner } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import { Box } from '@chakra-ui/react';

import './colorful-styles.css';

// To (remove file extensions):
import Auth from '../components/Auth';
import CostManager from '../components/CostManager';

export default function App() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return user ? (
    <Flex>
      <Sidebar />
      <Box flex="1" ml="40em">
        <CostManager />
      </Box>
    </Flex>
  ) : (
    <Auth />
  );
}
