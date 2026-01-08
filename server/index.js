const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/ai', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text content is required' });
        }

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
            res.json(jsonResponse);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, cleanResponse);
            res.status(500).json({ error: 'Failed to parse AI response', raw: cleanResponse });
        }

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Export the Express API
module.exports = app;

// Only start server if running locally (not imported)
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
