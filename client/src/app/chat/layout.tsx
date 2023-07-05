import GenericHeader from "../components/GenericHeader";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <GenericHeader title="Chat" />
      {children}
    </div>
  );
}
