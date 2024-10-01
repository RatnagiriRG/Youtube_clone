import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";
import { YOUTUBE_API_URL } from "../../utils/constant";
import { parseData } from "../../utils";
import { HomePageVideo } from "../../Types";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
export const getSearchPageVideos = createAsyncThunk(
  "youtubeApp/serachPageVideos",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    const parsedData: HomePageVideo[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);