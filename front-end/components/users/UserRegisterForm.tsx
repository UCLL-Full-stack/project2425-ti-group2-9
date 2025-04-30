import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

const UserRegisterForm: React.FC = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const { t } = useTranslation();

  const clearErrors = () => {
    setErrors({});
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;
    const newErrors: { [key: string]: string | null } = {};

    if (!firstName.trim()) {
      newErrors.firstname = "first name is required";
      result = false;
    }

    if (!lastName.trim()) {
      newErrors.lastname = "last name is required";
      result = false;
    }

    if(!username.trim()) {
      newErrors.username = "username is required";
      result = false;
    }

    if (!email.trim()) {
      newErrors.email = "email is required";
      result = false;
    }

    if (!password.trim()) {
      newErrors.password = "email is required";
      result = false;
    }

    setErrors(newErrors);
    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) return;

    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    try {
      const response = await UserService.registerUser(newUser);
      if (response.status === 201 || response.status === 200) {
        setStatusMessages([
          {
            message: "Registration successful! You will be redirected to login page.",
            type: "success",
          },
        ]);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const error = await response.json();
        setStatusMessages([
          {
            message: error.message || "Registration failed",
            type: "error",
          },
        ]);
      }
    } catch (err) {
      setStatusMessages([
        {
          message: "An error occurred during registration",
          type: "error",
        },
      ]);
      console.error(err);
    }
  };

  return (
    <>
      <h3>Create an account</h3>
      {statusMessages.length > 0 && (
        <ul className="list-none mb-3 mx-auto">
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
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-sm font-medium">First name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            className="border rounded-lg p-2.5 w-full"
          />
          {errors.firstname && <div className="text-red-800">{errors.firstname}</div>}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Last name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            className="border rounded-lg p-2.5 w-full"
          />
          {errors.lastname && <div className="text-red-800">{errors.lastname}</div>}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-lg p-2.5 w-full"
          />
          {errors.username && <div className="text-red-800">{errors.username}</div>}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-2.5 w-full"
          />
          {errors.email && <div className="text-red-800">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-2.5 w-full"
          />
          {errors.password && <div className="text-red-800">{errors.password}</div>}
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default UserRegisterForm;