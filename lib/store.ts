import { getStore } from '@netlify/blobs';

export interface BookingRecord {
  id: string;
  masterId: string;
  masterName: string;
  serviceIds: string[];
  serviceNames: string[];
  totalPrice: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientPhone: string;
  notes?: string;
  createdAt: string;
}

// In-memory local fallback store when Netlify Blobs context is unavailable locally
const localBookingsMemoryStore: Map<string, BookingRecord> = new Map();

/**
 * Get Netlify Blob store instance or return null if unconfigured locally
 */
function getNetlifyStore() {
  try {
    if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT) {
      return getStore('barbershop-bookings');
    }
  } catch (err) {
    console.warn('Netlify Blobs not initialized, using local fallback memory store.', err);
  }
  return null;
}

/**
 * Fetch all booked time slots for a specific master on a given date
 */
export async function getBookedSlots(masterId: string, date: string): Promise<string[]> {
  const store = getNetlifyStore();
  const bookedSlots: string[] = [];

  if (store) {
    try {
      const { blobs } = await store.list({ prefix: `booking:${date}:` });
      for (const blob of blobs) {
        const data = await store.get(blob.key, { type: 'json' }) as BookingRecord | null;
        if (data && (data.masterId === masterId || masterId === 'any')) {
          bookedSlots.push(data.time);
        }
      }
      return bookedSlots;
    } catch (error) {
      console.error('Error fetching slots from Netlify Blobs:', error);
    }
  }

  // Fallback to local memory store
  for (const booking of localBookingsMemoryStore.values()) {
    if (booking.date === date && (booking.masterId === masterId || masterId === 'any')) {
      bookedSlots.push(booking.time);
    }
  }

  return bookedSlots;
}

/**
 * Check if a slot is available
 */
export async function isSlotAvailable(masterId: string, date: string, time: string): Promise<boolean> {
  const bookedSlots = await getBookedSlots(masterId, date);
  return !bookedSlots.includes(time);
}

/**
 * Save a new booking record
 */
export async function saveBooking(booking: BookingRecord): Promise<boolean> {
  const key = `booking:${booking.date}:${booking.masterId}:${booking.time}:${booking.id}`;
  const store = getNetlifyStore();

  if (store) {
    try {
      await store.setJSON(key, booking);
      return true;
    } catch (error) {
      console.error('Error saving to Netlify Blobs:', error);
    }
  }

  // Save to local memory fallback
  localBookingsMemoryStore.set(booking.id, booking);
  return true;
}
