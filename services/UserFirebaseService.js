import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { auth } from './firebaseConfig';

const db = getFirestore();

export const resetPassword = async () => {
  await sendPasswordResetEmail(auth, email);
}

export const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Usuario"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched data:", data);
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
};


export const deleteUser = async (documentId) => {
  try {
    await deleteDoc(doc(db, "Usuario", documentId));
    Alert.alert('Sucesso', 'Usuario Deletado do cadastrado');
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};


export const createUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, usuario, senha);
    console.log(userCredential.user.email);
    await sendEmailVerification(userCredential.user);
    console.log('Usuário registrado com sucesso!', userCredential.user);
  }
  catch (error) {
    console.error('Erro ao registrar:', error.message);
    Alert.alert('Erro', error.message);
  }
}


const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, usuario, senha);
    console.log('Login bem-sucedido!', userCredential.user);
    Alert.alert('Sucesso', 'Login bem-sucedido!');
  }
  catch (error) {
    //console.error('Erro ao fazer login:', error.message);
    Alert.alert('Erro', 'Usuário e Senha invalidos');
  }
};
