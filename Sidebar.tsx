import React, { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  IconButton,
  VStack,
  HStack,
  Switch,
  useColorMode,
  useColorModeValue,
  Collapse,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SettingsIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useAppSelector } from '../src/store';

const Sidebar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const user = useAppSelector((state) => state.auth.user); // Assuming auth slice has user info

  const [isOpen, setIsOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  // Type guard for user object properties
  const userName = (user && 'displayName' in user) ? user.displayName : 'Username';
  const userAvatar = (user && 'photoURL' in user) ? user.photoURL : '';
  const userEmail = (user && 'email' in user) ? user.email : 'user@example.com';

  return (
    <Box
      w={isOpen ? '20em' : '4.5em'}
      bg={sidebarBg}
      color={textColor}
      height="100vh"
      boxShadow="md"
      position="fixed"
      top="0"
      left="0"
      transition="width 0.3s ease"
      overflow="hidden"
      zIndex="1000"
    >
      <Flex align="center" justify="space-between" p={4} borderBottom="1px solid" borderColor={bgColor}>
        {isOpen && (
          <HStack spacing={4} align="center">
            <Avatar size="md" name={userName} src={userAvatar} />
            <VStack spacing={0} align="start">
              <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                {userName}
              </Text>
              <Text fontSize="sm" color="gray.500" noOfLines={1}>
                {userEmail}
              </Text>
            </VStack>
          </HStack>
        )}
        <IconButton
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          size="sm"
          onClick={toggleSidebar}
          variant="ghost"
        />
      </Flex>

      <Box p={4}>
        <Button
          leftIcon={<SettingsIcon />}
          variant="ghost"
          width="100%"
          justifyContent={isOpen ? 'flex-start' : 'center'}
          onClick={toggleSettings}
          rightIcon={isSettingsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          {isOpen && 'Settings'}
        </Button>
        <Collapse in={isSettingsOpen} animateOpacity>
          <VStack align="start" pl={isOpen ? 8 : 0} mt={2} spacing={4}>
            <Flex align="center" justify="space-between" width="100%">
              <Text>Dark Mode</Text>
              <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
            </Flex>
            <Button variant="outline" colorScheme="red" width="100%" onClick={() => alert('Logout clicked')}>
              Logout
            </Button>
          </VStack>
        </Collapse>
      </Box>
    </Box>
  );
};

export default Sidebar;
