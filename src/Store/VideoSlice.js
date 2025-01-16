import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../Axios/AxiosInstance";

const initiaState = {
    Loading : true,
    LikeStatus : false,
    AllLikedVideos : []
}

const GetAllVideos = createAsyncThunk("get_all_videos",async (query)=>{
    try {
        const VideoResponse = await AxiosInstance.get("/video/search/v",
            {
                params:{
                    query : query
                }
            }
        )
        return VideoResponse.data
    } catch (error) {
        console.log(error.message)
        throw error.message
    }
})

const WatchVideo = createAsyncThunk("watch_video", async (videoId)=>{
    try {
        if(videoId){
            const response = await AxiosInstance.get(`/video/get-video/${videoId.videoId}`)
            return response.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error.message
    }
})

const GetUserVideos = createAsyncThunk("get_user_all_videos",async(userId)=>{
    try {
        if(userId){

            const Response = await AxiosInstance.get(`/dashboard/channel-videos/${userId}`)
    
            return Response.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const LikeVideo = createAsyncThunk("like_video",async(videoId)=>{
    try {
        if(videoId){
            const LikeResponse = await AxiosInstance.patch(`/like/like-video/${videoId.videoId}`)
                console.log(LikeResponse.data.data.liked)
            return LikeResponse.data.data.liked
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const GetLikedVideos = createAsyncThunk("get_all_likedVideos",async ()=>{
    try {
        const Response = await AxiosInstance.get("/like/get-liked-videos")
        if(Response){
            console.log(Response)
            return Response.data.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

const VideoSlice = createSlice({
    initialState: initiaState,
    name: "Video",
    reducers: {},
    extraReducers:(reducer)=>{
       reducer.addCase(GetAllVideos.pending,(state)=>{
        state.Loading = true;
       })
       reducer.addCase(GetAllVideos.fulfilled,(state,action)=>{
        state.Loading = false;
        state.Videos = action.payload;
       })
       reducer.addCase(WatchVideo.pending,(state)=>{
        state.Loading = true;
       })
       reducer.addCase(WatchVideo.fulfilled,(state,action)=>{
        state.Loading = true;
       })
       reducer.addCase(GetUserVideos.pending,(state)=>{
        state.Loading = true;
       })
       reducer.addCase(GetUserVideos.fulfilled,(state)=>{
        state.Loading = false;
       })
       reducer.addCase(LikeVideo.fulfilled,(state,action)=>{
        state.LikeStatus = action.payload;
       })
       reducer.addCase(GetLikedVideos.fulfilled,(state,action)=>{
        state.AllLikedVideos = action.payload;
       })
      
    }
})
export {
    GetAllVideos,
    WatchVideo,
    GetUserVideos,
    LikeVideo,
    GetLikedVideos
}

export default VideoSlice.reducer