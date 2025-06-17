import { UnsplashPhoto } from "../types/unsplash";

const ACCESS_KEY = process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY;

async function fetchUnsplash<T>(endpoint: string): Promise<T> {
  const url = `https://api.unsplash.com/${endpoint}${endpoint.includes("?") ? "&" : "?"}client_id=${ACCESS_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  const json = await res.json();
  console.log(json);
  return json;
}

export async function searchPhotos(query: string, page = 1, perPage = 15) {
  const endpoint = `search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
  const json = await fetchUnsplash<{ results: UnsplashPhoto[] }>(endpoint);
  return json.results;
}

export async function getAllPhotos(page = 1, perPage = 15) {
  const endpoint = `photos?page=${page}&per_page=${perPage}`;
  const json = await fetchUnsplash<UnsplashPhoto[]>(endpoint);
  return json;
}

export async function getPhotoDetails(id: string) {
  const endpoint = `photos/${id}`;
  const json = await fetchUnsplash<UnsplashPhoto>(endpoint);
  return json;
}

export async function getRandomPhoto() {
  const endpoint = `photos/random`;
  const json = await fetchUnsplash<UnsplashPhoto>(endpoint);
  return json;
}
