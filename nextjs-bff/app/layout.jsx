import "./styles.css";

export const metadata = {
  title: "Axion Process OS",
  description: "Next.js backend-for-frontend adapter for Axion Process OS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
