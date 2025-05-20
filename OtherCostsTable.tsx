import React, { useState, useMemo } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td,
  IconButton, Input, Select, Box, Flex
} from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../src/store';
import { removeOtherCost, updateOtherCost } from '../src/store/otherCostsSlice';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import OtherCostFormModal from './OtherCostFormModal';

interface OtherCost {
  id: string;
  description: string;
  amount: number;
}

const OtherCostsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { otherCosts } = useAppSelector((state) => state.otherCosts);

  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState<'description' | 'amount'>('description');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCost, setSelectedCost] = useState<OtherCost | null>(null);

  const handleDelete = (id: string) => {
    dispatch(removeOtherCost(id));
  };

  const handleEditClick = (cost: OtherCost) => {
    setSelectedCost(cost);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedCost(null);
  };

  const handleSave = (updatedCost: OtherCost) => {
    if (!updatedCost.id) {
      // Handle case where id is undefined
      return;
    }
    dispatch(updateOtherCost(updatedCost));
    handleModalClose();
  };

  const filteredAndSortedCosts = useMemo(() => {
    let filtered = otherCosts.filter(cost =>
      cost.description.toLowerCase().includes(filterText.toLowerCase())
    );
    filtered.sort((a, b) => {
      let compare = 0;
      if (sortKey === 'description') {
        compare = a.description.localeCompare(b.description);
      } else if (sortKey === 'amount') {
        compare = a.amount - b.amount;
      }
      return sortOrder === 'asc' ? compare : -compare;
    });
    return filtered;
  }, [otherCosts, filterText, sortKey, sortOrder]);

  return (
    <>
      <Box textAlign="center" fontSize="3xl" fontWeight="bold" mb={6} color="white" letterSpacing="wide">
        Other Costs Table
      </Box>
      <Box mb={6} bg="#1a202c" p={4} rounded="xl" boxShadow="lg" color="black">
        <Flex mb={4} gap={4} flexWrap="wrap" alignItems="center">
          <Input
            placeholder="Filter by description"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            maxW="200px"
            bg="#2d3748"
            color="black"
            _placeholder={{ color: '#a0aec0' }}
            borderColor="#4a5568"
          />
          <Select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as 'description' | 'amount')}
            maxW="150px"
            bg="#2d3748"
            color="black"
            borderColor="#4a5568"
          >
            <option value="description">Sort by Description</option>
            <option value="amount">Sort by Amount</option>
          </Select>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            maxW="150px"
            bg="#2d3748"
            color="black"
            borderColor="#4a5568"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Flex>
        <Box overflowX="auto">
          <Table variant="simple" size="sm" className="other-costs-table" colorScheme="gray">
            <Thead bg="#2d3748">
              <Tr>
                <Th color="#edf2f7">Description</Th>
                <Th isNumeric color="#edf2f7">Amount</Th>
                <Th color="#edf2f7">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredAndSortedCosts.map((cost) => (
                <Tr key={cost.id} _hover={{ bg: "#2a4365" }}>
                  <Td>{cost.description}</Td>
                  <Td isNumeric>{cost.amount}</Td>
                  <Td>
                    <IconButton
                      aria-label="Edit other cost"
                      icon={<EditIcon />}
                      size="sm"
                      mr={2}
                      variant="outline"
                      colorScheme="blue"
                      borderColor="#4a5568"
                      onClick={() => handleEditClick(cost)}
                    />
                    <IconButton
                      aria-label="Delete other cost"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="solid"
                      onClick={() => handleDelete(cost.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        {isEditModalOpen && selectedCost && (
          <OtherCostFormModal
            isOpen={isEditModalOpen}
            onClose={handleModalClose}
            onSave={handleSave}
            initialData={selectedCost}
          />
        )}
      </Box>
    </>
  );
};

export default OtherCostsTable;
