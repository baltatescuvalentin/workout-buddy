import { useAppSelector } from "../../hooks/useTypedStore";

function ProfileIndex() {
  const user = useAppSelector((state) => state.user);

  return (
    <div>
      <p className="text-3xl">Profile</p>
      <p className="text-lg mt-2">{user.fullName}</p>
    </div>
  );
}

export default ProfileIndex;
