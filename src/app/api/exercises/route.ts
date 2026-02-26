import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const exercises = await prisma.exercise.findMany({
            orderBy: { name: "asc" },
        });
        return NextResponse.json(exercises);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching exercises" }, { status: 500 });
    }
}
