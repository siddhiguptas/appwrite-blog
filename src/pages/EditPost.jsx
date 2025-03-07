import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../Components";
import appwriteService from "../appwrite/config";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else navigate("/");
  }, [slug, navigate]);

  return post ? (
    <div className="w-full min-h-screen bg-customGray">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-customGray to-black" />
      </div>

      <div className="relative w-full py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Edit Post
            </h1>
            <div className="backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl">
              <PostForm post={post} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  ) : null;
}

export default EditPost;
