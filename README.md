# 🧥 WYSIWYG Outfit Builder - Next.js

A web-based **WYSIWYG outfit builder** built with **Next.js 13+ (App Router)**. Users can visually drag and drop clothing items onto a canvas, automatically layer them by category (e.g., top, bottom, cap), save the outfit locally, export it as a PNG image, or add it to a cart.

---

## 🚀 Features

- 🧲 **Drag and drop** clothing items onto a visual canvas
- 🧥 **Auto-layered stacking** by category (e.g., only one top at a time)
- 💾 **Save outfits** to local storage
- 🔁 **Reset outfit** button
- 🛒 **Add to cart** functionality (Zustand state)
- ✨ **Built with** Next.js 13+, Tailwind CSS, Zustand, html2canvas, Sonner

---

## 📦 Installation
Install dependencies
npm install


Run locally
npm run dev


Open the app
Go to http://localhost:3000


📁 Folder Structure
bash
Copy
Edit
/public/clothing-icons/       # Clothing assets grouped into folders (e.g., accessories, tops, bottoms)
/src/app/page.tsx             # Main outfit builder page
/lib/store.ts                 # Zustand store (cart management)
/lib/utils.ts                 # Utility functions
/components/ui/button.tsx    # Custom Button component
/tailwind.config.js           # Tailwind config (if manually added)
/postcss.config.js            # PostCSS config


🛠️ Tech Stack
Next.js 13+ (App Router)

Tailwind CSS for styling

Zustand for state management

Sonner for toast messages

html2canvas for exporting canvas as PNG


💡 Notes
Clothing assets should be placed in /public/clothing-icons/ inside respective folders like accessories/, tops/, bottoms/, etc.

PNG images with transparent backgrounds work best for clean stacking.

Only one item per category (top, bottom, shoe, cap, etc.) is shown on canvas at a time.

Export as PNG is handled using html2canvas.


📤 Deployment
This app is fully compatible with Vercel and can be deployed directly using vercel CLI or GitHub integration.


👨‍💻 Author
Ritik Kumar

📄 License
Licensed under the MIT License.