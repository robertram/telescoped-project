import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  const allPosts = await api.post.getAll();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <CrudShowcase />

        <div className="gap-4 flex-col flex">
          {allPosts?.map((item: any, index: number) => {
            return (
              <div className="border-solid border-white border-2 rounded-md p-4 w-[200px]" key={index}>
                {item?.name}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}



async function CrudShowcase() {
  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
