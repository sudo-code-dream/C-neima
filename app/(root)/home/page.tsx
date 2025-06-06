"use client";
import HomeMainContent from "@/components/HomeMainContent";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "@/store/movieoSlice";
import axiosClient from "@/lib/axiosClient";
import Trending from "@/components/Trending";

const page = () => {
  const dispatch = useDispatch();



  const fetchTrendingData = async () => {
    try {
      const responce = await axiosClient.get("/trending/all/week");

      dispatch(setBannerData(responce.data.results));
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const responce = await axiosClient.get("/configuration");

      dispatch(setImageURL(responce.data.images.secure_base_url + "original"));

      console.log(responce.data.images.secure_base_url + "original");
    } catch (error) {
      console.log("Error fetching configuration:", error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <>
      <div className='w-full'>
        <HomeMainContent />
        <Trending />
      </div>
    </>
  );
};

export default page;
