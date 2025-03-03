import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId, score, selectedQuiz } = req.body;

      if (!userId || score === undefined || !selectedQuiz) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      //@ts-ignore
      const newScore = await prisma.score.create({
        data: {
          userId,
          score,
          selectedQuiz,
        },
      });

      return res
        .status(201)
        .json({ message: "Score saved successfully", score: newScore });
    } catch (error) {
      console.error("Error saving score:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
