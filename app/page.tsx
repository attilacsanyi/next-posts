import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts-dao";
import { type Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Latest Posts",
  description: "Browser our latest posts",
};

const LatestPosts = async () => {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
};

export default function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here&apos;s what you might&apos;ve missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
