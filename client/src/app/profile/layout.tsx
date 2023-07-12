import { Inter } from "next/font/google";
import ProfileHeader from "../components/ProfileHeader";
const inter = Inter({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full md:w-full md:pl-20">
      <ProfileHeader />
      {children}
    </div>
  );
}
