"use client";

import {
  deletePost as deletePostAction,
  togglePostLikeStatus as togglePostLikeStatusAction,
} from "@/actions/posts";
import Post from "@/components/post";
import { PostWithDetails } from "@/lib/types";
import { useOptimistic } from "react";

export default function Posts({ posts }: { posts: PostWithDetails[] }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, { postId, action }: { postId: number; action: "like" | "delete" }) => {
      const foundPostIndex = prevPosts.findIndex((post) => post.id === postId);

      if (foundPostIndex === -1) {
        return prevPosts;
      }

      // Delete action
      if (action === "delete") {
        return [
          ...prevPosts.slice(0, foundPostIndex),
          ...prevPosts.slice(foundPostIndex + 1),
        ];
      }

      // Like action
      const updatedPost = { ...prevPosts[foundPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.likes ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;

      return [
        ...prevPosts.slice(0, foundPostIndex),
        updatedPost,
        ...prevPosts.slice(foundPostIndex + 1),
      ];
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const updatePost = async (postId: number) => {
    updateOptimisticPosts({ postId, action: "like" });
    await togglePostLikeStatusAction(postId);
  };

  const deletePost = async (postId: number, imageUrl: string) => {
    updateOptimisticPosts({ postId, action: "delete" });
    await deletePostAction(postId, imageUrl);
  };

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} updateAction={updatePost} deleteAction={deletePost} />
        </li>
      ))}
    </ul>
  );
}
