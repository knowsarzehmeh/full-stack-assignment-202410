import { configDotenv } from "dotenv";
import { Request, Response } from "express";
import OpenAI from "openai";

configDotenv();

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

const chat = async (req: Request, res: Response) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that helps the user brainstorm creative, practical, and innovative ideas based on the user's needs. Your responses should be concise, idea-driven, and varied.",
        },
        {
          role: "user",
          content: `Brainstorm some ideas for: ${message}`,
        },
      ],
    });

    const botResponse = completion.choices[0].message;
    return res.json({ response: botResponse.content });
  } catch (error: any) {
    const botResponse = error?.error?.message;
    res.json({ response: botResponse });
  }
};

export { chat };
