
import DeleteButton from "@/components/delete-button";
import { formatDate } from "@/lib/format";
import { PostWithDetails } from "@/lib/types";
import Image from "next/image";
import LikeButton from "./like-button";

const Post = ({
    post,
    updateAction,
    deleteAction,
  }: {
    post: PostWithDetails;
    updateAction: (postId: number) => Promise<void>;
    deleteAction: (postId: number, imageUrl: string) => Promise<void>;
  }) => {
    return (
        <article className="post">
          <div className="post-image">
            <Image src={post.imageUrl} alt={post.title} className="post-image" fill />
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
              <div className="post-actions">
                <form
                  action={updateAction.bind(null, post.id)}
                  className={post.isLiked ? "liked" : undefined}
                >
                  <LikeButton />
                </form>
                {!post.isLiked && (
                  <form action={deleteAction.bind(null, post.id, post.imageUrl)}>
                    <DeleteButton />
                  </form>
                )}
              </div>
            </header>
            <p>{post.content}</p>
          </div>
        </article>
      );
}

export default Post
