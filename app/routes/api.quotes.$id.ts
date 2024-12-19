import { json, LoaderFunctionArgs } from "@remix-run/node";
import { fetchLotrCharQuote, QuoteResponse } from "~/lib/lotr";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    return new Response("Not Found", { status: 404 });
  }

  try {
    const response = await fetchLotrCharQuote(params.id);

    // TODO: Save to cache
    return json(response as QuoteResponse);
  } catch (error) {
    // Log to Error Reporting Service
    return new Response("Internal Server Error", { status: 500 });
  }
}
