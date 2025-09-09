import axios from "axios";

export const getFriends = (userId) =>
  axios.get(`/api/friends/${userId}`, { withCredentials: true });

export const addFriend = (userId, friendEmail) =>
  axios.post(
    "/api/friends/add",
    { userId, friendEmail },
    { withCredentials: true }
  );
