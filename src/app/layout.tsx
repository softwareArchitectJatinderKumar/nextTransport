import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-light">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
