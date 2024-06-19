import { db, deleteDoc, doc, collection, getDocs, addDoc, getDoc } from '../firebase';

describe('deleteDoc', () => {
    let testCollectionRef;

    beforeEach(async () => {
        testCollectionRef = collection(db, 'testCollection');
        // Create a test document for deletion
        const newDocument = { name: 'Test Document', value: 123 };
        await addDoc(testCollectionRef, newDocument);
    });

    afterEach(async () => {
        // Clean up test data
        const querySnapshot = await getDocs(testCollectionRef);
        querySnapshot.forEach(doc => {
            deleteDoc(doc.ref);
        });
    });

    it('should delete a document', async () => {
        const docId = 'myDoc';
        const docRef = doc(db, 'testCollection', docId);

        // Delete the document
        await deleteDoc(docRef);

        // Verify that the document no longer exists
        const docSnapshot = await getDoc(docRef);
        expect(docSnapshot.exists()).toBe(false);
    });
});
