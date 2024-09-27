export interface InitialState {
  videos: HomePageVideo[];
  currentPlaying: CurrentPlaying | null;
  searchTerm: string;
  searchResult: [];
  nextPageToken: string | null;
  recommendedVideos: RecommendedVideos[];
}

export interface HomePageVideo {
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  videoLink: string;
  videoDuration: string;
  videoThumbnail: string;
  videoViews: string;
  videoAge: string;
  channelInfo: {
    id: string;
    image: string;
    name: string;
  };
}

export interface CurrentPlaying {}

export interface RecommendedVideos {}
