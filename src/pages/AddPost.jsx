import React from "react";
import { Container, PostForm } from "../Components";

function AddPost() {
  return (
    <div className="w-full min-h-screen bg-customGray">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-customGray to-black" />
      </div>

      <div className="relative w-full py-8">
        <Container>
          <div className="max-w-4xl mx-auto pt-24">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Create New Post
            </h1>
            <div className="backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl">
              <PostForm />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AddPost;
