// Represents the raw database table structure
export type Post = {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
};

// Represents the query result with joined and computed fields
export type PostWithDetails = {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  createdAt: string;
  userFirstName: string;
  userLastName: string;
  likes: number;
  isLiked: boolean;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type Like = {
  userId: number;
  postId: number;
};

// For creating new posts, based on the raw table structure
export type NewPost = {
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
};
