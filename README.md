# Wedding Invitation Website

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/RafGaming/Wedding-Invite.git
   cd Wedding-Invite
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables:
   - Create a `.env` file and add your configuration details.

## Features
- Beautiful and customizable wedding invitation templates.
- RSVP functionality allowing guests to respond.
- Photo gallery to showcase couple’s journey.
- Detailed schedule of the wedding events.
- Contact form for guests to reach out directly.

## Deployment Guide
1. Choose a hosting platform (e.g., Vercel, Netlify).
2. Push your code to the hosting repository.
3. Connect your domain to the hosted app.
4. Make sure to set up environment variables in your host settings.

## Customization Options
- Change colors and fonts by modifying the CSS files located in the `styles` directory.
- Update the content of the invitation in the `src/pages` directory.
- Add your own images in the `src/assets/images` folder.

## Adding Your Photos

Place your image files in the `public/bg/` folder using the following filenames:

- `/bg/timeline-first-met.jpg` — Photo for the "First Met" milestone
- `/bg/timeline-first-date.jpg` — Photo for the "First Date" milestone
- `/bg/timeline-proposal.jpg` — Photo for "The Proposal" milestone
- `/bg/timeline-big-day.jpg` — Photo for "The Big Day" milestone
- `/bg/gallery-1.jpg` — "Our First Photo"
- `/bg/gallery-2.jpg` — "Adventures Together"
- `/bg/gallery-3.jpg` — "The Proposal"
- `/bg/gallery-4.jpg` — "Engagement Party"
- `/bg/gallery-5.jpg` — "Pre-Wedding Shoot"
- `/bg/gallery-6.jpg` — "With Family"
- `/bg/save-the-date-bg.jpg` — Background image for the Save the Date section
- `/bg/rsvp-bg.jpg` — Background image for the RSVP section

The site will still display correctly even if these images are not yet added.
---

## 📸 Wedding Photo Upload (QR Feature)

Guests can scan the QR code on the invitation to upload photos taken during the wedding.

### Supabase Setup

1. Create a `wedding_photos` table:
```sql
CREATE TABLE wedding_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  uploader_name TEXT NOT NULL,
  comment TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

2. Create a Supabase Storage bucket called `wedding-photos` with public access.

3. Update your Row Level Security (RLS) policies:
```sql
-- Allow anyone to insert and view photos
ALTER TABLE wedding_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON wedding_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON wedding_photos FOR SELECT USING (true);
```

4. Set up storage policies to allow public uploads to the `wedding-photos` bucket:
   - Go to your Supabase project → Storage → `wedding-photos` bucket
   - Add a policy allowing `INSERT` for all users (anon role)
   - Add a policy allowing `SELECT` (public read) for the `objects` table

### QR Code
Replace the placeholder QR code in the invitation (`ScrollSections.js`) with one that points to your deployed URL + `/upload`:

**Example:** `https://your-wedding-site.vercel.app/upload`

You can generate a QR code at: https://www.qrcode-monkey.com/

Once generated, replace the `<QRCodeSection>` component's SVG with your actual QR code image, or embed it as an `<img>` tag pointing to the generated QR code image file in `/public/`.

### Photo Upload Page
The upload page is available at `/upload`. Features include:
- Camera capture support for mobile devices
- Drag & drop or file selection
- Live photo feed of all uploaded photos
- Beautiful mobile-optimized design matching the invitation theme
