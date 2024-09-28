import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Slidebar from "../components/Slidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomePageVideo } from "../Types";
import Card from "../components/Card";

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    console.log(videos);
    dispatch(getHomePageVideos(false));
  }, [dispatch]);
  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Slidebar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={850}
            
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
              {videos.map((item: HomePageVideo) => {
                return <Card data={item} key={item.videoId} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
