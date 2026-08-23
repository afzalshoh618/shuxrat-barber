import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveBooking, isSlotAvailable, BookingRecord, getBookedSlots } from '@/lib/store';
import { MASTERS, SERVICES } from '@/data/barbershop';

const bookingSchema = z.object({
  masterId: z.string().min(1, 'Usta tanlanishi shart'),
  serviceIds: z.array(z.string()).min(1, 'Kamida bitta xizmat tanlanishi shart'),
  date: z.string().min(1, 'Sana tanlanishi shart'),
  time: z.string().min(1, 'Vaqt tanlanishi shart'),
  clientName: z.string().min(2, 'Ism kamida 2 harfdan iborat bo\'lishi shart'),
  clientPhone: z.string().min(7, 'Telefon raqam noto\'g\'ri'),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    let { masterId, serviceIds, date, time, clientName, clientPhone, notes } = validatedData;

    const realMasters = MASTERS.filter((m) => m.id !== 'master-any');

    // Auto-resolve master if "Farqi yo'q" (master-any) was selected
    if (masterId === 'master-any') {
      let assignedMasterId = '';
      for (const m of realMasters) {
        const isFree = await isSlotAvailable(m.id, date, time);
        if (isFree) {
          assignedMasterId = m.id;
          break;
        }
      }

      if (!assignedMasterId) {
        return NextResponse.json(
          { error: 'Kechirasiz, tanlangan 40-minutlik vaqt slotida barcha ustalar alaqachon band qilingan. Iltimos, boshqa vaqt tanlang.' },
          { status: 409 }
        );
      }
      masterId = assignedMasterId;
    } else {
      // Check slot availability for specific master
      const available = await isSlotAvailable(masterId, date, time);
      if (!available) {
        return NextResponse.json(
          { error: 'Kechirasiz, ushbu ustamiz ko\'rsatilgan vaqt slotida alaqachon band. 1 vaqtga 2 kishi navbat ololmaydi.' },
          { status: 409 }
        );
      }
    }

    // Resolve final master details
    const master = MASTERS.find((m) => m.id === masterId) || realMasters[0];

    // Resolve services details
    const selectedServices = SERVICES.filter((s) => serviceIds.includes(s.id));
    const serviceNames = selectedServices.map((s) => s.title);
    const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

    const bookingId = 'RC-' + Math.floor(100000 + Math.random() * 900000);

    const bookingRecord: BookingRecord = {
      id: bookingId,
      masterId: master.id,
      masterName: master.name,
      serviceIds,
      serviceNames,
      totalPrice,
      date,
      time,
      clientName,
      clientPhone,
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    // Save to storage (Netlify Blobs with local fallback)
    await saveBooking(bookingRecord);

    // Send Telegram Notification
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const messageText = `
🔔 *YANGI BRON QABUL QILINDI!*
🆔 *Bron ID:* \`${bookingId}\`

👤 *Mijoz:* ${escapeMarkdown(clientName)}
📞 *Tel:* [${escapeMarkdown(clientPhone)}](tel:${clientPhone.replace(/\s+/g, '')})
💈 *Usta:* ${escapeMarkdown(master.name)}
✂️ *Xizmat:* ${escapeMarkdown(serviceNames.join(', '))}
💰 *Jami summa:* ${totalPrice.toLocaleString('uz-UZ')} UZS
📅 *Sana:* ${date}
🕐 *Vaqt:* ${time} (40 min)
${notes ? `📝 *Izoh:* ${escapeMarkdown(notes)}` : ''}

👑 *ROYAL CUTS BARBERSHOP*
      `.trim();

      try {
        const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: messageText,
            parse_mode: 'MarkdownV2',
          }),
        });

        if (!tgResponse.ok) {
          const errText = await tgResponse.text();
          console.error('Telegram API notification failed:', errText);
        }
      } catch (tgError) {
        console.error('Telegram fetch error:', tgError);
      }
    } else {
      console.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variable missing. Notification skipped.');
    }

    return NextResponse.json({
      success: true,
      booking: bookingRecord,
      message: 'Broningiz muvaffaqiyatli qabul qilindi!',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map((issue: z.ZodIssue) => issue.message).join(', ') },
        { status: 400 }
      );
    }

    console.error('Error in /api/book route:', error);
    return NextResponse.json({ error: 'Serverda xatolik yuz berdi' }, { status: 500 });
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*\[\]()~`>#+\-=|{}.!]/g, '\\$&');
}
