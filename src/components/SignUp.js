import React from "react";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
  const styles = {
    container: ``,
    signUp: `bg-white absolute top-2/4 left-2/4 flex items-center justify-between flex-col w-96 py-6 px-3 rounded-2xl`,
    text: `text-2xl mb-8`,
    button: `flex items-center justify-center py-2 px-4 bg-sky-400 rounded-xl`,
    text_button: `flex items-center justify-center text-white font-semibold text-lg`,
    img: `w-10 h-10 rounded-xl mr-2`,
  };

  const { LogInWithGoogle } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await LogInWithGoogle();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signUp} style={{ margin: "-125px 0 0 -160px" }}>
        <h1 className={styles.text}>SignUp/LogIn</h1>
        <div className={styles.button}>
          <button onClick={handleGoogleSignIn} className={styles.text_button}>
            <img
              className={styles.img}
              alt="google img"
              src="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1"
            ></img>
            SignUp With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
