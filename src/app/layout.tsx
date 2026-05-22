import type { Metadata } from 'next';
import './globals.css';

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
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
