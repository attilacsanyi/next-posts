import { NewPost, PostWithDetails } from "@/lib/types";
import sqlite from "better-sqlite3";
import { unstable_cacheTag as cacheTag } from "next/cache";

const db = sqlite("posts.db");

const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPosts = async (maxNumber?: number) => {
  "use cache";
  let limitClause = "";

  if (maxNumber) {
    limitClause = "LIMIT ?";
  }

  // By design until there is no user switch: likes belongs to user id === 2 for now
  const stmt = db.prepare(`
    SELECT 
      posts.id,
      image_url AS image,
      title,
      content, 
      created_at AS createdAt,
      first_name AS userFirstName,
      last_name AS userLastName,
      COUNT(likes.post_id) AS likes,
      EXISTS(
        SELECT * 
        FROM likes 
        WHERE likes.post_id = posts.id 
        AND likes.user_id = 2
      ) AS isLiked
    FROM posts
    INNER JOIN users 
      ON posts.user_id = users.id
    LEFT JOIN likes 
      ON posts.id = likes.post_id
    GROUP BY posts.id
    ORDER BY createdAt DESC
    ${limitClause}
  `);

  await delay();

  cacheTag("posts");
  const posts = (
    maxNumber ? stmt.all(maxNumber) : stmt.all()
  ) as PostWithDetails[];

  return posts;
};

export const storePost = async (post: NewPost) => {
  const stmt = db.prepare(`
    INSERT INTO posts (image_url, title, content, user_id)
    VALUES (?, ?, ?, ?)`);

  await delay();

  return stmt.run(post.imageUrl, post.title, post.content, post.userId);
};

export const updatePostLikeStatus = async (postId: number, userId: number) => {
  const stmt = db.prepare(`
    SELECT COUNT(*) AS count
    FROM likes
    WHERE user_id = ? AND post_id = ?`);

  const isLiked = (stmt.get(userId, postId) as { count: number }).count === 0;

  if (isLiked) {
    const stmt = db.prepare(`
      INSERT INTO likes (user_id, post_id)
      VALUES (?, ?)`);

    await delay();

    return stmt.run(userId, postId);
  } else {
    const stmt = db.prepare(`
      DELETE FROM likes
      WHERE user_id = ? AND post_id = ?`);

    await delay();

    return stmt.run(userId, postId);
  }
};

export const deletePost = async (postId: number) => {
  const stmt = db.prepare(`DELETE FROM posts WHERE id = ?`);

  await delay();

  return stmt.run(postId);
};
