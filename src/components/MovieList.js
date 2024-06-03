import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import RequestMovie from "./RequestMovie";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const MovieList = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [requestedMovies, setRequestedMovies] = useState([]);

  const movies = [
    {
        id: 1,
        title: "Mad Max: Fury Road",
        description: "In a post-apocalyptic wasteland, Max teams up with Furiosa to escape a tyrant.",
        releaseDate: "2015-05-15",
        rating: 8.1
      },
      {
        id: 2,
        title: "The Revenant",
        description: "A frontiersman on a fur trading expedition fights for survival after being mauled by a bear.",
        releaseDate: "2015-12-25",
        rating: 8.0
      },
      {
        id: 3,
        title: "La La Land",
        description: "A jazz musician and an aspiring actress fall in love but struggle to maintain their relationship.",
        releaseDate: "2016-12-09",
        rating: 8.0
      },
      {
        id: 4,
        title: "Moonlight",
        description: "A young African-American man grapples with his identity and sexuality.",
        releaseDate: "2016-10-21",
        rating: 7.4
      },
      {
        id: 5,
        title: "Dunkirk",
        description: "Allied soldiers are surrounded by the German army and evacuated during a fierce battle in World War II.",
        releaseDate: "2017-07-21",
        rating: 7.9
      },
      {
        id: 6,
        title: "The Shape of Water",
        description: "A mute woman forms a unique relationship with an amphibious creature held in captivity.",
        releaseDate: "2017-12-01",
        rating: 7.3
      },
      {
        id: 7,
        title: "Black Panther",
        description: "T'Challa, the King of Wakanda, rises to the throne in the isolated, technologically advanced African nation.",
        releaseDate: "2018-02-16",
        rating: 7.3
      },
      {
        id: 8,
        title: "Parasite",
        description: "A poor family schemes to become employed by a wealthy family and infiltrate their household.",
        releaseDate: "2019-05-30",
        rating: 8.6
      },
      {
        id: 9,
        title: "1917",
        description: "Two British soldiers are sent to deliver an urgent message to an isolated regiment.",
        releaseDate: "2019-12-25",
        rating: 8.3
      },
      {
        id: 10,
        title: "Tenet",
        description: "Armed with only one word, Tenet, a protagonist fights for the survival of the world.",
        releaseDate: "2020-08-26",
        rating: 7.4
      },
      {
        id: 11,
        title: "Dune",
        description: "Feature adaptation of Frank Herbert's science fiction novel, about a son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
        releaseDate: "2021-10-22",
        rating: 8.1
      },
      {
        id: 12,
        title: "No Time to Die",
        description: "James Bond has left active service. His peace is short-lived when an old friend from the CIA turns up asking for help.",
        releaseDate: "2021-09-30",
        rating: 7.3
      },
      {
        id: 13,
        title: "Spider-Man: No Way Home",
        description: "Spider-Man's identity is revealed, bringing his superhero responsibilities into conflict with his normal life.",
        releaseDate: "2021-12-17",
        rating: 8.4
      },
      {
        id: 14,
        title: "The Batman",
        description: "In his second year of fighting crime, Batman uncovers corruption in Gotham City.",
        releaseDate: "2022-03-04",
        rating: 7.9
      },
      {
        id: 15,
        title: "Top Gun: Maverick",
        description: "After more than thirty years of service as a top Navy aviator, Pete Mitchell is where he belongs.",
        releaseDate: "2022-05-27",
        rating: 8.4
      },
      {
        id: 16,
        title: "Avatar: The Way of Water",
        description: "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together.",
        releaseDate: "2022-12-16",
        rating: 7.9
      },
      {
        id: 17,
        title: "Oppenheimer",
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        releaseDate: "2023-07-21",
        rating: 8.5
      },
      {
        id: 18,
        title: "Dune: Part Two",
        description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
        releaseDate: "2023-11-03",
        rating: 8.1
      },
      {
        id: 19,
        title: "The Marvels",
        description: "Carol Danvers, aka Captain Marvel, finds her powers entangled with those of Kamala Khan and Monica Rambeau.",
        releaseDate: "2024-02-14",
        rating: 7.2
      },
      {
        id: 20,
        title: "Mission: Impossible - Dead Reckoning Part One",
        description: "Ethan Hunt and his IMF team must track down a terrifying new weapon.",
        releaseDate: "2024-07-12",
        rating: 8.0
      }
  ];

  const filteredMovies = [...movies, ...requestedMovies].filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequest = (newMovie) => {
    setRequestedMovies([...requestedMovies, { ...newMovie, id: requestedMovies.length + movies.length + 1 }]);
  };

  const addToMyList = async (movie) => {
    console.log("addToMyList called", movie);
    if (!currentUser) {
      console.error("User not authenticated");
      alert("You need to be logged in to add movies to your list.");
      return;
    }

    try {
      
      const q = query(collection(db, "users", currentUser.uid, "myList"), where("id", "==", movie.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Movie already in your list");
        return;
      }

      
      const docRef = await addDoc(collection(db, "users", currentUser.uid, "myList"), movie);
      console.log("Document written with ID: ", docRef.id);
      alert("Movie added to your list");
    } catch (error) {
      console.error("Error adding movie to list:", error.message);
      alert("Failed to add movie to your list.");
    }
  };

  return (
    <div className="movie-list-container">
      <h1>Movie List</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="movie-list">
        {filteredMovies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} addToMyList={() => addToMyList(movie)} />
        ))}
      </ul>
      <RequestMovie onRequest={handleRequest} />
    </div>
  );
};

export default MovieList;

