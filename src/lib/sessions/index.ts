import { getApiUrl } from "../utils";

export async function createSession() {
  const route = getApiUrl() + "/api/sessions";

  const response = await fetch(route, {
    method: "POST",
  });

  if (!response.ok) {
    console.log(response);
    return { ok: false, error: "Не удалось создать сессию" };
  }

  const { key }: CreateSessionResponse = await response.json();
  return { ok: true, key };
}

export async function isSessionExists(key?: string) {
  if (!key) return false;
  const route = getApiUrl() + "/api/sessions/exists/" + key;

  const response = await fetch(route);
  if (!response.ok) {
    return false;
  }

  return true;
}

export async function deleteSession(key: string) {
  const route = getApiUrl() + "/api/sessions/" + key;
  const response = await fetch(route, {
    method: "DELETE",
  });

  if (!response.ok) {
    const text = await response.text();
    return { ok: false, error: text };
  }

  return { ok: true };
}
