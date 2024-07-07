import { currentUser } from "@/lib/auth";

const ProfilePage = async () => {
  const user = await currentUser();
  //   if (!session || !session.user) redirect("/auth/signin");
  return (
    <div>
      <div className="grid grid-cols-4 gap-y-4">
        <p>Names:</p> <p className="col-span-3">{user?.name}</p>
        <p>Email:</p> <p className="col-span-3">{user?.email}</p>
        <p>Role:</p> <p className="col-span-3">{user?.role}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
