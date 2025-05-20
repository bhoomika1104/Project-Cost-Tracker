import { Button, Flex, Heading, Box, Alert, AlertIcon, Text, List, ListItem, ListIcon, Divider, Link } from '@chakra-ui/react';
import { FaGoogle, FaChartLine, FaWallet, FaShieldAlt, FaMobileAlt } from 'react-icons/fa';
import { signInWithGoogle } from '../src/firebaseAuth';
import { useAppDispatch } from '../src/store';
import { setUser } from '../src/store/AuthSlice';
import { useState } from 'react';

export default function Auth() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  // Handle Google authentication 
  const handleLogin = async () => {
    setError(null);
    try {
      const result = await signInWithGoogle();
      dispatch(setUser(result.user));
    } catch (error) {
      setError("Failed to sign in. Please try again.");
      console.error("Authentication error:", error);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="pink">
      {/* Main authentication sec */}
      <Box p={8} maxW="2xl" w="full" mx={4} borderRadius="xl" boxShadow="xl" bg="white">
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          
          {/* Project featuressection */}
          <Box flex={1} pr={{ md: 8 }}>
            <Heading size="xl" mb={4} color="black">
              Project Cost Tracker
            </Heading>
            <Text fontSize="lg" mb={6} color="black">
              Streamline your project budgeting with AI-powered insights and real-time collaboration
            </Text>

            <Divider mb={6} borderColor="black" />

            <Heading size="md" mb={4} color="black">
              Key Features
            </Heading>
            <List spacing={3}>
              {/* Expense tracking feature */}
              <ListItem color="black">
                <ListIcon as={FaChartLine} color="black" />
                Real-time expense tracking and analytics
              </ListItem>
              
              {/* Project management c */}
              <ListItem color="black">
                <ListIcon as={FaWallet} color="black" />
                Multi-project budget management
              </ListItem>

              {/* Security assurance */}
              <ListItem color="black">
                <ListIcon as={FaShieldAlt} color="black" />
                Bank-grade security for your financial data
              </ListItem>

              {/* Mobile accessibility */}
              <ListItem color="black">
                <ListIcon as={FaMobileAlt} color="black" />
                Mobile-optimized interface
              </ListItem>
            </List>

            <Divider my={6} borderColor="black" />

            <Text fontSize="sm" color="black" textAlign="center">
              Trusted by teams at 500+ companies worldwide
            </Text>
          </Box>

          {/* Authentication section */}
          <Box flex={1} pl={{ md: 8 }} borderLeft={{ md: '1px solid' }} borderColor="black">
            <Heading size="lg" mb={6} textAlign="center" color="black">
              Get Started
            </Heading>

            {/* Error display for authentication failures */}
            {error && (
              <Alert status="error" mb={4} borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}

            {/* Google authentication  */}
            <Button onClick={handleLogin} colorScheme="black" variant="outline" width="full"
              size="lg" color="black" leftIcon={<FaGoogle />} mb={4} borderColor="black" _hover={{ bg: 'blue.700' }}>
              Continue with Google
            </Button>

            {/* Legal links */}
            <Text fontSize="sm" color="black" textAlign="center" mt={8}>
              By continuing, you agree to our{' '}
              <Link href="/terms" color="black" fontWeight="500" textDecoration="underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" color="black" fontWeight="500" textDecoration="underline">
                Privacy Policy
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}