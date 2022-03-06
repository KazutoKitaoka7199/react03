import React, { useState, useEffect, } from "react";
import { auth } from "../firebase";
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login(props){
  // 記述1
  //ログイン状態の保持
  const [isLogin, setIsLogin] = useState(true);
  // メールの状態を保持
  const [email, setEmail] = useState("");
  // パスワードの状態を保持
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Firebase ver9 compliant(modular)
    const unSub = onAuthStateChanged(auth, (user) => {
      //  (user) これが何かをチェック
      console.log(user, 'user情報');
      // user情報がある = ログインされている状態、登録されているデータが存在するという意味

      user && props.history.push('/'); // Feed.js ?? なぜ？？　→ P40のこと
    });

    return () => unSub();
  },[props.history])

  return(
    // 記述3
    <div>
      {/* 文章の出し訳をしたいと思います😁 isLoginというuseStateのtrue/falseによって文字を出し分けます */}
      {/* isLoginの最初の状態は[true] です！　なので trueの時はログイン、falseの時は登録 */}
      {/* この書き方を三項演算子といいます😁 */}
      <h1>{isLogin ? "ログイン" : "登録"}</h1>

      <hr />
      {/* 記述4. 登録の際に使用するinput = emailの入力欄、とpasswordの入力欄を作成します😁 */}
      <input
        type="text" // type="email"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* 記述5. パスワードの入力欄になります😁 */}
      <input
        type="text" // type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* 記述6. 送信のボタンの切り替え */}
      <button
        onClick={

          // isLogin で切り替えます　ログインの処理を記述
          isLogin ? async () => {
            try{
              // Firebase ver9 compliant
              //inputで入力された email, passwordを設定する signInWithEmailAndPassword = 認証
              await signInWithEmailAndPassword(auth, email, password);
              props.history.push("/"); // Feedコンポーネントが表示される P40の処理
            }catch(error){
              alert(error.message, 'ログインがおかしいです！再度確認してください');
            }
          }
          : async () => {
            // 登録の処理
            try{
              // Firebase ver9 compliant
              //inputで入力された email, passwordを設定する createUserWithEmailAndPassword = 作成
              await createUserWithEmailAndPassword(auth, email, password);
              props.history.push("/"); // Feedコンポーネントが表示される P40の処理
            }catch(error){
                alert(error.message, "登録がおかしいです！再度確認してください");
            }
          }
        }
      >{isLogin ? "ログイン" : "登録"}</button>
      <hr/>

      <span onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? '新規登録' : "ログインに戻る"}
      </span>
    </div>
  );
};
