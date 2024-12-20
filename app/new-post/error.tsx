"use client";

export const NewPostError = ({ error }: { error: Error }) => {
  return (
    <>
      <h2>An error occurred!</h2>
      <p>Unfortunately, something went wrong.</p>
      <p>{error.message}</p>
    </>
  );
};

export default NewPostError;
