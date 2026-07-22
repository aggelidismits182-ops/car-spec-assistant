import { GoogleGenerativeAI } from "@google/generative-ai";

export default async (req: Request) => {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Λείπει το prompt" }), {
        status: 400,
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

    const systemInstruction = `
Είσαι σύμβουλος αγοράς αυτοκινήτων. Ο χρήστης περιγράφει τι ψάχνει.
Απάντησε ΜΟΝΟ με έγκυρο JSON array (χωρίς markdown, χωρίς backticks, χωρίς κείμενο πριν ή μετά).
Πρότεινε 10-15 αυτοκίνητα. Κάθε στοιχείο έχει ΑΚΡΙΒΩΣ αυτό το σχήμα:
{
  "id": "string",
  "make": "string",
  "model": "string",
  "year": number,
  "priceEUR": number,
  "bodyType": "Coupe" | "Sedan" | "Hatchback" | "SUV" | "Convertible" | "Wagon",
  "horsepower": number,
  "zeroToHundredSec": number,
  "fuelType": "Petrol" | "Diesel" | "Electric" | "Hybrid",
  "imageUrl": "https://placehold.co/600x360/0a0a0a/e2001a?text=Make+Model",
  "reason": "string στα ελληνικά — γιατί ταιριάζει σε αυτό που ζήτησε ο χρήστης"
}
Στο imageUrl βάλε τη μάρκα και το μοντέλο στο text= κομμάτι, με + αντί για κενά.
`;

    const result = await model.generateContent([systemInstruction, prompt]);
    let text = result.response.text().trim();

    text = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/, "")
      .replace(/```$/, "")
      .trim();

    const cars = JSON.parse(text);

    return new Response(JSON.stringify(cars), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Η κλήση στο AI απέτυχε." }),
      { status: 500 }
    );
  }
};