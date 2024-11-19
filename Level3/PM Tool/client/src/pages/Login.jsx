import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice"; // Import logout action

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // Initialize dispatch
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      // Simulate API call for user authentication
      const response = await fakeAuthAPI(data); // Replace with actual API call
      console.log("Login successful", response);
      // Navigate to dashboard upon successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Redirect to home or login page
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Simulated API function (replace with real API)
  const fakeAuthAPI = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === "test@example.com" && data.password === "password") {
          resolve({ message: "Authenticated successfully!" });
        } else {
          reject(new Error("Invalid email or password."));
        }
      }, 1000);
    });
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
              Manage all your tasks in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-bounce'></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
          >
            <div>
              <p className='text-blue-600 text-3xl font-bold text-center'>
                Welcome back!
              </p>
              <p className='text-center text-base text-gray-700'>
                Keep all your credentials safe.
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register("email", {
                  required: "Email Address is required!",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address!",
                  },
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='your password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
                Forgot Password?
              </span>

              <Button
                type='submit'
                label={loading ? "Submitting..." : "Submit"}
                className={`w-full h-10 bg-blue-700 text-white rounded-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              />
            </div>
          </form>

          {/* Logout button - displayed if the user is logged in */}
          {user && (
            <button
              onClick={handleLogout}
              className='mt-4 w-full h-10 bg-red-600 text-white rounded-full'
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
