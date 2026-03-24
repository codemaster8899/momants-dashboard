"use client";
import { useLogin } from "@/hooks/fetch/auth/useLogin";
import { useMe } from "@/hooks/fetch/useMe";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const FormSection = () => {
  const router = useRouter();
  const { login, loading, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { fetchMe } = useMe();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ identifier: username, password, rememberMe });

    // if no result it means no error from backend
    if (!result) {
      await fetchMe(); // fetch user information
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-[350px]">
      <h2 className="self-start text-3xl text-black font-extrabold">
        Welcome Back
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-2 mt-4"
      >
        {/* email section */}
        <label className="text-sm font-medium text-black">Email or Name</label>
        <input
          placeholder="Email or Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full text-sm px-3 py-2 rounded-lg ${error ? "border-[2px] border-red-600" : "border border-gray-200"} placeholder-gray-500`}
          required
        />

        {/* password section */}
        <label className="text-sm font-medium text-black mt-3">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full text-sm px-3 py-2 border rounded-lg ${error ? "border-[2px] border-red-600" : "border border-gray-200"} placeholder-gray-500`}
          required
        />

        {/* keep logged in checkbox */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="w-4 h-4 mr-2 rounded-sm border border-gray-200 appearance-none
               checked:bg-white checked:border-gray-200
               relative
               checked:after:content-['✔'] checked:after:text-black
               checked:after:absolute checked:after:top-0 checked:after:left-0
               checked:after:w-full checked:after:h-full
               checked:after:flex checked:after:items-center checked:after:justify-center
               after:pointer-events-none"
          />
          <label
            htmlFor="remember"
            className="text-sm text-black font-[500] cursor-pointer"
          >
            Remember me
          </label>
        </div>

        {error && (
          <div className="bg-red-600 px-2 py-1 momants-light-extrasmall-white rounded-full text-center">
            {error}
          </div>
        )}

        {/* login button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full text-sm bg-black hover:bg-gray-700 text-white font-[400] py-2.5 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in" : "Sign in"}
        </button>
      </form>
    </div>
  );
};
