import React, { useState, useEffect } from "react";
import { Container, PostCard, Button, Loader } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    const delayLoading = setTimeout(() => {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          setLoading(false);
        }
      });
    }, 2000);

    return () => clearTimeout(delayLoading);
  }, []);

  const handleAddPostClick = () => {
    navigate("/add-post");
  };

  return (
    <div className="w-full min-h-screen bg-customGray">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-customGray to-black" />
      </div>

      <div className="relative w-full pt-24 pb-8">
        <Container>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Explore Posts
            </h1>

            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader />
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posts.map((post) => (
                  <div
                    key={post.$id}
                    className="transform hover:scale-105 transition-transform duration-200"
                  >
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="backdrop-blur-sm bg-black/40 rounded-2xl p-8 text-center border border-white/10 shadow-xl">
                <p className="text-gray-400 mb-6 text-lg">
                  No posts available yet
                </p>
                {authStatus ? (
                  <Button
                    onClick={handleAddPostClick}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-700 transition-all duration-200 hover:scale-105"
                  >
                    Create Your First Post
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/signup")}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-700 transition-all duration-200 hover:scale-105"
                  >
                    Sign Up to Start Posting
                  </Button>
                )}
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AllPosts;
