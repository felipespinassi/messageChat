/**
 * Asynchronous function to fetch data from an API endpoint using the Fetch API.
 * This function sends a default GET request to the specified `input` with optional `init` options.
 *
 * @template JSON - The expected JSON response type. Defaults to `any`.
 *
 * @param {RequestInfo} input - The URL or request object to fetch data from.
 * @param {RequestInit} [init] - Optional request configuration options.
 * @param {string} [init.method="GET"] - The HTTP method for the request.
 * @param {Headers | string[][] | Record<string, string>} [init.headers] - Custom headers for the request.
 * @param {string} [init.mode="cors"] - The request mode, e.g., "cors", "same-origin", "no-cors".
 * @param {RequestCache} [init.cache="default"] - The cache mode, e.g., "default", "no-store", "reload".
 *
 * @returns {Promise<JSON>} A promise that resolves to the JSON data fetched from the endpoint.
 *
 * @throws {Error} If the response status is not OK (2xx), in this case a CustomError is thrown or if the response is not valid JSON.
 */

import { getAccess_token } from "../storage/getAccess_token";

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const token: string = await getAccess_token();
  const authorizationHeader = token && {
    Authorization: `Bearer ${token}`,
  };
  const headers = new Headers({
    ...authorizationHeader,
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  });

  const request = new Request(input, {
    method: "GET",
    headers,
    mode: "cors",
    cache: "default",
    ...init,
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw new Error();
  }

  const data = await response.json();

  if (!data || typeof data !== "object") {
    throw new Error("Invalid JSON response");
  }

  return data;
}
