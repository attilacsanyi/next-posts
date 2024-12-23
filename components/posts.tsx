import { togglePostLikeStatus } from "@/actions/posts";
import { formatDate } from "@/lib/format";
import { PostWithDetails } from "@/lib/types";
import Image from "next/image";
import LikeButton from "./like-icon";

function Post({ post }: { post: PostWithDetails }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image src={post.image} alt={post.title} className="post-image" fill />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              ø Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={togglePostLikeStatus.bind(null, post.id)}
              className={post.isLiked ? "liked" : undefined}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: PostWithDetails[] }) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
