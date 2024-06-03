// src/components/RequestMovie.js
import React, { useState } from "react";

const RequestMovie = ({ onRequest }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRequest({ title, description, releaseDate, rating });
    setTitle("");
    setDescription("");
    setReleaseDate("");
    setRating("");
  };

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <h2>Request a Movie</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="date"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.1"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
        required
      />
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestMovie;
