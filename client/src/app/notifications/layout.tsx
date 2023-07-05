import { Inter } from "next/font/google";
import PostsHeader from "../components/PostsHeader";
import GenericHeader from "../components/GenericHeader";
const inter = Inter({ subsets: ["latin"] });

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <GenericHeader title="Notifications" />
      {children}
    </div>
  );
}
