import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts-dao";

export const generateMetadata = async (/** searchParams, params */) => {
  const posts = await getPosts();
  return {
    title: `Browse all our ${posts.length} posts`,
    description: "All posts by all users",
  };
};

const FeedPage = async () => {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
};

export default FeedPage;
