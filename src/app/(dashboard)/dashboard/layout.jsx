import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard for e-sign",
};

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
