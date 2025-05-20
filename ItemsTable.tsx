import React, { useState, useMemo } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td,
  IconButton, Input, Select, Box, Flex
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useAppSelector, useAppDispatch } from '../src/store';
import { removeItem } from '../src/store/itemsSlice';

interface Item {
  id: string;
  name: string;
  cost: number;
}

interface ItemsTableProps {
  onEdit: (item: Item) => void;
}

const ItemsTable: React.FC<ItemsTableProps> = ({ onEdit }) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.items);

  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'cost'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleDelete = (id: string) => {
    dispatch(removeItem(id));
  };

  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
    filtered.sort((a, b) => {
      let compare = 0;
      if (sortKey === 'name') {
        compare = a.name.localeCompare(b.name);
      } else if (sortKey === 'cost') {
        compare = a.cost - b.cost;
      }
      return sortOrder === 'asc' ? compare : -compare;
    });
    return filtered;
  }, [items, filterText, sortKey, sortOrder]);

  return (
    <>
      <Box textAlign="center" fontSize="3xl" fontWeight="bold" mb={6} color="white" letterSpacing="wide">
        Items Table
      </Box>
      <Box mb={6} bg="#1a202c" p={4} rounded="xl" boxShadow="lg" color="black" sx={{ 'input, label, textarea': { color: 'black !important' } }}>
        <Flex mb={4} gap={4} flexWrap="wrap" alignItems="center">
          <Input
            placeholder="Filter by name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            maxW="200px"
            bg="#2d3748"
            color="white"
            _placeholder={{ color: '#a0aec0' }}
            borderColor="#4a5568"
          />
          <Select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as 'name' | 'cost')}
            maxW="150px"
            bg="#2d3748"
            color="black"
            borderColor="#4a5568"
          >
            <option value="name" color="black">Sort by Name</option>
            <option value="cost" color="black">Sort by Cost</option>
          </Select>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            maxW="150px"
            bg="#2d3748"
            color="black"
            borderColor="#4a5568"
          >
            <option value="asc" color="black">Ascending</option>
            <option value="desc" color="black">Descending</option>
          </Select>
        </Flex>

        <Box overflowX="auto">
          <Table variant="simple" size="sm" colorScheme="gray">
            <Thead bg="#2d3748">
              <Tr>
                <Th color="black">Name</Th>
                <Th isNumeric color="black">Cost</Th>
                <Th color="black">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredAndSortedItems.map((item) => (
                <Tr key={item.id} _hover={{ bg: "#2a4365" }}>
                  <Td>{item.name}</Td>
                  <Td isNumeric>${item.cost.toFixed(2)}</Td>
                  <Td>
                    <Flex gap={2}>
                      <IconButton
                        aria-label="Edit item"
                        icon={<EditIcon />}
                        size="sm"
                        colorScheme="blue"
                        rounded="full"
                        variant="solid"
                        boxShadow="md"
                        onClick={() => onEdit(item)}
                      />
                      <IconButton
                        aria-label="Delete item"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        rounded="full"
                        variant="solid"
                        boxShadow="md"
                        onClick={() => handleDelete(item.id)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default ItemsTable;
