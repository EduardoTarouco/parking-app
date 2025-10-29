import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const parkingCostCollection = collection(db, "ParkingCosts");
export const getParkingCost = async (id) => {
  try {
    const documentRef = doc(parkingCostCollection, id);
    const documentSnap = await getDoc(documentRef);

    if (documentSnap.exists()) {
      return { id: documentSnap.id, ...documentSnap.data() };
    } else {
      throw new Error("Documento não encontrado");
    }
  } catch (error) {
    console.error("Erro ao receber o custo do estacionamento:", error);
    throw error;
  }
};

export const addParkingCost = async (data) => {
  try {
    if (!data.id) {
      throw new Error("ID é obrigatório para adicionar custo de estacionamento");
    }

    const documentRef = doc(parkingCostCollection, data.id);
    await setDoc(documentRef, data);
  } catch (error) {
    console.error("Erro ao adicionar custo de estacionamento:", error);
    throw error;
  }
};