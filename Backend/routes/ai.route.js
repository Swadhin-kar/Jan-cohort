import express from 'express'
import { Router } from 'express'
import axios from 'axios'

const router = Router()

export const JD = async (req, res) => {
    const { prompt } = req.body
    console.log("BODY RECEIVED:", req.body);

    try {
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is null" })
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "deepseek/deepseek-r1-0528:free",
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
                ],
                temperature: 0.6
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        ///////////// from here proceed
        // const message = response.data.choices[0].message.content
        // return res.status(200).json({ message })

        console.log("OPENROUTER RAW RESPONSE:", JSON.stringify(response.data, null, 2));

        const choices = response.data?.choices;

        if (!choices || choices.length === 0) {
            console.error("Invalid OpenRouter response:", response.data);
            return res.status(500).json({
                success: false,
                error: "AI response format invalid"
            });
        }

        const messages = choices[0]?.message?.content;

        if (!messages) {
            return res.status(500).json({
                success: false,
                error: "AI did not return any content"
            });
        }


        return res.status(200).json({
            success: true,
            data: messages
        })
    } catch (error) {
        console.error("JD generation error:", error.response?.data || error.message);

        return res.status(500).json({
            success: false,
            error: "Failed to generate job description"
        });
    }
}

router.post('/generate-jd', JD)

export default router