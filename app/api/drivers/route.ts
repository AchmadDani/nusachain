import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const drivers = await prisma.driver.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.json({ error: 'Failed to fetch drivers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDriver = await prisma.driver.create({
      data: {
        driverName: body.driverName,
        vehicleType: body.vehicleType,
        capacity: Number(body.capacity),
        currentLocation: body.currentLocation,
        destinationCity: body.destinationCity || null,
        availableDate: body.availableDate ? new Date(body.availableDate) : null
      }
    });
    return NextResponse.json(newDriver, { status: 201 });
  } catch (error) {
    console.error('Error creating driver:', error);
    return NextResponse.json({ error: 'Failed to create driver' }, { status: 500 });
  }
}
