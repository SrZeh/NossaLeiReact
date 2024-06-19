import { db, setDoc, doc, collection, getDocs, deleteDoc, getDoc } from '../firebase';

describe('setDoc', () => {
    let testCollectionRef;

    beforeEach(async () => {
        testCollectionRef = collection(db, 'testCollection');
    });

    afterEach(async () => {
        // Clean up test data
        const querySnapshot = await getDocs(testCollectionRef);
        querySnapshot.forEach(doc => {
            deleteDoc(doc.ref);
        });
    });

    it('should create a new document if it does not exist', async () => {
        const docId = 'newDoc';
        const newDocumentData = { name: 'New Document', value: 456 };

        // Set the document
        await setDoc(doc(db, 'testCollection', docId), newDocumentData);

        // Verify the document exists and has the correct data
        const docSnapshot = await getDoc(doc(db, 'testCollection', docId));
        expect(docSnapshot.exists()).toBe(true);
        expect(docSnapshot.data()).toEqual(newDocumentData);
    });

    it('should update an existing document', async () => {
        const docId = 'existingDoc';
        const initialDocumentData = { name: 'Existing Document', value: 123 };
        const updatedDocumentData = { name: 'Updated Document', value: 456 };

        // Create the initial document
        await setDoc(doc(db, 'testCollection', docId), initialDocumentData);

        // Update the document
        await setDoc(doc(db, 'testCollection', docId), updatedDocumentData);

        // Verify the document has been updated
        const docSnapshot = await getDoc(doc(db, 'testCollection', docId));
        expect(docSnapshot.exists()).toBe(true);
        expect(docSnapshot.data()).toEqual(updatedDocumentData);
    });
});
