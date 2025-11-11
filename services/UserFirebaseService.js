import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';

export const signUp = async ({email, senha}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    await sendEmailVerification(userCredential.user);
    console.log('Usuário registrado com sucesso!', userCredential.user);
    return userCredential.user;
  }
  catch (error) {
    console.error('Erro ao registrar usuário: ', error.message);
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este email já está em uso!');
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error('Este email é inválido!');
    }
    throw new Error(error);
  }
}

export const login = async ({email, senha}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    console.log('Login bem-sucedido!', userCredential.user);
    return userCredential.user;
  }
  catch (error) {
    if (error.code === 'auth/invalid-credential') {
      throw new Error('Credenciais inválidas. Por favor, verifique seu email e senha.');
    }
    console.error('Erro ao realizar login: ', error.message);
  }
};

export const resetPassword = async ({email}) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      throw new Error('Este email é inválido!');
    }
    console.error('Erro ao enviar email de recuperação de senha: ', error.message);
    throw new Error(error);
  }
}

export const signOutUser = async () => {
  await signOut(auth);
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
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};