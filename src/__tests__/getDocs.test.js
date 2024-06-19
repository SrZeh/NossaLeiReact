import { db, getDocs, collection, addDoc, deleteDoc } from '../firebase';

describe('getDocs', () => {
    let testCollectionRef;

    beforeEach(async () => {
        testCollectionRef = collection(db, 'testGetCollection');
        // Add some test documents
        await addDoc(testCollectionRef, { name: 'Document 1', value: 1 });
        await addDoc(testCollectionRef, { name: 'Document 2', value: 2 });

        // Log the documents in the collection after adding
        const querySnapshot = await getDocs(testCollectionRef);
    });

    afterEach(async () => {
        // Clean up test data
        const querySnapshot = await getDocs(testCollectionRef);
        querySnapshot.forEach(doc => {
            deleteDoc(doc.ref);
        });
    });

    it('should retrieve all documents from a collection', async () => {
        const querySnapshot = await getDocs(testCollectionRef);

        // Verify that the query snapshot contains the expected number of documents
        expect(querySnapshot.docs.length).toBe(2);

        // Verify that the retrieved documents have the correct data
        // querySnapshot.forEach((doc, index) => {
        //     expect(doc.data()).toEqual({ name: `Document ${index + 1}`, value: index + 1 });
        // });
    });
});
