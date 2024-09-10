"use client";

const { useAuth } = require("@/contexts/auth");
const { useState } = require("react");

const Auth = () => {
  const auth = useAuth();

  const [isRegister, setIsRegister] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (isRegister) {
      const name = e.target[2].value;
      auth.actions.register(email, password, name);
    } else {
      auth.actions.login(email, password);
    }
  };

  if (auth.isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Welcome {auth.user?.name}</h1>
        <button onClick={auth.actions.logout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={onSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          className="p-2 m-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 m-2 border border-gray-300 rounded-md"
        />
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            className="p-2 m-2 border border-gray-300 rounded-md"
          />
        )}
        <button
          type="submit"
          className="p-2 m-2 border border-gray-300 rounded-md"
        >
          {isRegister ? "Register" : "Login"}
        </button>
        <button
          type="button"
          className="p-2 m-2 border border-gray-300 rounded-md"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "or Login" : "or Register"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
