import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const MyList = () => {
  const { currentUser } = useAuth();
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const fetchMyList = async () => {
      if (!currentUser) {
        console.error("User not authenticated");
        return;
      }

      try {
        const listCollection = collection(db, "users", currentUser.uid, "myList");
        const listSnapshot = await getDocs(listCollection);
        const list = listSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched my list:", list);
        setMyList(list);
      } catch (error) {
        console.error("Error fetching my list:", error);
      }
    };

    fetchMyList();
  }, [currentUser]);

  return (
    <div className="my-list-container">
      <h1>My List</h1>
      <ul>
        {myList.map((movie) => (
          <li key={movie.id} className="movie-item">
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
            <p>Rating: {movie.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyList;
