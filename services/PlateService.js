import { doc, getDoc, addDoc, setDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const carEntryCollection = collection(db, "CarEntryDate");

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

export const addCarEntry = async (data) => {
  try {
    await addDoc(carEntryCollection, data);
  } catch (error) {
    console.error("Erro ao adicionar nova entrada de estacionamento:", error);
    throw error;
  }
};
