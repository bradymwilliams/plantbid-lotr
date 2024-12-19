const ENDPOINT = "https://the-one-api.dev/v2";
const TOKEN = process.env.LOTR_TOKEN;
const config = {
  limit: 10,
  quoteLimit: 3,
};

export type Character = {
  _id: string;
  name: string;
  wikiUrl: string;
  race: string;
  birth: string;
  gender: string;
  death: string;
  hair: string;
  height: string;
  realm: string;
  spouse: string;
};

type CharacterResponse = {
  docs: Character[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
};

export type Quote = {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
};

export type QuoteResponse = {
  docs: Quote[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
};

async function fetchWithAuth(url: string) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}

export async function fetchLotrCharacters() {
  // TODO: Check cache first
  const response = await fetchWithAuth(
    `${ENDPOINT}/character?limit=${config.limit}`
  );

  if (!response.ok) {
    // Log to Error Reporting Service
    console.error(response.statusText);
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as CharacterResponse;

  // TODO: Save to cache

  return data;
}

export async function fetchLotrCharactersByName(name: string) {
  // TODO: Check cache first
  const response = await fetchWithAuth(
    `${ENDPOINT}/character?limit=${config.limit}&name=${name}`
  );

  if (!response.ok) {
    // Log to Error Reporting Service
    console.error(response);
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as CharacterResponse;

  // TODO: Save to cache

  return data;
}

export async function fetchLotrCharQuote(id: string) {
  // TODO: Check cache first
  const response = await fetchWithAuth(
    `${ENDPOINT}/character/${id}/quote?limit=${config.quoteLimit}`
  );

  if (!response.ok) {
    // Log to Error Reporting Service
    console.error(response.statusText);
    throw new Error(response.statusText);
  }

  // TODO: Save to cache
  return (await response.json()) as QuoteResponse;
}
