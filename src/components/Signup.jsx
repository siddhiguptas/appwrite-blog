import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Logo, Input, Button, Loader } from "./index";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-customGray">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-customGray to-black" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl">
            <div className="flex justify-center mb-8">
              <Logo />
            </div>

            <h2 className="text-2xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Create Your Account
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-customBlue hover:text-white transition-colors"
              >
                Sign In
              </Link>
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
                <p className="text-red-500 text-center text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(create)} className="space-y-6">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                className="bg-black/50 border-white/10 focus:border-customBlue transition-colors"
                {...register("name", {
                  required: true,
                })}
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                className="bg-black/50 border-white/10 focus:border-customBlue transition-colors"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="bg-black/50 border-white/10 focus:border-customBlue transition-colors"
                {...register("password", {
                  required: true,
                })}
              />

              {loading ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : (
                <Button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-700 transition-all duration-200 hover:scale-105"
                >
                  Create Account
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
