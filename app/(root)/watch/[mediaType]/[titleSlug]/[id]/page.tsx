import React from "react";

interface WatchPageProps {
  params: {
    id: string;
    mediaType: string;
    titleSlug: string;
  };
}

const WatchPage = ({ params }: WatchPageProps) => {
  const { id } = params;

  if (!id) {
    return <p>Loading</p>;
  }

  return (
    <iframe
      src={`https://vidsrc.to/embed/movie/${id}`}
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
