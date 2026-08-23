# ROYAL CUTS — Premium Barbershop Booking & Landing Web App

Altegio va boshqa shablon SaaS vidjetlaridan ancha ustun, to'liq brendlashtirilgan, kinemotografik dizayn va 4 bosqichli onlayn navbat olish tizimi.

---

## 🌟 Loyiha Afzalliklari

- **Kinematik va Oliy Darajadagi Dizayn**: Chuqur qora (#09090B) va oltin (#C9A15A) aksentlar, glassmorphism kartochkalar, yuqori sifatli rasmlar.
- **To'liq Landing + Booking**: Shunchaki oddiy forma emas — Hero, Biz Haqimizda (Showroom), Ustalar kartochkalari, Xizmatlar menusi, Mijozlar sharhi, Manzil va Xarita.
- **Interaktiv 4-Bosqichli Booking Wizard**: Usta → Xizmatlar (ko'p xizmat tanlash) → Sana & Vaqt slotlari (real-vaqt rejimida band slotlarni yashirish) → Mijoz ma'lumotlari.
- **Telegram Bot Integratsiyasi**: Har bir yangi bron qilinganda Telegram botga mijoz ismi, telefoni, usta, xizmat va vaqt haqida darhol xabar boradi.
- **Netlify Blobs Qo'llab-Quvvatlashi**: Serverless muhitda band slotlarni saqlash va tekshirish (mahalliy muhitda avtomatik xotira fallback ishlaydi).

---

## 🚀 Mahalliy Muhitda Ishga Tushirish

1. **Kutubxonalarni o'rnatish:**
```bash
npm install
```

2. **`.env.local` faylini yaratish:**
Loyihaning ildiz papkasida `.env.local` faylini yarating va quyidagi o'zgaruvchilarni kiriting:
```env
TELEGRAM_BOT_TOKEN=8123456789:AAE... (Telegram Bot tokeningiz)
TELEGRAM_CHAT_ID=123456789 (Xabar borishi kerak bo'lgan Admin Chat ID)
```

3. **Dev Serverni ishga tushirish:**
```bash
npm run dev
```
Brauzerda `http://localhost:3000` manzilini oching.

---

## ☁️ Netlify'ga Deploy Qilish Yo'riqnomasi

Loyihani Netlify'ga osongina ulashingiz mumkin:

1. **GitHub Repository'ga yuklash:**
   Kodingizni GitHub profilingizga push qiling.

2. **Netlify'da Yangi Sayt Yaratish:**
   - [Netlify Dashboard](https://app.netlify.com)'ga kiring.
   - **Add new site** → **Import an existing project** tugmasini bosing.
   - GitHub repongizni tanlang.

3. **Deploy Sozlamalari (Avtomatik aniqlanadi):**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

4. **Environment Variables Kiratish:**
   Sayt sozlamalarida **Site settings** → **Environment variables** bo'limiga o'ting va quyidagilarni qo'shing:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

5. **Deploy Site** tugmasini bosing. Netlify Next.js App Router va API route'larni avtomatik ravishda serverless funksiyalarga aylantiradi.

---

## 📱 Telegram Bot Yaratish (Qisqa eslatma)

1. Telegram'da `@BotFather` botiga kirib `/newbot` buyrug'ini bering.
2. Bot tokenini ko'chirib oling (`TELEGRAM_BOT_TOKEN`).
3. Telegram'da `@userinfobot` botiga `/start` yuboring va o'z Chat ID'ingizni oling (`TELEGRAM_CHAT_ID`).
4. Botga birinchi marta `/start` yuborishni unutmang.
