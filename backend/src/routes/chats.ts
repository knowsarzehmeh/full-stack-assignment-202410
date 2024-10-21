import { configDotenv } from "dotenv";
import express from "express";
import OpenAI from "openai";

configDotenv();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

// Simple chat route to generate bot response
router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that helps user brainstorm multiple ideas.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    console.log(completion);
    console.log(completion.choices[0].message, "message");
  } catch (error) {
    // Mock response logic (can be improved later)
    const botResponse = `Here's an idea based on "${message}"`;

    res.json({ response: botResponse });
  }
});

export default router;
