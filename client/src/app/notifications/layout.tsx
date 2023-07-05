import GenericHeader from "../components/GenericHeader";

export default function NotificationsLayout({
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
