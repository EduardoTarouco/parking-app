import { doc, getDoc, getDocs, addDoc, setDoc, collection } from "firebase/firestore";
import { query, where, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const carEntryCollection = collection(db, "CarEntryDate");
const carDepartureCollection = collection(db, "CarDepartureDate");

export const getAllDeparturesFromToday = async () => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const q = query(
      carDepartureCollection,
      where("entryDate", ">=", Timestamp.fromDate(startOfDay)),
      where("entryDate", "<=", Timestamp.fromDate(endOfDay))
    );

    const querySnapshot = await getDocs(q);
    const entries = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return entries;
  } catch (error) {
    console.error("Erro ao retornar todas as entradas de estacionamento:", error);
    throw error;
  }
};

export const getAllEntriesFromToday = async () => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const q = query(
      carEntryCollection,
      where("date", ">=", Timestamp.fromDate(startOfDay)),
      where("date", "<=", Timestamp.fromDate(endOfDay))
    );

    const querySnapshot = await getDocs(q);
    const entries = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return entries;
  } catch (error) {
    console.error("Erro ao retornar todas as entradas de estacionamento:", error);
    throw error;
  }
};

export const getCarEntry = async (id) => {
  try {
    const documentRef = doc(carEntryCollection, id);
    const documentSnap = await getDoc(documentRef);

    if (documentSnap.exists()) {
      return { id: documentSnap.id, ...documentSnap.data() };
    } else {
      throw new Error("Documento não encontrado");
    }
  } catch (error) {
    console.error("Erro ao retornar entrada de estacionamento:", error);
    throw error;
  }
};

export const addCarDeparture = async (data) => {
  try {
    await addDoc(carDepartureCollection, data);
  } catch (error) {
    console.error("Erro ao adicionar nova saída do estacionamento:", error);
    throw error;
  }
};

export const addCarEntry = async (data) => {
  try {
    await addDoc(carEntryCollection, data);
  } catch (error) {
    console.error("Erro ao adicionar nova entrada de estacionamento:", error);
    throw error;
  }
};
