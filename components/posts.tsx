"use client";

import { togglePostLikeStatus } from "@/actions/posts";
import { formatDate } from "@/lib/format";
import { PostWithDetails } from "@/lib/types";
import Image from "next/image";
import { useOptimistic } from "react";
import LikeButton from "./like-icon";

function Post({
  post,
  action,
}: {
  post: PostWithDetails;
  action: (postId: number) => Promise<void>;
}) {
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
              action={action.bind(null, post.id)}
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
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId: number) => {
      const updatedPostIndex = prevPosts.findIndex(
        ({ id: postId }) => postId === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.likes ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;

      return [
        ...prevPosts.slice(0, updatedPostIndex),
        updatedPost,
        ...prevPosts.slice(updatedPostIndex + 1),
      ];
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const updatePost = async (postId: number) => {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  };

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
