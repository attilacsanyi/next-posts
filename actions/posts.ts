"use server";

import { deleteImage, uploadImage } from "@/lib/cloudinary";
import {
  deletePost as deletePostDao,
  storePost,
  updatePostLikeStatus,
} from "@/lib/posts-dao";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (
  prevState: { errors: string[] },
  formData: FormData
) => {
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

  let imageUrl = "";

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      "Failed to upload image, post was not created. Please try again later.",
      { cause: error }
    );
  }

  // TODO: error handling
  await storePost({
    imageUrl,
    title,
    content,
    // By design until there is no user switch: new post belongs to user id === 1
    userId: 1,
  });

  //revalidatePath("/", "layout"); // All pages cache revalidation
  //revalidatePath("/feed"); // Specific page cache revalidation
  revalidateTag("posts");
  redirect("/feed");
};

export const togglePostLikeStatus = async (
  postId: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formData?: FormData
) => {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout"); // All pages cache revalidation
};

export const deletePost = async (postId: number, imageUrl: string) => {
  await deletePostDao(postId);
  try {
    await deleteImage(imageUrl);
  } catch (error) {
    throw new Error("Failed to delete image.", { cause: error });
  }

  revalidateTag("posts");
};
