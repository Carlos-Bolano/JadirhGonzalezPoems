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

  // Check if the user has already liked this poem when the component mounts
  useEffect(() => {
    const likedPoems = JSON.parse(localStorage.getItem("likedPoems") || "[]");
    if (likedPoems.includes(poemId)) {
      setHasLiked(true);
    }
  }, [poemId]);

  const handleLikeClick = async () => {
    if (isLiking) return;

    setIsLiking(true);

    // Optimistically update the UI
    const newLikes = hasLiked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setHasLiked(!hasLiked);

    // Update the localStorage
    const likedPoems = JSON.parse(localStorage.getItem("likedPoems") || "[]");
    if (hasLiked) {
      // Remove like
      const updatedLikedPoems = likedPoems.filter(
        (id: string) => id !== poemId
      );
      localStorage.setItem("likedPoems", JSON.stringify(updatedLikedPoems));

      // Call server action to decrement likes count in the database
      const updatedLikes = await decrementLikes(poemId);
      if (updatedLikes === null) {
        // Revert the UI change if the action fails
        setLikes(likes);
        setHasLiked(hasLiked);
        alert("Failed to update likes.");
      } else {
        // Sync the likes count with the server response
        setLikes(updatedLikes);
      }
    } else {
      // Add like
      likedPoems.push(poemId);
      localStorage.setItem("likedPoems", JSON.stringify(likedPoems));

      // Call server action to increment likes count in the database
      const updatedLikes = await incrementLikes(poemId);
      if (updatedLikes === null) {
        // Revert the UI change if the action fails
        setLikes(likes);
        setHasLiked(hasLiked);
        alert("Failed to update likes.");
      } else {
        // Sync the likes count with the server response
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
      {likes}
      <span className={isPoempage ? "hidden" : "block"}>
        {likes > 1 ? "Likes" : "Like"}
      </span>
    </button>
  );
};

export default LikeButton;
