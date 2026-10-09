import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';

const app = express();
const port = Number(process.env.PORT) || 5000;
const apiKey = process.env.OPENAI_API_KEY;
let openai;

app.use(express.json({ limit: '1mb' }));

app.post('/api/assistant', async (req, res) => {
	const { message } = req.body ?? {};

	if (typeof message !== 'string' || !message.trim()) {
		return res.status(400).json({ error: 'Please enter a message.' });
	}

	if (!apiKey || apiKey === 'your_actual_api_key_here') {
		return res.status(503).json({
			error: 'The AI service is not configured. Set OPENAI_API_KEY in .env.',
		});
	}

	try {
		openai ??= new OpenAI({ apiKey });
		const response = await openai.responses.create({
			model: 'gpt-4.1-mini',
			instructions: `You are CampusConnect AI, a helpful college campus assistant.
Answer in simple English. Help with attendance, timetables, fees, notices,
leave applications, gate passes, and website navigation. Never claim to have
accessed student records or completed an action unless the server has actually
verified it. Do not invent student information.`,
			input: message.trim(),
		});

		return res.json({ reply: response.output_text });
	} catch (error) {
		console.error("Campus AI error:", error);

		return res.status(500).json({
			error: error.message || "AI request failed",
		});
	}
});

app.listen(port, () => {
	console.log(`CampusConnect API listening on http://localhost:${port}`);
});
