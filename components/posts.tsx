"use client";

import { togglePostLikeStatus } from "@/actions/posts";
import Post from "@/components/post";
import { PostWithDetails } from "@/lib/types";
import { useOptimistic } from "react";


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
          <Post post={post} updateAction={updatePost} />
        </li>
      ))}
    </ul>
  );
}
