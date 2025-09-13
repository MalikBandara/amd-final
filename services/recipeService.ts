import { db, storage } from "@/firebase";
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs,
  orderBy, query, serverTimestamp, updateDoc, where, limit
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Recipe } from "@/types/recipe";

const recipesRef = collection(db, "recipes");

export async function listRecipes(publishedOnly = true, max = 50): Promise<Recipe[]> {
  const q = publishedOnly
    ? query(recipesRef, where("isPublished", "==", true), orderBy("createdAt", "desc"), limit(max))
    : query(recipesRef, orderBy("createdAt", "desc"), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}

export async function getRecipe(id: string): Promise<Recipe | null> {
  const d = await getDoc(doc(db, "recipes", id));
  return d.exists() ? ({ id: d.id, ...(d.data() as any) }) : null;
}

export async function createRecipe(data: Omit<Recipe, "createdAt"|"updatedAt">) {
  return await addDoc(recipesRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateRecipe(id: string, data: Partial<Recipe>) {
  await updateDoc(doc(db, "recipes", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function removeRecipe(id: string) {
  await deleteDoc(doc(db, "recipes", id));
}

export async function uploadRecipeImage(localUri: string) {
  const key = `recipeImages/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`;
  const storageRef = ref(storage, key);
  const resp = await fetch(localUri);
  const blob = await resp.blob();
  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
}
