import Footer from "@/components/main/footer";
import Header from "@/components/main/header";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard | e-sign",
};

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
