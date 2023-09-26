import UserCard from "@/components/cards/UserCard";
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onbaording");

  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5 ">
        {activity.length > 0 ? <>
        {
            activity.map((activity)=>(
                <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                    <article className="activity-card">
                        <Image src={activity.author.image} height={20} width={20}  alt="profile_picture" className="rounded-full  object-contain"/>

                        <p className="!text-small-regular text-ligh-1">
                            <span className="mr-1 text-primary-500">
                                {
                                    activity.author.name
                                }
                            </span>{""}
                            reply to your thread
                        </p>

                        
                    </article>
                </Link>
            ))
        }
        </> : <p className="text-base-regular text-light-2">No Activity Yet</p>}
      </section>
    </section>
  );
};

export default Page;
