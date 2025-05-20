import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
} from '@chakra-ui/react';

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: { id?: string; name: string; cost: number }) => void;
  initialData?: { id?: string; name: string; cost: number };
}

const ItemFormModal: React.FC<ItemFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData 
}) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const toast = useToast();

  // Reset form state when modal opens or initial data changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setCost(initialData.cost.toFixed(2));
      } else {
        setName('');
        setCost('');
      }
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    const numericCost = parseFloat(cost.replace(/,/g, '.'));
    
    if (!name.trim()) {
      toast({ title: 'Name is required', status: 'error', duration: 2000 });
      return;
    }
    
    if (isNaN(numericCost)) {
      toast({ title: 'Invalid cost amount', status: 'error', duration: 2000 });
      return;
    }
    
    if (numericCost < 0) {
      toast({ title: 'Cost cannot be negative', status: 'error', duration: 2000 });
      return;
    }

    onSave({ 
      id: initialData?.id, 
      name: name.trim(), 
      cost: parseFloat(numericCost.toFixed(2))
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={() => {
        setName('');
        setCost('');
      }}
      size="md"
      motionPreset="slideInRight"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent borderRadius="xl" mx={4} maxW="450px">
        <ModalHeader fontSize="xl" fontWeight="600">
          {initialData ? 'Edit Item' : 'Add New Item'}
        </ModalHeader>
        <ModalCloseButton _hover={{ bg: 'transparent' }} _focus={{ boxShadow: 'none' }} color="black" />

        <ModalBody pb={4}>
          <FormControl isRequired mb={4}>
            <FormLabel color="black">Item Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              autoFocus
              focusBorderColor="blue.400"
              color="black"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel color="black">Cost</FormLabel>
            <NumberInput
              value={cost}
              min={0}
              precision={2}
              onChange={(valueString) => setCost(valueString)}
              onBlur={() => {
                const numericValue = parseFloat(cost.replace(/,/g, '.'));
                setCost(isNaN(numericValue) ? '' : numericValue.toFixed(2));
              }}
            >
              <NumberInputField
                placeholder="0.00"
                pattern="[0-9]*[.,]?[0-9]*"
                focusBorderColor="blue.400"
                color="black"
              />
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ItemFormModal;