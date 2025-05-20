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

interface OtherCostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cost: { id?: string; description: string; amount: number }) => void;
  initialData?: { id?: string; description: string; amount: number };
}

const OtherCostFormModal: React.FC<OtherCostFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setDescription(initialData.description);
        setAmount(initialData.amount.toFixed(2));
      } else {
        setDescription('');
        setAmount('');
      }
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    const numericAmount = parseFloat(amount.replace(/,/g, '.'));

    if (!description.trim()) {
      toast({ title: 'Description is required', status: 'error', duration: 2000 });
      return;
    }

    if (isNaN(numericAmount)) {
      toast({ title: 'Invalid amount', status: 'error', duration: 2000 });
      return;
    }

    if (numericAmount < 0) {
      toast({ title: 'Amount cannot be negative', status: 'error', duration: 2000 });
      return;
    }

    onSave({
      id: initialData?.id,
      description: description.trim(),
      amount: parseFloat(numericAmount.toFixed(2)),
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={() => {
        setDescription('');
        setAmount('');
      }}
      size="md"
      motionPreset="slideInRight"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent borderRadius="xl" mx={4} maxW="450px">
        <ModalHeader fontSize="xl" fontWeight="600">
          {initialData ? 'Edit Other Cost' : 'Add Other Cost'}
        </ModalHeader>
        <ModalCloseButton _hover={{ bg: 'transparent' }} _focus={{ boxShadow: 'none' }} color="black" />

        <ModalBody pb={4}>
          <FormControl isRequired mb={4}>
            <FormLabel color="black">Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter cost description"
              autoFocus
              focusBorderColor="blue.400"
              color="black"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel color="black">Amount</FormLabel>
            <NumberInput
              value={amount}
              min={0}
              precision={2}
              onChange={(valueString) => setAmount(valueString)}
              onBlur={() => {
                const numericValue = parseFloat(amount.replace(/,/g, '.'));
                setAmount(isNaN(numericValue) ? '' : numericValue.toFixed(2));
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

export default OtherCostFormModal;
