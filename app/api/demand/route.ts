import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const demands = await prisma.demand.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(demands);
  } catch (error) {
    console.error('Error fetching demands:', error);
    return NextResponse.json({ error: 'Failed to fetch demands' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDemand = await prisma.demand.create({
      data: {
        commodityName: body.commodityName,
        quantity: Number(body.quantity),
        destinationCity: body.destinationCity,
        neededDate: new Date(body.neededDate),
        notes: body.notes
      }
    });
    return NextResponse.json(newDemand, { status: 201 });
  } catch (error) {
    console.error('Error creating demand:', error);
    return NextResponse.json({ error: 'Failed to create demand' }, { status: 500 });
  }
}
