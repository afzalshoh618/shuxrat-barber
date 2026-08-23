import { NextRequest, NextResponse } from 'next/server';
import { getBookedSlots } from '@/lib/store';
import { MASTERS, TIME_SLOTS } from '@/data/barbershop';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const masterId = searchParams.get('masterId') || 'master-any';
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Sana ko\'rsatilmadi' }, { status: 400 });
    }

    const realMasters = MASTERS.filter((m) => m.id !== 'master-any');
    let bookedSlots: string[] = [];

    if (masterId === 'master-any') {
      // Slot is booked ONLY if ALL 6 masters are booked at that time
      const masterBookingsMap = await Promise.all(
        realMasters.map(async (m) => ({
          masterId: m.id,
          slots: await getBookedSlots(m.id, date),
        }))
      );

      for (const time of TIME_SLOTS) {
        const isAllBooked = masterBookingsMap.every((mb) => mb.slots.includes(time));
        if (isAllBooked) {
          bookedSlots.push(time);
        }
      }
    } else {
      bookedSlots = await getBookedSlots(masterId, date);
    }

    return NextResponse.json({
      success: true,
      masterId,
      date,
      bookedSlots,
    });
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json({ error: 'Server xatoligi' }, { status: 500 });
  }
}
