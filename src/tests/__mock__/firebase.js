// src/tests/__mocks__/firebase.js

// Mock Firebase Firestore collection and document functions
// export const collection = jest.fn(() => ({
//     addDoc: jest.fn(() => Promise.resolve()), // Mock addDoc to resolve immediately
// }));


// export const addDoc = jest.fn(() => Promise.resolve());
// Mock Firestore query, where, and document functions
export const query = jest.fn();
export const where = jest.fn();
export const doc = jest.fn();

// Mock data for Firestore documents
export let mockData = [
    { id: '1', abrangencia: 'Municipal', ramo_direito: 'Direito Civil', nome_proposta: 'Proposta 1', exposicao_motivos: 'Motivo 1', texto_lei: 'Texto 1' },
    { id: '2', abrangencia: 'Estadual', ramo_direito: 'Direito Penal', nome_proposta: 'Proposta 2', exposicao_motivos: 'Motivo 2', texto_lei: 'Texto 2' }
];

// Mock getDocs function to simulate Firestore fetching
export const getDocs = jest.fn(async (query) => {
    if (query) {
        const filteredData = mockData.filter(item => item.abrangencia === query);
        return {
            docs: filteredData.map(data => ({ id: data.id, data: () => data }))
        };
    } else {
        return {
            docs: mockData.map(data => ({ id: data.id, data: () => data }))
        };
    }
});

// Mock setDoc function to simulate Firestore document setting
export const setDoc = jest.fn(async (ref, data) => {
    const index = mockData.findIndex(item => item.id === ref.id);
    if (index !== -1) {
        mockData[index] = { id: ref.id, ...data };
    }
});

// Mock deleteDoc function to simulate Firestore document deletion
export const deleteDoc = jest.fn(async (ref) => {
    mockData = mockData.filter(item => item.id !== ref.id);
});

// __mocks__/firebase.js

const firebase = {
    firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
            add: jest.fn(() => Promise.resolve()),
        })),
    })),
};

export default firebase;
