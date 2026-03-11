import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const supplies = await prisma.supply.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(supplies);
  } catch (error) {
    console.error('Error fetching supplies:', error);
    return NextResponse.json({ error: 'Failed to fetch supplies' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newSupply = await prisma.supply.create({
      data: {
        commodityName: body.commodityName,
        quantity: Number(body.quantity),
        originCity: body.originCity,
        price: Number(body.price),
        contactInfo: body.contactInfo
      }
    });
    return NextResponse.json(newSupply, { status: 201 });
  } catch (error) {
    console.error('Error creating supply:', error);
    return NextResponse.json({ error: 'Failed to create supply' }, { status: 500 });
  }
}
