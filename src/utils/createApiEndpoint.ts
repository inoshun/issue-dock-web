export const createApiEndpoint = (
  path: string,
  searchParams?: Record<string, string | number>,
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

  if (!searchParams) {
    return `${baseUrl}${path}`;
  }

  const queryString = new URLSearchParams(
    Object.entries(searchParams).map(([key, value]) => [key, String(value)]),
  ).toString();

  return `${baseUrl}${path}?${queryString}`;
};
