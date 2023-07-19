"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import FormRequirement from "@/app/components/FormRequirement";
import { backendURL } from "@/app/backendURL";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [emailAcceptable, setEmailAcceptable] = useState(false);
  // checks if password has length >= 8, has a number and a letter, no spaces, only contains numbers, letters, and symbols
  const [password, setPassword] = useState("");
  const [passwordGoodLength, setPasswordGoodLength] = useState(false);
  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasLetter, setPasswordHasLetter] = useState(false);
  const [passwordNoSpaces, setPasswordNoSpaces] = useState(false);
  const [
    passwordContainsOnlyValidCharacters,
    setPasswordContainsOnlyValidCharacters,
  ] = useState(false);
  const [passwordAcceptable, setPasswordAcceptable] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmAcceptable, setPasswordConfirmAcceptable] =
    useState(false);
  const [username, setUsername] = useState("");

  const [usernameNotExists, setUsernameNotExists] = useState(false);
  const [usernameGoodLength, setUsernameGoodLength] = useState(false);
  const [usernameNoSpaces, setUsernameNoSpaces] = useState(false);
  const [usernameAcceptable, setUsernameAcceptable] = useState(false);

  const [dataAcceptable, setDataAcceptable] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email, password, username).catch((err) => console.log(err));
  };

  useEffect(() => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
      setEmailAcceptable(true);
    } else {
      setEmailAcceptable(false);
    }
  }, [email]);

  // checks username exists
  useEffect(() => {
    if (username != "") {
      axios.get(`${backendURL}/users/exists/${username}`).then((response) => {
        setUsernameNotExists(!response.data.exists);
      });
      setUsernameGoodLength(username.length >= 5 && username.length <= 15);
      setUsernameNoSpaces(!username.includes(" "));
    } else {
      setUsernameNotExists(false);
      setUsernameGoodLength(false);
      setUsernameNoSpaces(false);
    }
  }, [username]);

  useEffect(() => {
    setUsernameAcceptable(
      usernameNotExists && usernameGoodLength && usernameNoSpaces
    );
  }, [usernameNotExists, usernameGoodLength, usernameNoSpaces, username]);

  useEffect(() => {
    if (password.length == 0) {
      setPasswordGoodLength(false);
      setPasswordHasNumber(false);
      setPasswordHasLetter(false);
      setPasswordNoSpaces(false);
      setPasswordContainsOnlyValidCharacters(false);
    } else {
      // checks if password has length >= 8, has a number and a letter, no spaces, only contains numbers, letters, and symbols
      if (password.length >= 8) {
        setPasswordGoodLength(true);
      }
      if (/\d/.test(password)) {
        setPasswordHasNumber(true);
      }
      if (/[a-zA-Z]/.test(password)) {
        setPasswordHasLetter(true);
      }
      if (!/\s/.test(password)) {
        setPasswordNoSpaces(true);
      }
      if (/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password)) {
        setPasswordContainsOnlyValidCharacters(true);
      }
    }
  }, [password]);
  useEffect(() => {
    setPasswordAcceptable(
      passwordGoodLength &&
        passwordHasNumber &&
        passwordHasLetter &&
        passwordNoSpaces &&
        passwordContainsOnlyValidCharacters
    );
  }, [
    passwordGoodLength,
    passwordHasNumber,
    passwordHasLetter,
    passwordNoSpaces,
    passwordContainsOnlyValidCharacters,
  ]);

  useEffect(() => {
    setPasswordConfirmAcceptable(
      password === passwordConfirm && password != ""
    );
  }, [passwordConfirm, password]);

  useEffect(() => {
    setDataAcceptable(
      emailAcceptable &&
        usernameAcceptable &&
        passwordAcceptable &&
        passwordConfirmAcceptable
    );
  }, [
    email,
    emailAcceptable,
    usernameAcceptable,
    username,
    password,
    passwordAcceptable,
    passwordConfirm,
    passwordConfirmAcceptable,
  ]);

  return (
    <div className="flex w-full justify-center align-middle p-16 h-screen">
      <div className="flex flex-col gap-10">
        <div className="text-bold text-3xl text-center">Instagram</div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="flex flex-col gap-1">
            <FormRequirement
              text="Email must be valid"
              state={emailAcceptable}
            />
          </div>
          <input
            type="text"
            className="auth-input"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <div className="flex flex-col gap-1">
            <FormRequirement
              text="Username must be unique"
              state={usernameNotExists}
            />
            <FormRequirement
              text="Username must be between 5 and 15 characters"
              state={usernameGoodLength}
            />
            <FormRequirement
              text="Username must not contain spaces"
              state={usernameNoSpaces}
            />
          </div>
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex flex-col gap-1">
            <FormRequirement
              text="Password must be at least 8 characters"
              state={passwordGoodLength}
            />
            <FormRequirement
              text="Password must contain a number"
              state={passwordHasNumber}
            />
            <FormRequirement
              text="Password must contain a letter"
              state={passwordHasLetter}
            />
            <FormRequirement
              text="Password must not contain spaces"
              state={passwordNoSpaces}
            />
            <FormRequirement
              text="Password must only contain letters, numbers, and symbols"
              state={passwordContainsOnlyValidCharacters}
            />
          </div>
          <input
            type="password"
            className="auth-input"
            placeholder="Confirm Password"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <div className="flex flex-col gap-1">
            <FormRequirement
              text="Passwords must match"
              state={passwordConfirmAcceptable}
            />
          </div>

          <button
            type="submit"
            className="bg-accentBlue text-white p-2 rounded disabled:bg-gray-400"
            disabled={!dataAcceptable}
          >
            Register
          </button>
        </form>
        <div>
          Already have an account?{" "}
          <Link className="text-linkBlue" href="/auth/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
