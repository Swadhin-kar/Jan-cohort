import express from "express";
import axios from "axios";

const router = express.Router();

export const JD = async (req, res) => {
  const { prompt } = req.body;
  console.log("BODY RECEIVED:", req.body);

  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: "Prompt is required"
    });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528:free",
        stream: false, // 🔥 IMPORTANT FIX
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that improves job descriptions provided by recruiters. Enhance clarity, structure, and appeal while retaining all key details."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        timeout: 30000 // 🔥 Prevent hanging connections
      }
    );

    console.log(
      "OPENROUTER RAW RESPONSE:",
      JSON.stringify(response.data, null, 2)
    );

    const message =
      response.data?.choices?.[0]?.message?.content;

    if (!message) {
      console.error("Invalid OpenRouter response:", response.data);
      return res.status(502).json({
        success: false,
        error: "AI returned an empty response"
      });
    }

    return res.status(200).json({
      success: true,
      data: message
    });

  } catch (error) {
    console.error(
      "JD generation error:",
      error.response?.status,
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      error: "Failed to generate job description"
    });
  }
};

router.post("/generate-jd", JD);

export default router;
