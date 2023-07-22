import Input from "@/components/Input";
import { useState, useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import Meta from "@/components/Meta";

const Auth = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      const returnValue = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (returnValue?.status === 200) {
        router.push("/profiles");
      } else {
        alert(returnValue?.error);
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      //login();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="relative h-screen flex justify-center items-center">
      <Meta title={variant === "login" ? "Sign in" : "Register"} />
      <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute h-screen flex justify-center items-center">
        <div className="px-10 py-10 bg-black bg-opacity-60 flex flex-col gap-4 rounded-xl ">
          <div className="mt-4  text-4xl text-white mb-4">Sign in</div>
          {variant === "register" ? (
            <Input
              id="name"
              type="text"
              label="Username"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          ) : null}
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <div className="flex flex-row gap-24">
            {variant === "login" ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  className="bg-red-600 w-5 h-5 mr-2  text-gray-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="myCheckbox" className="text-zinc-600">
                  Remember Me
                </label>
              </div>
            ) : null}
            <div className="flex items-center">
              <div className="text-sm text-gray-500">Need Help?</div>
            </div>
          </div>
          <div className="flex flex-row gap-6 flex justify-center items-center mt-10">
            <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center">
              <FcGoogle size={30} />
            </div>
            <div
              onClick={() => signIn("github", { callbackUrl: "/profiles" })}
              className="w-8 h-8 rounded-full bg-white flex justify-center items-center"
            >
              <GrGithub size={30} className="text-black" />
            </div>
          </div>

          <button
            onClick={variant === "login" ? login : register}
            className="bg-red-700 py-3 rounded-md mt-5"
          >
            {variant === "login" ? "Sign in" : "Register"}
          </button>

          <div className="flex flex-row gap-2">
            <div className="text-sm text-gray-300">
              {variant === "login"
                ? "New to Netflix?"
                : "Already have an account?"}
            </div>
            <div
              onClick={toggleVariant}
              className="text-sm text-gray-500 cursor-pointer hover:underline"
            >
              {variant === "login" ? "Sign up now." : "Login"}
            </div>
          </div>
          <div className="mt-10 w-[20rem] text-sm">
            <div>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
              <a href="#" className="text-sky-500 hover:underline">
                {" "}
                Learn more.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
