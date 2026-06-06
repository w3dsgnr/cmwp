import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Self-hosted via next/font so the URLs resolve correctly regardless of basePath.
const segoe = localFont({
  src: [
    { path: '../../public/fonts/SegoeUI-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/SegoeUI.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/SegoeUI-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/SegoeUI-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/SegoeUI-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/SegoeUI-BoldItalic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-segoe',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'CMWP — Commercial Real Estate Advisory',
  description:
    'Independent commercial real estate advisory in Cyprus — development, occupiers, investment, delivery and workplace strategy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // suppressHydrationWarning: the head script adds `reveal-js` to <html> before
  // hydration; that intentional pre-hydration mutation would otherwise trip a
  // hydration attribute-mismatch warning on this element.
  return (
    <html lang="en" className={segoe.variable} suppressHydrationWarning>
      <head>
        {/* Set before paint so reveal targets hide instantly (with JS) but
            stay visible if JS is disabled. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
