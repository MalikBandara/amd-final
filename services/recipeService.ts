import { db } from "@/firebase";
import { Recipe } from "@/types/recipe";
import {
    addDoc, collection, deleteDoc, doc,
    getDoc, getDocs,
    serverTimestamp, updateDoc
} from "firebase/firestore";

const recipesRef = collection(db, "recipes");

export async function listRecipes(): Promise<Recipe[]> {
  const snap = await getDocs(collection(db, "recipes"));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}


export async function getRecipe(id: string): Promise<Recipe | null> {
  const d = await getDoc(doc(db, "recipes", id));
  return d.exists() ? ({ id: d.id, ...(d.data() as any) }) : null;
}

export async function createRecipe(data: Omit<Recipe,"createdAt">) {
  return await addDoc(recipesRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateRecipe(id: string, data: Partial<Recipe>) {
  await updateDoc(doc(db, "recipes", id), {
    ...data,
  });
}

export async function removeRecipe(id: string) {
  await deleteDoc(doc(db, "recipes", id));
}
