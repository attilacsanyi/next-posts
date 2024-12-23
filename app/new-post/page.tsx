import PostForm from "@/components/post-form";
import { storePost } from "@/lib/posts-dao";
import { redirect } from "next/navigation";

export const NewPostPage = () => {
  async function createPost(
    prevState: { errors: string[] },
    formData: FormData
  ) {
    "use server"; // directive needed for creating server actions
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const content = formData.get("content") as string;

    const errors = [];

    if (!title || title.length < 3) {
      errors.push("Title must be at least 3 characters long");
    }

    if (!content || content.length < 10) {
      errors.push("Content must be at least 10 characters long");
    }

    if (!image || image.size === 0) {
      errors.push("Image is required");
    }

    if (errors.length > 0) {
      return { ...prevState, errors };
    }

    await storePost({
      imageUrl: "",
      title,
      content,
      userId: 1, // TODO: get user id from session
    });

    redirect("/feed");
  }

  return <PostForm action={createPost} />;
};

export default NewPostPage;
