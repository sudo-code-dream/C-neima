"use client"
import { useParams } from "next/navigation";
import React from "react";

const WatchPage = () => {
  const params = useParams();
  const { id } = params;

  if (!id) {
    return <p>Loading</p>;
  }

  return (
    <iframe
      src={`https://vidsrc.xyz/embed/movie/${id}`}
      width='100%'
      height='500'
      frameBorder='0'
      allowFullScreen
      allow='autoplay; encrypted-media'
      title={`Movie Player ${id}`}
    />
  );
};

export default WatchPage;
