"use client";
import useUser from "@/app/hooks/useUser";
const DMChat = ({ params }: { params: { _id: string } }) => {
  const { user: localUser, isLoading: userLoading } = useUser();
  const { _id } = params;
  return <div>Room id: {_id}</div>;
};

export default DMChat;
