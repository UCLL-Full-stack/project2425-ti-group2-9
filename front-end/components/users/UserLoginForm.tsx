import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

const UserLoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);  

  const clearErrors = () => {
    setUsernameError("");
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!username && username.trim() === "") {
      setUsernameError("username is required");
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError("Password is required");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    setStatusMessages([{message: 'Login successful. Redirecting to homepage...', type:'success'}]);

    sessionStorage.setItem("loggedInUser", username);

    setTimeout(() => {
      router.push("/");
    }, 2000);
    
  }

  return (
    <>
      <h3 className="px-0">Login</h3>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          Username:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {usernameError && <div className="text-red-800">{usernameError}</div>}
        </div>
        <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
          Password:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );  
};

export default UserLoginForm;