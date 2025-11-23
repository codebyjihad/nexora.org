"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FiHeart, FiMessageCircle, FiShare2 } from "react-icons/fi";
// import { CommentModal } from "../Comment-Modal/Comment";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  image: string;
  user: string;
  userAvatar: string;
};

const PostCard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const [userLikes, setUserLikes] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(`https://dummyjson.com/posts?limit=10&skip=${page * 10}`);
      const data: { posts: Post[] } = await res.json();

      if (!data.posts || data.posts.length === 0) {
        setHasMore(false);
        return;
      }

      const newPosts: Post[] = data.posts.map(post => ({
        ...post,
        image: `https://picsum.photos/500/300?random=${post.id}`,
        user: `User ${post.userId}`,
        userAvatar: `https://i.pravatar.cc/150?img=${post.userId}`,
      }));

      setPosts(prev => [...prev, ...newPosts]);
      setPage(prev => prev + 1);

      const newUserLikes: Record<number, boolean> = {};
      const newLikeCounts: Record<number, number> = {};

      newPosts.forEach(post => {
        newUserLikes[post.id] = false;
        newLikeCounts[post.id] = Math.floor(Math.random() * 100);
      });

      setUserLikes(prev => ({ ...prev, ...newUserLikes }));
      setLikeCounts(prev => ({ ...prev, ...newLikeCounts }));
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) fetchPosts();
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleLike = (id: number) => {
    const wasLiked = userLikes[id] || false;
    const newLikedState = !wasLiked;
    setUserLikes(prev => ({ ...prev, [id]: newLikedState }));
    setLikeCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + (wasLiked ? -1 : 1),
    }));
  };

  return (
    <>
      {posts.map((post, index) => {
        const isLast = posts.length === index + 1;
        const isLiked = userLikes[post.id] || false;
        const likeCount = likeCounts[post.id] || 0;

        return (
          <Card
            key={post.id}
            ref={isLast ? lastPostRef : null}
            className="w-full max-w-3xl mx-auto bg-black-mood-second-color rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300 mb-6"
          >
            <CardHeader className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.userAvatar} alt={post.user} />
              </Avatar>
              <div className="flex flex-col">
                <h4 className="text-md font-semibold text-black-mood-second-text-color">{post.user}</h4>
              </div>
            </CardHeader>

            <CardContent className="mt-3">
              <h5 className="text-black-mood-text-color font-bold">{post.title}</h5>
              <p className="text-black-mood-text-color text-sm line-clamp-3 mt-1">{post.body}</p>
              <div className="mt-3 w-full h-64 overflow-hidden rounded-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between mt-3">
              <Button
                variant="ghost"
                className={`flex items-center gap-2 ${isLiked ? "text-red-500" : "text-black-mood-second-text-color"}`}
                onClick={() => handleLike(post.id)}
              >
                <FiHeart className={isLiked ? "text-red-500" : ""} /> {likeCount > 0 ? likeCount : "Like"}
              </Button>

              <Button
                variant="ghost"
                className="flex items-center gap-2 text-black-mood-second-text-color hover:text-blue-500"
                onClick={() => setIsCommentModalOpen(true)}
              >
                <FiMessageCircle /> Comment
              </Button>

              <Button
                variant="ghost"
                className="flex items-center gap-2 text-black-mood-second-text-color hover:text-green-500"
              >
                <FiShare2 /> Share
              </Button>
            </CardFooter>
          </Card>
        );
      })}

      {loading && (
        <p className="text-center text-gray-400 my-4 text-4xl">
          <Spinner />
        </p>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500 my-4">
          <b>No more posts</b>
        </p>
      )}

      {/* <CommentModal isOpen={isCommentModalOpen} onOpenChange={setIsCommentModalOpen} /> */}
    </>
  );
};

export default PostCard;
