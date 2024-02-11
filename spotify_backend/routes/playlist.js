const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");
const router = express.Router();

// creating new playlist
router.post(
   "/create",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
      const currentUser = req.user;
      const { name, thumbnail, songs } = req.body;

      if (!name || !thumbnail || !songs) {
         return res.status(301).json({ error: "Insufficient Data" });
      }

      const playlistData = {
         name,
         thumbnail,
         songs,
         owner: currentUser._id,
         collaborators: [],
      };

      const playlist = await Playlist.create(playlistData);
      return res.status(200).json(playlist);
   }
);

// get a playlsit by id
router.get(
   "/get/playlist/:playlistId",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
      const playlistId = req.params.playlistId;
      const playlist = await Playlist.findOne({ _id: playlistId });

      if (!playlist) {
         return res.status(301).json({ error: "Playlist doesn't exist" });
      }
      return res.status(200).json(playlist);
   }
);

// get all playlist made by an artist
router.get(
   "/get/artist/:artistId",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
      const artistId = req.params.artistId;

      const artist = await User.findOne({ _id: artistId });
      if (!artist) {
         return res.status(304).json({ error: "Invalid Artist ID" });
      }

      const playlists = await Playlist.find({ owner: artistId });
      return res.status(200).json({ data: playlists });
   }
);

// add a song to a playlist
router.post(
   "/add/song",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
      const currentUser = req.user;
      const { playlistId, songId } = req.body;
      const playlist = await Playlist.findOne({ _id: playlistId });

      // checking if playlist exists
      if (!playlist) {
         return res.status(304).json({ erorr: "Playlist doesn't exist" });
      }

      // checking if the currentUser owns the playlist or is a collaborator
      if (
         !playlist.owner.equals(currentUser._id) &&
         !playlist.collaborators.includes(currentUser._id)
      ) {
         return res.status(400).json({ error: "Not Allowed!" });
      }

      // checking if song is valid
      const song = await Song.findOne({ _id: songId });
      if (!song) {
         return res.status(304).json({ error: "Song doesn't exist" });
      }

      // adding song to the playlist
      playlist.songs.push(songId);
      await playlist.save();

      return res.status(200).json(playlist);
   }
);

module.exports = router;
