# Student 3D Landing

Landing page for a university student lead campaign around a pre-recorded **3ds Max + V-Ray + Corona** course.

The form saves leads to Google Sheets. A unique coupon is generated automatically and stored in the sheet. Students do **not** see the coupon on the page; they get a thank-you message and the coupon is sent later on WhatsApp.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Google Apps Script
- Google Sheets

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Google Sheets setup

1. Create a Google Sheet.
2. Extensions → Apps Script.
3. Paste `google-apps-script/Code.gs`.
4. Project Settings → Script properties:
   - `SHARED_SECRET` = a long random string
5. Deploy → New deployment → Web app
   - Execute as: Me
   - Who has access: Anyone
6. Copy the Web App URL.
7. In `.env.local`:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
GOOGLE_SCRIPT_SECRET=the-same-shared-secret
COUPON_CODE=KARAZ
```

Coupons are stored as `KARAZ-XXXXXX` in the sheet. Never add `NEXT_PUBLIC_` to these secrets.

## Checklist

- [x] RTL Arabic landing page
- [x] Lead form + thank-you screen
- [x] `/api/leads` + Google Apps Script + Sheets
- [x] Unique coupon generated server-side (not shown to the student)
- [x] Duplicate phone/email protection
- [ ] Vercel production deploy
