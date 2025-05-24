import { AuthProvider } from "./context/AuthContext";
import Header from "./SharedComponents/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
           <ToastContainer position="top-right" autoClose={3000} style={{marginTop : '3%'}} />
        </AuthProvider>
      </body>
    </html>
  );
}
