import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate, userData]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="w-full min-h-screen bg-customGray">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-customGray to-black" />
      </div>

      <div className="relative w-full py-8 pt-24 ">
        <Container>
          <article className="max-w-4xl mx-auto backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl">
            {/* Featured Image */}
            <div className="relative w-full mb-8 overflow-hidden rounded-xl aspect-video">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="object-cover w-full h-full"
              />

              {isAuthor && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-colors">
                      🖊️
                    </Button>
                  </Link>
                  <Button
                    className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-colors"
                    onClick={deletePost}
                  >
                    ❌
                  </Button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <p>By {post.author}</p>
                <span>•</span>
                <p>{new Date(post.$createdAt).toLocaleDateString()}</p>
              </div>

              <div className="prose prose-invert max-w-none prose-lg prose-p:leading-relaxed prose-headings:text-white/90 prose-a:text-customBlue">
                {parse(String(post.content))}
              </div>
            </div>
          </article>
        </Container>
      </div>
    </div>
  ) : null;
}
