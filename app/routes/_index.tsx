import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CharacterCard from "~/components/character-card";
import { fetchLotrCharacters, fetchLotrCharactersByName } from "~/lib/lotr";

export const meta: MetaFunction = () => {
  return [
    { title: "PlantBid Interview" },
    { name: "description", content: "Hello!" },
  ];
};

export async function loader() {
  try {
    const dataPromise = fetchLotrCharacters();
    const gandalfPromise = fetchLotrCharactersByName("Gandalf");

    const [data, gandalf] = await Promise.all([dataPromise, gandalfPromise]);

    // just for testing, replacing first character with Gandalf
    data.docs[0] = gandalf.docs[0];

    return { data };
  } catch (error) {
    return { error };
  }
}

/**
 * Feature TODO:
 * - Add a search bar to filter characters by name
 * - Add a pagination to load more characters
 * - Add Filters to filter by any key in the model
 * - Loading state when filtering
 */
export default function Index() {
  const { data, error } = useLoaderData<typeof loader>();

  if (error) {
    return <div>Failed to load characters</div>;
  }

  return (
    <div className="container mx-auto p-2 grid grid-cols-5 gap-4">
      {data &&
        data.docs.length > 0 &&
        data.docs.map((doc) => {
          return <CharacterCard key={doc._id} character={doc} />;
        })}
    </div>
  );
}
