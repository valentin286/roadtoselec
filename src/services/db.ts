import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User, Category, UserProgress, StudySession, Mission, Feedback } from "../types";

// Collection name constant
const COLLECTION = "app_data";

// Helper to save a specific document
const saveDocument = async (docId: string, data: any) => {
  if (!db) return; // Fallback or offline mode could be implemented here
  try {
    // We wrap array data in an object key 'list' or similar to valid Firestore document structure if it's an array
    const payload = Array.isArray(data) ? { items: data } : data;
    await setDoc(doc(db, COLLECTION, docId), payload);
  } catch (e) {
    console.error(`Error saving ${docId}:`, e);
  }
};

// Helper to load a specific document
const loadDocument = async (docId: string, defaultValue: any) => {
  if (!db) return defaultValue;
  try {
    const docRef = doc(db, COLLECTION, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // If we wrapped it in 'items', unwrap it. Otherwise return data.
      return Array.isArray(defaultValue) ? (data.items || defaultValue) : data;
    }
    return defaultValue;
  } catch (e) {
    console.error(`Error loading ${docId}:`, e);
    return defaultValue;
  }
};

export const dbService = {
  // USERS
  saveUsers: (users: User[]) => saveDocument("users", users),
  getUsers: (initial: User[]) => loadDocument("users", initial),

  // CATEGORIES
  saveCategories: (categories: Category[]) => saveDocument("categories", categories),
  getCategories: (initial: Category[]) => loadDocument("categories", initial),

  // PROGRESS
  saveProgress: (progress: UserProgress[]) => saveDocument("progress", progress),
  getProgress: (initial: UserProgress[]) => loadDocument("progress", initial),

  // SESSIONS
  saveSessions: (sessions: StudySession[]) => saveDocument("sessions", sessions),
  getSessions: (initial: StudySession[]) => loadDocument("sessions", initial),

  // MISSIONS
  saveMissions: (missions: Mission[]) => saveDocument("missions", missions),
  getMissions: (initial: Mission[]) => loadDocument("missions", initial),

  // FEEDBACK
  saveFeedbacks: (feedbacks: Feedback[]) => saveDocument("feedbacks", feedbacks),
  getFeedbacks: (initial: Feedback[]) => loadDocument("feedbacks", initial),

  // COMPLETED EXERCISES (This is a complex object, handled as is)
  saveCompletedExercises: (data: Record<string, Record<string, number[]>>) => saveDocument("completed_exercises", data),
  getCompletedExercises: (initial: Record<string, Record<string, number[]>>) => loadDocument("completed_exercises", initial),
};
