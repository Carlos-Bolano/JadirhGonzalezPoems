"use client";
import React, { useState, useEffect } from "react";
import Heart from "@/icons/Heart";
import { incrementLikes, decrementLikes } from "@/lib/actions/poem.actions";
import { usePathname } from "next/navigation";

interface LikeButtonProps {
  poemId: string;
  initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ poemId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const pathname = usePathname();
  const isPoempage = pathname === "/blog" || pathname === "/";

  useEffect(() => {
    const likedPoems = JSON.parse(localStorage.getItem("likedPoems") || "[]");
    if (likedPoems.includes(poemId)) {
      setHasLiked(true);
    }
  }, [poemId]);

  const handleLikeClick = async () => {
    if (isLiking) return;
    setIsLiking(true);
    const newLikes = hasLiked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setHasLiked(!hasLiked);

    const likedPoems = JSON.parse(localStorage.getItem("likedPoems") || "[]");
    if (hasLiked) {
      const updatedLikedPoems = likedPoems.filter(
        (id: string) => id !== poemId
      );
      localStorage.setItem("likedPoems", JSON.stringify(updatedLikedPoems));

      const updatedLikes = await decrementLikes(poemId);
      if (updatedLikes === null) {
        setLikes(likes);
        setHasLiked(hasLiked);
        alert("Failed to update likes.");
      } else {
        setLikes(updatedLikes);
      }
    } else {
      likedPoems.push(poemId);
      localStorage.setItem("likedPoems", JSON.stringify(likedPoems));

      const updatedLikes = await incrementLikes(poemId);
      if (updatedLikes === null) {
        setLikes(likes);
        setHasLiked(hasLiked);
        alert("Failed to update likes.");
      } else {
        setLikes(updatedLikes);
      }
    }

    setIsLiking(false);
  };

  return (
    <button
      className={`flex gap-1 items-center justify-center ${
        hasLiked ? "text-red-500" : ""
      }`}
      onClick={handleLikeClick}
      disabled={isLiking}
    >
      <Heart fill={hasLiked ? "currentColor" : "none"} />
      <span className="text-Text">{likes}</span>
      <span className={isPoempage ? "hidden" : "block text-Text"}>
        {likes > 1 ? "Likes" : "Like"}
      </span>
    </button>
  );
};

export default LikeButton;
