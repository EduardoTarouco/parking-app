import firestore from '@react-native-firebase/firestore';

const parkingCostCollection = firestore().collection('ParkingCosts');

export const getParkingCost = async (id) => {
  try {
    const document = await parkingCostCollection.doc(id).get();
    if (document.exists) {
      return { id: document.id, ...document.data() };
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error('Erro ao receber o custo do estacionamento:', error);
    throw error;
  }
}

export const addParkingCost = async (data) => {
  try {
    if (!data.id) {
      console.error('ERRO: ID é obrigatório para adicionar custo de estacionamento');
    }
    parkingCostCollection.doc(data.id).set(data);
  } catch (error) {
    console.error('Erro ao adicionar custo de estacionamento:', error);
    throw error;
  }
}