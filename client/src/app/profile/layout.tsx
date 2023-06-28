import { Inter } from "next/font/google";
import ProfileHeader from "../components/ProfileHeader";
const inter = Inter({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProfileHeader />
      {children}
    </div>
  );
}
