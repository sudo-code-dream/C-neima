// pages/api/fetchMovieEmbed.ts

import type { NextApiRequest, NextApiResponse } from "next";

type SuccessResponse = {
  html: string;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid or missing ID" });
  }

  try {
    const response = await fetch(`https://vidsrc.to/embed/movie/${id}`);
    const html = await response.text();

    return res.status(200).json({ html });
  } catch (error) {
    console.error("Fetch failed:", error);
    return res.status(500).json({ error: "Failed to fetch embed HTML" });
  }
}
