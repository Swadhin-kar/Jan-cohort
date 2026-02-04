import express from "express";
import { Router } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const JD_OPENAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("BODY RECEIVED:", req.body);

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: `
You are a helpful assistant that improves job descriptions.
Enhance clarity, structure, and appeal while keeping all details.

${prompt}
      `,
    });

    const outputText = response.output_text;

    if (!outputText) {
      return res.status(502).json({
        success: false,
        error: "Empty response from OpenAI",
      });
    }

    return res.status(200).json({
      success: true,
      data: outputText,
    });
  } catch (error) {
    console.error("===== OPENAI ERROR =====");
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// const JD_OPENAI = async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         console.log("BODY RECEIVED:", req.body);

//         if (!prompt) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Prompt is required",
//             });
//         }

//         const response = await openai.responses.create({
//             model: "gpt-5-nano",
//             input: [
//                 {
//                     role: "system",
//                     content:
//                         "You are a helpful assistant that improves job descriptions. Enhance clarity, structure, and appeal while keeping all details.",
//                 },
//                 {
//                     role: "user",
//                     content: prompt,
//                 },
//             ],
//             max_output_tokens: 600,
//             // ❌ temperature REMOVED (important)
//         });

//         const outputText = response.output_text;

//         if (!outputText) {
//             return res.status(502).json({
//                 success: false,
//                 error: "OpenAI returned empty response",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: outputText,
//         });
//     } catch (error) {
//         console.error("===== OPENAI ERROR FULL DUMP =====");
//         console.error(JSON.stringify(error, null, 2));
//         console.error("=================================");

//         return res.status(500).json({
//             success: false,
//             error: error?.message || "Unknown error",
//         });
//     }
// };

router.post("/generate-jd", JD_OPENAI);

export default router;
