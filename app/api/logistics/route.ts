import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const logistics = await prisma.logisticsRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(logistics);
  } catch (error) {
    console.error('Error fetching logistics:', error);
    return NextResponse.json({ error: 'Failed to fetch logistics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newLogistics = await prisma.logisticsRequest.create({
      data: {
        commodity: body.commodity,
        weight: Number(body.weight),
        pickupLocation: body.pickupLocation,
        destinationLocation: body.destinationLocation,
        vehicleType: body.vehicleType,
        status: body.status || 'PENDING',
        assignedDriverId: body.assignedDriverId || null
      }
    });
    return NextResponse.json(newLogistics, { status: 201 });
  } catch (error) {
    console.error('Error creating logistics:', error);
    return NextResponse.json({ error: 'Failed to create logistics' }, { status: 500 });
  }
}
