// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, updateDoc, collection, addDoc, setDoc, getDocs, deleteDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPXEQFN6Nc0uNCFH9EVGTKUheRH0Erqb4",
    authDomain: "nossalei-bd3b6.firebaseapp.com",
    databaseURL: "https://nossalei-bd3b6-default-rtdb.firebaseio.com",
    projectId: "nossalei-bd3b6",
    storageBucket: "nossalei-bd3b6.appspot.com",
    messagingSenderId: "821142695417",
    appId: "1:821142695417:web:d6d2935501ec46006aa128",
    measurementId: "G-KPGKCYJZ3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);


export { app, db, doc, updateDoc };

describe('Operacoes com o FireStore', () => {
    let testCollectionRef;

    beforeEach(() => {
        testCollectionRef = collection(db, 'testCollection');
    });

    // Test addDoc
    it('Adicionar doc na collection', async () => {
        const newDocument = { name: 'Test Document', value: 123 };
        const docRef = await addDoc(testCollectionRef, newDocument);
        expect(docRef.id).toBeDefined();
    });

    // Test setDoc
    it('Criar ou atualizar documento', async () => {
        const docId = 'myDoc';
        const updatedData = { name: 'Updated Document', value: 456 };
        await setDoc(doc(db, 'testCollection', docId), updatedData);
        const docSnapshot = await getDoc(doc(db, 'testCollection', docId));
        expect(docSnapshot.data()).toEqual(updatedData);
    });

    // Test getDocs
    it('Get de todos os doc da collection', async () => {
        const querySnapshot = await getDocs(testCollectionRef);
        expect(querySnapshot.docs.length).toBeGreaterThanOrEqual(0);
    });

    // Test deleteDoc
    it('Deletar o doc', async () => {
        const docId = 'myDoc';
        await deleteDoc(doc(db, 'testCollection', docId));
        const docSnapshot = await getDoc(doc(db, 'testCollection', docId));
        expect(docSnapshot.exists()).toBe(false);
    });
});