import { createApiEndpoint } from "./createApiEndpoint";

export class ApiError extends Error {
  constructor(readonly status: number) {
    super(`POST request failed with status ${status}`);
    this.name = "ApiError";
  }
}

export async function post<T, K = undefined>(
  path: string,
  request: T,
): Promise<K> {
  const response = await fetch(createApiEndpoint(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  const responseText = await response.text();

  if (!responseText) {
    return undefined as K;
  }

  return JSON.parse(responseText) as K;
}
