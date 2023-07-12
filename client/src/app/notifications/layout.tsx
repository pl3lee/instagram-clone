import GenericHeader from "../components/GenericHeader";

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full md:max-w-screen-sm">
      <GenericHeader title="Notifications" />

      {children}
    </div>
  );
}
