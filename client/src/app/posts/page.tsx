"use client";
import PostsHeader from "../components/PostsHeader";
import Navbar from "../components/Navbar";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Posts() {
  const { user, loading } = useAuth();
  const router = useRouter();
  if (user) {
    return (
      <div>
        <PostsHeader />
        <div className="text-3xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste dicta
          placeat quia, ullam debitis facere quis fugiat provident ea ad, non
          perferendis laborum rerum! Quibusdam mollitia molestias fugiat rerum
          soluta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
          inventore. Pariatur nam animi ipsum repellendus. Aliquam enim maiores
          earum, expedita ut quibusdam exercitationem, minus magni iste
          voluptates ipsa facere vel? Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Inventore temporibus quos animi nulla aperiam atque.
          Ullam soluta ad qui modi culpa dolor. Molestias similique consectetur
          pariatur placeat aliquam! Laudantium, earum. Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Eveniet quisquam porro minus,
          officia facere temporibus ullam accusantium. Modi voluptatum maxime
          atque veritatis omnis! Quibusdam qui maxime culpa delectus, deleniti
          accusamus! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Numquam iste eaque tenetur perferendis quasi porro officiis et
          laudantium veniam sit facilis hic, impedit saepe tempora vel eos
          dignissimos. Vero, corporis? Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Nihil doloremque, libero labore fuga suscipit porro
          tempore, aliquam impedit, blanditiis doloribus rerum enim eveniet
          mollitia cupiditate ab cum molestias reiciendis eaque!
        </div>
        <Navbar />
      </div>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    // router.push("/auth/login");
    return <div>Redirecting...</div>;
  }
}
