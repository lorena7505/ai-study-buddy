import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
    // CORS configuration
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Ensure only POST method is allowed
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text content is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "models/gemini-2.5-flash"
        });

        const prompt = `
      Analizează următorul text educațional:
      "${text}"

      Te rog să generezi un răspuns valid JSON cu următoarea structură:
      {
        "summary": "Un rezumat concis al lecției (maxim 3-4 fraze).",
        "explanation": "O explicație detaliată și clară a conceptelor cheie, structurată pe puncte dacă e cazul.",
        "quiz": [
          {
            "question": "Întrebarea 1",
            "options": ["Varianta A", "Varianta B", "Varianta C", "Varianta D"],
            "correctAnswer": "Varianta corectă (trebuie să fie una dintre opțiuni)"
          },
          ... (exact 4 întrebări)
        ]
      }
      Important: Returnează DOAR JSON-ul, fără markdown (fără \`\`\`json).
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // Clean up response if it contains markdown code blocks
        const cleanResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const jsonResponse = JSON.parse(cleanResponse);
            res.status(200).json(jsonResponse);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, cleanResponse);
            res.status(500).json({ error: 'Failed to parse AI response', raw: cleanResponse });
        }

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
