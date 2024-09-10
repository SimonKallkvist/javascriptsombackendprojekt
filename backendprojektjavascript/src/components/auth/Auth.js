"use client";

import styles from "./auth.module.css";
import { useRouter } from "next/navigation";

const { useAuth } = require("@/contexts/auth");
const { useState, useEffect } = require("react");

// const Auth = () => {
//   const auth = useAuth();
//   const router = useRouter();
//   const [isRegister, setIsRegister] = useState(true);
//   const [error, setError] = useState("");

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target[0].value;
//     const password = e.target[1].value;

//

//   useEffect(() => {
//     if (auth.isLoggedIn) {
//       router.push("/");
//     }
//   }, [auth.isLoggedIn, router]);

//   if (auth.isLoggedIn) {
//     return null;
//   }

//   return (
//     <div className="h-screen flex flex-col items-center justify-center ">
//       <h2 className={styles.welcome}>Welcome to the inventory LAB</h2>
//       <form className={styles.formBox} onSubmit={onSubmit}>
//         <div className={styles.flexBoxH}>
//           <input
//             type="email"
//             placeholder="Email"
//             className={styles.inputField}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className={styles.inputField}
//           />
//         </div>
//         {error && <p>{error}</p>}
//         {isRegister && (
//           <input type="text" placeholder="Name" className={styles.inputField} />
//         )}
//         <div className={styles.buttonBox}>
//           <button type="submit" className={`${styles.btn} ${styles.primary}`}>
//             {isRegister ? "Register" : "Login"}
//           </button>
//           <button
//             type="button"
//             className={`${styles.btn} ${styles.seconday}`}
//             onClick={() => setIsRegister(!isRegister)}
//           >
//             {isRegister
//               ? "Already have an account?"
//               : "Need to create a new Account?"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Auth;

const Auth = () => {
  const auth = useAuth();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(true);
  const [error, setError] = useState(""); // State for error messages

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // try {
    //       if (isRegister) {
    //         const name = e.target[2].value;
    //         await auth.actions.register(email, password, name);
    //       } else {
    //         await auth.actions.login(email, password);
    //       }
    //     } catch (error) {
    //       setError(error.message || "An error occured");
    //     }
    //   };

    try {
      if (isRegister) {
        const name = e.target[2].value;
        const error = await auth.actions.register(email, password, name);
        if (error) {
          setError(error); // Set error if registration fails
        }
      } else {
        const error = await auth.actions.login(email, password);
        if (error) {
          setError(error); // Set error if login fails
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred"); // General error handling
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      router.push("/");
    }
  }, [auth.isLoggedIn, router]);

  if (auth.isLoggedIn) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className={styles.welcome}>Welcome to the inventory LAB</h2>
      <form className={styles.formBox} onSubmit={onSubmit}>
        <div className={styles.flexBoxH}>
          <input
            type="email"
            placeholder="Email"
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}{" "}
        {/* Display error */}
        {isRegister && (
          <input type="text" placeholder="Name" className={styles.inputField} />
        )}
        <div className={styles.buttonBox}>
          <button type="submit" className={`${styles.btn} ${styles.primary}`}>
            {isRegister ? "Register" : "Login"}
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.seconday}`}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account?"
              : "Need to create a new Account?"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
