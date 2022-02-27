import React, { useState, useEffect } from 'react'
import '../../src/App.css';
import { db } from "../firebase";
import { collection, query, onSnapshot, orderBy, } from 'firebase/firestore';
import Post from './Post';
import AddInput from './AddInput';

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      image: "",
      text: "",
      timestamp: null,
    },
  ]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);
  console.log(posts, "useStateの中身"); //データの流れを確認しましょう！

  return (
    <div>
      <AddInput />
      {posts && posts.map((item) => (
        <Post
          key={item.id}
          image={item.image}
          text={item.text}
          timestamp={item.timestamp}
        />
      ))}
    </div>
  )
}

export default Feed;
