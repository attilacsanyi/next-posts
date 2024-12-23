"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost } from "@/lib/posts-dao";
import { redirect } from "next/navigation";

export const createPost = async (
  prevState: { errors: string[] },
  formData: FormData
) => {
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

  redirect("/feed");
};
