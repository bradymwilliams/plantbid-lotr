import { Character, Quote } from "~/lib/lotr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Card, CardTitle } from "./ui/card";
import { useState } from "react";

/**
 * TODO
 * - Link to Wiki
 * - set loading state for quotes
 * - Fetch new quotes, etc
 */
export default function CharacterCard({ character }: { character: Character }) {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  return (
    <Dialog
      // I added this after the interview, previously was using useEffect but not respecting the open state
      onOpenChange={(isOpen) => {
        if (isOpen && quotes.length === 0) {
          void fetch("/api/quotes/" + character._id).then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                setQuotes(data.docs);
              });
            }
          });
        }
      }}
    >
      <DialogTrigger>
        <Card className="p-4">
          <CardTitle>{character.name}</CardTitle>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{character.name}</DialogTitle>
        <DialogDescription className="sr-only">
          {character.name} details
        </DialogDescription>
        <ul>
          <li>
            <span className="font-bold">Name</span>: {character.name}
          </li>
          <li>
            <span className="font-bold">Race</span>: {character.race}
          </li>
          <li>
            <span className="font-bold">Gender</span>: {character.gender}
          </li>
        </ul>
        {quotes.length > 0 && (
          <div>
            <h4 className="font-bold">Quotes</h4>
            <ul>
              {quotes.map((quote) => (
                <li key={quote._id}>{quote.dialog}</li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
