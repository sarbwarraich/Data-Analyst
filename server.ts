import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", geminiConfigured: !!process.env.GEMINI_API_KEY });
  });

  // Gemini personalized explanation endpoint
  app.post("/api/gemini/explain", async (req, res) => {
    try {
      const { topicTitle, subjectTitle, context, style = "mtech", customPrompt } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured.",
          fallback: true,
          explanation: `**${topicTitle}** is a core component of **${subjectTitle}** in the M.Tech Data Analytics curriculum. (To unlock real-time Gemini AI explanations, configure your GEMINI_API_KEY in the Settings menu).`,
        });
      }

      let systemPrompt = `You are a distinguished Professor of Data Science and Machine Learning lecturing in an M.Tech curriculum.
You specialize in explaining complex data analytics, statistics, machine learning, and time-series concepts with clarity, mathematical accuracy, visual analogies, and concrete industrial case studies.
Topic: ${topicTitle} (Subject: ${subjectTitle}).
Context provided: ${context || "None"}.`;

      if (style === "beginner") {
        systemPrompt += ` Format response for an intuitive beginner: use a crystal-clear real-world analogy, step-by-step breakdown, plain English, and why it matters.`;
      } else if (style === "interview") {
        systemPrompt += ` Format response for top tech Data Analyst/Scientist interviews: common interview questions, edge cases, mathematical trade-offs, how to answer with STAR method, and common pitfalls.`;
      } else if (style === "code") {
        systemPrompt += ` Format response focusing on practical Python implementation using NumPy, Pandas, Scikit-learn, or Statsmodels: clean idiomatic code, commentary, interpretation of output metrics, and best practices.`;
      } else {
        // default mtech
        systemPrompt += ` Format response for rigorous M.Tech post-graduate self-study: formal mathematical definition/formulation, underlying assumptions, algorithmic workflow, evaluation metrics, and real-world data engineering pipeline considerations.`;
      }

      const prompt = customPrompt || `Provide an in-depth personalized explanation of "${topicTitle}" within the context of "${subjectTitle}". Highlight key formulas, practical intuition, a real-world enterprise example, and common traps.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      res.json({
        success: true,
        text: response.text || "No response received.",
      });
    } catch (error: any) {
      console.error("Error generating explanation with Gemini:", error);
      res.status(500).json({
        error: error.message || "Failed to generate explanation with Gemini.",
      });
    }
  });

  // Gemini interactive Q&A endpoint
  app.post("/api/gemini/qa", async (req, res) => {
    try {
      const { question, topicTitle, subjectTitle, history = [] } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured.",
          fallback: true,
          answer: `I am currently running in offline mode because the GEMINI_API_KEY is not set. For "${question}", please refer to the curated notes and formulas in the topic section!`,
        });
      }

      const systemInstruction = `You are an interactive AI Data Analytics Tutor for M.Tech students.
You are currently helping the student with the topic: "${topicTitle}" under "${subjectTitle}".
Answer questions thoroughly, accurately, and pedagogically.
Include mathematical formulas in clean markdown, code snippets if relevant, and practical data analyst interpretations.
Keep the tone encouraging, intellectual, and focused on mastering the curriculum.`;

      // Build contents for multi-turn or single turn
      const formattedHistory = history.map((item: { role: string; content: string }) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content }],
      }));

      formattedHistory.push({
        role: "user",
        parts: [{ text: question }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: formattedHistory,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      res.json({
        success: true,
        answer: response.text || "I was unable to generate an answer.",
      });
    } catch (error: any) {
      console.error("Error in Gemini Q&A:", error);
      res.status(500).json({
        error: error.message || "Failed to complete Q&A request.",
      });
    }
  });

  // Gemini practice problem / assessment generator
  app.post("/api/gemini/quiz", async (req, res) => {
    try {
      const { topicTitle, subjectTitle, difficulty = "medium" } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key not configured.",
        });
      }

      const prompt = `Generate 3 high-yield multiple-choice questions for M.Tech Data Analytics self-study on "${topicTitle}" (${subjectTitle}). Difficulty: ${difficulty}.
Return strictly valid JSON with no markdown backticks around it or standard json array format:
[
  {
    "question": "question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "why this is correct and others are wrong"
  }
]`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an M.Tech curriculum examination committee member. Output strictly valid JSON matching the schema.",
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const raw = response.text?.trim() || "[]";
      let questions = [];
      try {
        questions = JSON.parse(raw);
      } catch (e) {
        console.warn("Failed to parse JSON directly, attempting recovery", raw);
      }

      res.json({ success: true, questions });
    } catch (error: any) {
      console.error("Error generating quiz with Gemini:", error);
      res.status(500).json({ error: error.message || "Failed to generate quiz." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
