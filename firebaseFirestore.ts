import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const getUserItemsRef = (userId: string) => collection(db, "users", userId, "items");
export const getUserOtherCostsRef = (userId: string) => collection(db, "users", userId, "otherCosts");

export const addItemToFirestore = async (userId: string, item: { id: string; name: string; cost: number }) => {
  const itemsRef = getUserItemsRef(userId);
  await addDoc(itemsRef, item);
};

export const updateItemInFirestore = async (userId: string, item: { id: string; name: string; cost: number }) => {
  const itemDoc = doc(db, "users", userId, "items", item.id);
  await updateDoc(itemDoc, item);
};

export const deleteItemFromFirestore = async (userId: string, itemId: string) => {
  const itemDoc = doc(db, "users", userId, "items", itemId);
  await deleteDoc(itemDoc);
};

export const addOtherCostToFirestore = async (userId: string, cost: { id: string; description: string; amount: number }) => {
  const costsRef = getUserOtherCostsRef(userId);
  await addDoc(costsRef, cost);
};

export const updateOtherCostInFirestore = async (userId: string, cost: { id: string; description: string; amount: number }) => {
  const costDoc = doc(db, "users", userId, "otherCosts", cost.id);
  await updateDoc(costDoc, cost);
};

export const deleteOtherCostFromFirestore = async (userId: string, costId: string) => {
  const costDoc = doc(db, "users", userId, "otherCosts", costId);
  await deleteDoc(costDoc);
};

export const subscribeToItems = (userId: string, callback: (items: any[]) => void) => {
  const itemsRef = getUserItemsRef(userId);
  return onSnapshot(itemsRef, (snapshot) => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(items);
  });
};

export const subscribeToOtherCosts = (userId: string, callback: (costs: any[]) => void) => {
  const costsRef = getUserOtherCostsRef(userId);
  return onSnapshot(costsRef, (snapshot) => {
    const costs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(costs);
  });
};
