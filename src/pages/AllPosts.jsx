import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log("📡 Fetching posts...");
        
        appwriteService.getPosts().then((response) => {
            if (response) {
                console.log("✅ Posts fetched successfully:", response.documents);
                setPosts(response.documents);
            } else {
                console.log("⚠️ No posts found!");
            }
        }).catch((error) => {
            console.error("❌ Error fetching posts:", error);
        });

    }, []); // ✅ `useEffect` only runs once when the component mounts

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <h2 className="text-center w-full">No posts available</h2>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
