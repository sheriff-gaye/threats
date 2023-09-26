import UserCard from "@/components/cards/UserCard";
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onbaording");

  const result=await fetchUsers({
    userId:user.id,
    searchString:"",
    pageNumber:1,
    pageSize:25,
  });

  return (
   <section>
    <h1 className='head-text mb-10'>Search</h1>


    <div className="mt-14  flex flex-col gap-9">
        {
            result.users.length===0 ? (
                <p className="no-result">No  users </p>
            )
            :(
                <>
                {
                    result.users.map((person)=>(
                        <UserCard id={person.id} key={person.key} name={person.name} username={person.username} imgUrl={person.image} personType="User" />

                    ))
                }
                </>
            )
        }

    </div>
   </section>
  )
}

export default Page