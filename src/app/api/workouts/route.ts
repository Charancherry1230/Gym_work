import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { name, exercises } = await req.json();

        if (!name || !exercises || !Array.isArray(exercises)) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }

        const workout = await prisma.workout.create({
            data: {
                name,
                userId: (session.user as { id: string }).id,
                exercises: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    create: exercises.map((ex: any) => ({
                        exerciseId: ex.exerciseId,
                        sets: ex.sets,
                        reps: ex.reps,
                        weight: ex.weight,
                    })),
                },
            },
        });

        return NextResponse.json(workout);
    } catch (error) {
        console.error("Workout creation error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const workouts = await prisma.workout.findMany({
            where: { userId: (session.user as { id: string }).id },
            include: {
                exercises: {
                    include: { exercise: true }
                },
                progressLogs: true
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(workouts);
    } catch {
        return NextResponse.json({ message: "Error fetching workouts" }, { status: 500 });
    }
}
