import { collection, getDocs, deleteDoc, addDoc, db } from '../firebase';
describe('addDoc', () => {
    let testCollectionRef;

    beforeEach(() => {
        testCollectionRef = collection(db, 'testCollection');
    });

    afterEach(async () => {
        // Clean up test data
        const querySnapshot = await getDocs(testCollectionRef);
        querySnapshot.forEach(doc => {
            deleteDoc(doc.ref);
        });
    });

    it('Adicionar doc na collection', async () => {
        const newDocument = { name: 'Test Document', value: 123 };
        const docRef = await addDoc(testCollectionRef, newDocument);
        expect(docRef.id).toBeDefined();
    });
});