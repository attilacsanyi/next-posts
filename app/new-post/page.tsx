import FormSubmit from "@/components/form-submit";
import { storePost } from "@/lib/posts-dao";
import { redirect } from "next/navigation";

export const NewPostPage = async () => {
  async function createPost(formData: FormData) {
    "use server"; // directive needed for creating server actions
    const title = formData.get("title") as string;
    // const image = formData.get("image") as File;
    const content = formData.get("content") as string;

    await storePost({
      imageUrl: "",
      title,
      content,
      userId: 1, // TODO: get user id from session
    });

    redirect("/feed");
  }

  return (
    <>
      <h1>Create a new post</h1>
      <form action={createPost}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
      </form>
    </>
  );
};

export default NewPostPage;
