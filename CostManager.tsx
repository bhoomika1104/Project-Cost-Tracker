/**
 * CostManager component is the main page for managing project costs.
 * It shows user info, buttons to add items and other costs, and displays summary and tables.
 * 
 * Uses Chakra UI for layout and styling.
 * Uses Redux for state management of user, items, and other costs.
 * 
 * Buttons have icons for better UX.
 * Modals are used for adding/editing items and other costs.
 */

import React, { useState } from 'react';
import { Box, Heading, Button, Flex } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../src/store';
import { auth } from '../src/firebaseAuth';
import { signOut } from 'firebase/auth';
import { setUser } from '../src/store/authSlice';
import ItemsTable from './ItemsTable';
import OtherCostsTable from './OtherCostsTable';
import SummaryPanel from './SummaryPanel';
import ItemFormModal from './ItemFormModal';
import OtherCostFormModal from './OtherCostFormModal';

import { addItem, updateItem } from '../src/store/itemsSlice';
import { addOtherCost, updateOtherCost } from '../src/store/otherCostsSlice';

import { FiLogOut, FiPlusCircle, FiDollarSign } from 'react-icons/fi';

const CostManager = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.items);
  const { otherCosts: costs } = useAppSelector((state) => state.otherCosts);

  // State for controlling Item modal visibility and editing item data
  const [isItemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ id: string; name: string; cost: number } | null>(null);

  // State for controlling Other Cost modal visibility and editing cost data
  const [isOtherCostModalOpen, setOtherCostModalOpen] = useState(false);
  const [editingOtherCost, setEditingOtherCost] = useState<{ id: string; description: string; amount: number } | null>(null);

  // Logout handler using Firebase auth and Redux to clear user state
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Calculate total costs for items and other costs, and overall project total
  const totalItems = items.reduce((sum, item) => sum + item.cost, 0);
  const totalCosts = costs.reduce((sum, cost) => sum + cost.amount, 0);
  const projectTotal = totalItems + totalCosts;

  // Open Add Item modal with no editing item
  const openAddItemModal = () => {
    setEditingItem(null);
    setItemModalOpen(true);
  };

  // Open Edit Item modal with selected item data
  const openEditItemModal = (item: { id?: string; name: string; cost: number }) => {
    setEditingItem(item);
    setItemModalOpen(true);
  };

  // Close Item modal and clear editing item state
  const closeItemModal = () => {
    setItemModalOpen(false);
    setEditingItem(null);
  };

  // Open Add Other Cost modal with no editing cost
  const openAddOtherCostModal = () => {
    setEditingOtherCost(null);
    setOtherCostModalOpen(true);
  };

  // Open Edit Other Cost modal with selected cost data
  const openEditOtherCostModal = (cost: { id?: string; description: string; amount: number }) => {
    setEditingOtherCost(cost);
    setOtherCostModalOpen(true);
  };

  // Close Other Cost modal and clear editing cost state
  const closeOtherCostModal = () => {
    setOtherCostModalOpen(false);
    setEditingOtherCost(null);
  };

  // TODO: Add save handlers to dispatch add/update actions to Redux store

  return (
    <Box 
      p={4} 
      maxWidth="1800px" 
      // Changed margin property
      marginRight="3em"
      marginY="0"
      minWidth="800px" 
    >
      <Flex justify="space-between" mb={6}>
        <Heading size="lg">Welcome, {user?.displayName || 'User'}!</Heading>
        <Button marginLeft="8em" colorScheme="red" onClick={handleLogout} leftIcon={<FiLogOut />}>
          Logout
        </Button>
      </Flex>

      <Button colorScheme="blue" mb={4} mr={2} onClick={openAddItemModal} leftIcon={<FiPlusCircle />}>
        Add Item
      </Button>
      <Button marginLeft="15em" marginBottom="20rem" colorScheme="blue" mb={4} onClick={openAddOtherCostModal} leftIcon={<FiDollarSign />}>
        Add Other Cost
      </Button><br></br><br></br><br></br>

      <SummaryPanel 
        totalItemsCost={totalItems}
        totalOtherCosts={totalCosts}
        totalProjectCost={projectTotal}
      /><br></br><br></br><br></br>

      <ItemsTable onEdit={openEditItemModal} />
      <OtherCostsTable onEdit={openEditOtherCostModal} />

      <ItemFormModal
        isOpen={isItemModalOpen}
        onClose={closeItemModal}
        onSave={(item) => {
          if (item.id) {
            dispatch(updateItem(item));
          } else {
            dispatch(addItem({ ...item, id: Date.now().toString() }));
          }
          closeItemModal();
        }}
        initialData={editingItem || undefined}
      />

      <OtherCostFormModal
        isOpen={isOtherCostModalOpen}
        onClose={closeOtherCostModal}
        onSave={(cost) => {
          if (cost.id) {
            dispatch(updateOtherCost(cost));
          } else {
            dispatch(addOtherCost({ ...cost, id: Date.now().toString() }));
          }
          closeOtherCostModal();
        }}
        initialData={editingOtherCost || undefined}
      />
    </Box>
  );
};

export default CostManager;
