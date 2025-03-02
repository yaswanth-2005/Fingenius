import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const {
      userId,
      age,
      gender,
      income,
      bankBalance,
      propertiesWorth,
      debt,
      insurance,
      medicalCondition,
      lifestyle,
      overallDescription,
    } = req.body;

    // Ensure user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create profile
    const userProfile = await prisma.userProfile.create({
      data: {
        userId,
        age,
        gender,
        income,
        bankBalance,
        propertiesWorth,
        debt,
        insurance,
        medicalCondition,
        lifestyle,
        overallDescription,
      },
    });

    // Update user registration status
    await prisma.user.update({
      where: { id: userId },
      data: { isRegistrationComplete: true },
    });

    return res
      .status(201)
      .json({ message: "Registration details saved", userProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
