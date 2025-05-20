import React from 'react';
import { Box, Text, Stat, StatLabel, StatNumber, SimpleGrid, Divider } from '@chakra-ui/react';

interface SummaryPanelProps {
  totalItemsCost: number;
  totalOtherCosts: number;
  totalProjectCost: number;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({ 
  totalItemsCost, 
  totalOtherCosts, 
  totalProjectCost 
}) => {
  return (
    <Box 
      mb={8} 
      p={4}
      maxW="1200px"
      mx="auto"
      borderWidth="2px" 
      borderColor="purple.200" 
      borderRadius="xl" 
      boxShadow="lg" 
      bg="purple.50" // Light purple background
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'xl',
        bgGradient: 'linear(to-br, purple.50, blue.50)', // Subtle gradient overlay
        zIndex: 0,
      }}
    >
      {/* Header Section */}
      <Box textAlign="center" mb={6} position="relative" zIndex={1}>
        <Text 
          fontSize="2xl" 
          fontWeight="bold" 
          mb={2} 
          bgGradient="linear(to-r, purple.600, blue.600)" // Primary gradient
          bgClip="text"
        >
          Project Cost Summary
        </Text>
        <Text color="gray.600" fontSize="sm">
          Overview of all project expenses and total budget
        </Text>
      </Box>

      <Divider borderColor="purple.100" mb={6} />

      {/* Stats Grid */}
      <SimpleGrid 
        columns={{ base: 1, md: 3 }} 
        spacing={4} 
        position="relative" 
        zIndex={1}
      >
        {/* Total Items Cost */}
        <Box 
          p={4} 
          borderWidth="1px" 
          borderColor="purple.100" 
          borderRadius="lg"
          bg="white"
          textAlign="center"
        >
          <Stat>
            <StatLabel fontSize="sm" color="gray.600" mb={1}>
              Items Cost
            </StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="blue.600">
              Rs.{totalItemsCost.toFixed(2)}
            </StatNumber>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Total cost of all items
            </Text>
          </Stat>
        </Box>

        {/* Total Other Costs */}
        <Box 
          p={4} 
          borderWidth="1px" 
          borderColor="blue.100" 
          borderRadius="lg"
          bg="white"
          textAlign="center"
        >
          <Stat>
            <StatLabel fontSize="sm" color="gray.600" mb={1}>
              Other Costs
            </StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="purple.600">
              Rs.{totalOtherCosts.toFixed(2)}
            </StatNumber>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Additional expenses & fees
            </Text>
          </Stat>
        </Box>

        {/* Total Project Cost */}
        <Box 
          p={4} 
          borderWidth="1px" 
          borderColor="purple.200" 
          borderRadius="lg"
          bg="white"
          textAlign="center"
          boxShadow="inner"
        >
          <Stat>
            <StatLabel fontSize="sm" color="gray.600" mb={1}>
              Total Project Cost
            </StatLabel>
            <StatNumber 
              fontSize="2xl" 
              fontWeight="bold" 
              bgGradient="linear(to-r, purple.600, blue.600)" 
              bgClip="text"
            >
              Rs.{totalProjectCost.toFixed(2)}
            </StatNumber>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Combined total budget
            </Text>
          </Stat>
        </Box>
      </SimpleGrid>

      <Divider borderColor="purple.100" mt={6} />
      
      {/* Footer Note */}
      <Text fontSize="xs" color="gray.600" textAlign="center" mt={4}>
        All amounts in USD | Updated in real-time
      </Text>
    </Box>
  );
};

export default SummaryPanel;