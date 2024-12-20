import {
  collection,
  addDoc,
  doc,
  updateDoc,
  orderBy,
  getDocs,
  query,
  deleteDoc,
  setDoc,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Word } from "@/types";

export const createWord = async (wordData: Omit<Word, "id">): Promise<void> => {
  try {
    const docRef = doc(collection(db, "words"));
    const id = docRef.id;

    // Include the id and dateAndTimeCreated fields
    const wordWithMetadata: Word = {
      ...wordData,
      id,
      createdOn: new Date().toISOString(),
    };
    
    // Use `setDoc` to add the document with the predefined id
    await setDoc(docRef, wordWithMetadata);
  } catch (e) {
    console.error("Error adding word: ", e);
  }
};

export const readWords = async (): Promise<Word[]> => {
  try {
    const querySnapshot = await getDocs(query(collection(db, "words")));
    console.log(querySnapshot);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
        } as Word)
    );
  } catch (e) {
    console.error("Error fetching words: ", e);
    return [];
  }
};

export const updateWord = async (
  id: string,
  updatedData: Partial<Word>
): Promise<void> => {
  try {
    const docRef = doc(db, "words", id);
    await updateDoc(docRef, updatedData);
  } catch (e) {
    console.error("Error updating word: ", e);
  }
};

export const deleteWord = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "words", id);
    await deleteDoc(docRef);
    console.log("Word deleted successfully");
  } catch (e) {
    console.error("Error deleting word: ", e);
  }
};

/**
 * Subscribes to real-time updates for the "words" collection.
 * @param onData - Callback function to handle the live data.
 * @returns Unsubscribe function to stop listening to updates.
 */
export const subscribeToWords = (onData: (words: Word[]) => void) => {
  const q = query(collection(db, "words"));

  // Subscribe to real-time updates
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const liveWords: Word[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Word)
    );
    onData(liveWords); // Pass data to the callback
  });

  return unsubscribe;
};

/**
 * Subscribes to real-time updates for the "words" collection.
 * @param onData - Callback function to handle the live data.
 * @returns Unsubscribe function to stop listening to updates.
 */
export const subscribeToNewWords = (onData: (words: Word[]) => void) => {
  const q = query(collection(db, "words"), where("visited", "==", 0));

  // Subscribe to real-time updates
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const liveWords: Word[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Word)
    );
    onData(liveWords); // Pass data to the callback
  });

  return unsubscribe;
};

export const subscribeReviewNewWords = (onData: (words: Word[]) => void) => {
  const q = query(collection(db, "words"), where("visited", "==", 0));

  // Subscribe to real-time updates
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const liveWords: Word[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Word
    );
    onData(liveWords); // Pass data to the callback
  });

  return unsubscribe;
};

export const fetchWordsWithUpcomingReviews = async (): Promise<Word[]> => {

  const dateTimeNow = new Date();
  // Create a query that filters for words where 'nextReviewOn' is greater than the current time
  const wordsRef = collection(db, "words"); // Replace with your Firestore collection name
  const q = query(
    wordsRef,
    where("nextReviewOn", "<", dateTimeNow.toISOString())
  );

  try {
    // Fetch the documents once using `getDocs`
    const querySnapshot = await getDocs(q);

    // Process the documents and return them as an array of Word objects
    const liveWords: Word[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Word
    );
    console.log({liveWords})
    return liveWords;
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
};