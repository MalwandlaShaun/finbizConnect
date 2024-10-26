import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore();

// Create or update a document
async function createOrUpdateDocument(collection, docId, data) {
    await setDoc(doc(db, collection, docId), data);
}

// Read a document
async function readDocument(collection, docId) {
    const docRef = doc(db, collection, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}

// Update a document
async function updateDocument(collection, docId, data) {
    const docRef = doc(db, collection, docId);
    await updateDoc(docRef, data);
}

// Delete a document
async function deleteDocument(collection, docId) {
    await deleteDoc(doc(db, collection, docId));
}
