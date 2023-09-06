import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onbaording");

  return (
    <>
      <h1 className="head-text">Hello Create</h1>
      <PostThread userId={userInfo._id}/>
    </>
  );
}

export default Page;
