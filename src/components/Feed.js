import React, { useState, useEffect } from 'react'
import '../../src/App.css';
import { db,auth } from "../firebase";
import { collection, query, onSnapshot, orderBy, } from 'firebase/firestore';
import Post from './Post';
import AddInput from './AddInput';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Feed = (props) => {
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

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth,(user)=>{
      console.log(user,'user情報をチェック');
      !user && props.history.push("login");
    })
    return ()=> unSub();
  },[props.history])

  return (
    <div>

      {/*　記述5. ログアウトの処理 */}
      <button
      onClick={
        async () => {
          try{
            await signOut(auth);
            props.history.push('login');
          }catch(error){
            alert(error.message)
          }
        }
      }>
        ログアウト
      </button>
      <AddInput />
      {posts && posts.map((item) => (
        <Post
          id={item.id}
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
