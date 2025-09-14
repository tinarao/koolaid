"use server";

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
