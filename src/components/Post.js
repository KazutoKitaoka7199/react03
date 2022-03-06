import React, {useState} from "react";
import { db } from '../firebase';
import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

const Post = ({ id, text, image, timestamp }) => {
  // text, image, timestamp はfirebaseからデータを頂戴！と言って取得した
  // ものをこのPotst.jsにデータを渡して→表示する　という仕組み

  // 更新用のuseStateを追加
  // Feed.jsからtextという目印にfirebaseのデータである「text: xxxx;」が渡ってきている
  // それを設定することで,初期値が登録されたtextのデータになる
  const [title, setTitle] = useState(text);

  // ポイント！(db,'posts')ここがコレクション（箱）にアクセスしている記述になります！間違えないように！
  const textRef = collection(db, 'posts');

  // 編集の処理
  const editTask = async () =>{
    await setDoc(
      // アクセスはどこにアクセスするの？＝ doc ドキュメント
      doc(textRef, id), //collection(db, 'posts') + id //23rfrwxzdfwefxefe(idのイメージ)　特定できる
      {
        text: title,
        timestamp: serverTimestamp(),
      },
      { merge: true}
    );
  }

  // 削除の処理
  const deleteTask = async() => {
      await deleteDoc(doc(textRef, id));
  }

  return (
    <div>
      {/* 記述1. テキスト(text)情報を受け取る */}
      <div>{text}</div>

      {/* 記述2. 画像(image)情報を受け取る */}
      {image && (
        <div>
          <img src={image} alt="画像あるとき" />
        </div>
      )}
      {!image}

      {/* 記述3. 日付(timestamp)情報を受け取る */}
      {/* 注意！firebaseのtimestampはjsの形式に変換する必要があるのでnew Dateを使用している */}
      <div>{new Date(timestamp?.toDate()).toLocaleString()}</div>

      {/* 更新、削除用の処理を追加で記述します😁 */}
      <hr />
      {/* 更新用のinput */}
      <input
        type="text"
        value={title} //useStateを追加
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* 編集、削除のボタンを設置 */}
      <><button onClick={editTask}>編集</button><button onClick={deleteTask}>削除</button></>
    </div>
  );
};

export default Post;
