const ProfilePictureIcon = ({
  image,
  size,
}: {
  image: string;
  size: "sm" | "md" | "lg" | "xl" | "2xl";
}) => {
  const sizes = {
    sm: "w-[20px] h-[20px]",
    md: "w-[32px] h-[32px]",
    lg: "w-[40px] h-[40px]",
    xl: "w-[100px] h-[100px]",
    "2xl": "w-[150px] h-[150px]",
  };
  return (
    <div className="flex-shrink-0">
      <img
        src={image}
        className={`${sizes[size]} rounded-full object-cover`}
        alt="profile picture"
      />
    </div>
  );
};
export default ProfilePictureIcon;
