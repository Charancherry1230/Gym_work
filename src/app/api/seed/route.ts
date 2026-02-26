import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const exercises = [
    // Chest
    {
        name: "Bench Press",
        category: "Chest",
        description: "A classic compound movement for building chest mass and strength.",
        targetMuscles: ["Pectorals", "Triceps", "Front Deltoids"],
        suggestedSets: 4,
        suggestedReps: 10,
    },
    {
        name: "Incline Dumbbell Press",
        category: "Chest",
        description: "Targets the upper portion of the pectoral muscles.",
        targetMuscles: ["Upper Pectorals", "Triceps", "Front Deltoids"],
        suggestedSets: 3,
        suggestedReps: 12,
    },
    {
        name: "Cable Flyes",
        category: "Chest",
        description: "Isolation movement for stretching and contracting the chest.",
        targetMuscles: ["Pectorals"],
        suggestedSets: 3,
        suggestedReps: 15,
    },
    // Back
    {
        name: "Deadlift",
        category: "Back",
        description: "The king of compound exercises for overall back and posterior chain strength.",
        targetMuscles: ["Lower Back", "Erector Spinae", "Traps", "Hamstrings", "Glutes"],
        suggestedSets: 3,
        suggestedReps: 5,
    },
    {
        name: "Lat Pulldown",
        category: "Back",
        description: "Excellent for building back width.",
        targetMuscles: ["Latissimus Dorsi", "Biceps", "Rear Deltoids"],
        suggestedSets: 4,
        suggestedReps: 10,
    },
    {
        name: "Bent Over Rows",
        category: "Back",
        description: "Builds back thickness and strength.",
        targetMuscles: ["Middle Back", "Lats", "Biceps", "Rear Deltoids"],
        suggestedSets: 4,
        suggestedReps: 10,
    },
    // Legs
    {
        name: "Barbell Squats",
        category: "Legs",
        description: "The primary exercise for building leg size and strength.",
        targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Lower Back"],
        suggestedSets: 4,
        suggestedReps: 8,
    },
    {
        name: "Leg Press",
        category: "Legs",
        description: "Compound movement for targeting all areas of the legs.",
        targetMuscles: ["Quadriceps", "Hamstrings", "Glutes"],
        suggestedSets: 3,
        suggestedReps: 12,
    },
    {
        name: "Bulgarian Split Squat",
        category: "Legs",
        description: "Unilateral exercise for balance and leg development.",
        targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
        suggestedSets: 3,
        suggestedReps: 10,
    },
    // Shoulders
    {
        name: "Military Press",
        category: "Shoulders",
        description: "Overhead press for building strong, broad shoulders.",
        targetMuscles: ["Deltoids", "Triceps", "Upper Chest"],
        suggestedSets: 4,
        suggestedReps: 8,
    },
    {
        name: "Lateral Raises",
        category: "Shoulders",
        description: "Isolation movement for the lateral deltoid to improve shoulder width.",
        targetMuscles: ["Lateral Deltoids"],
        suggestedSets: 3,
        suggestedReps: 15,
    },
    // Arms
    {
        name: "Bicep Curls",
        category: "Arms",
        description: "Standard isolation movement for building bicep size.",
        targetMuscles: ["Biceps"],
        suggestedSets: 3,
        suggestedReps: 12,
    },
    {
        name: "Tricep Pushdowns",
        category: "Arms",
        description: "Cable isolation for tricep definition and strength.",
        targetMuscles: ["Triceps"],
        suggestedSets: 3,
        suggestedReps: 12,
    },
    // Cardio
    {
        name: "Running",
        category: "Cardio",
        description: "High intensity cardiovascular exercise.",
        targetMuscles: ["Cardiovascular System", "Legs"],
        suggestedSets: 1,
        suggestedReps: 30,
    },
];

export async function GET() {
    try {
        const count = await prisma.exercise.count();
        if (count > 0) {
            return NextResponse.json({ message: "Database already seeded", count });
        }

        console.log("Start seeding exercises via API...");
        for (const exercise of exercises) {
            await prisma.exercise.create({
                data: exercise,
            });
        }

        return NextResponse.json({ message: "Seeding finished successfully" });
    } catch (error) {
        console.error("Seeding API error:", error);
        return NextResponse.json({ message: "Seeding failed", error: String(error) }, { status: 500 });
    }
}
