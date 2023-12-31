import { Inter } from "next/font/google";
import PostsHeader from "../components/PostsHeader";
const inter = Inter({ subsets: ["latin"] });

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex-col items-center flex md:max-w-screen-sm">
      <PostsHeader />
      {children}
    </div>
  );
}
