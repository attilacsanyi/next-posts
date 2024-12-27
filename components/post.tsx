import DeleteButton from "@/components/delete-button";
import { formatDate } from "@/lib/format";
import { PostWithDetails } from "@/lib/types";
import Image, { type ImageLoaderProps } from "next/image";
import LikeButton from "./like-button";

const cloudinaryLoader = ({ src, quality }: ImageLoaderProps) => {
  // 128px (8rem) * 2 for retina displays = 256px
  const normalizedWidth = 256;

  const [urlStart, urlEnd] = src.split("upload/");
  // Add c_scale for better quality scaling and f_auto for automatic format selection
  const transformations = `c_scale,w_${normalizedWidth},q_${
    quality || 75
  },f_auto`;

  return `${urlStart}upload/${transformations}/${urlEnd}`;
};

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
        <Image
          loader={cloudinaryLoader}
          src={post.imageUrl}
          alt={post.title}
          quality={50}
          fill
          sizes="128px"
        />
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
};

export default Post;
