import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbRefresh } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [emailorphone, setEmailorphone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [emailorphoneError, setEmailorphoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setGeneratedCaptcha(captcha);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    setLoading(true);
    if (captchaInput !== generatedCaptcha) {
      setCaptchaError("Captcha is incorrect. Please try again.");
      isValid = false;
    } else {
      setCaptchaError("");
    }

    if (!emailorphone) {
      setEmailorphoneError("Email or phone is required.");
      isValid = false;
    } else {
      setEmailorphoneError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/login`,
        {
          emailOrPhone: emailorphone,
          password,
        }
      );
      const { token, name } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);

      console.log("Login successful");
      navigate("/reboots/admin-dashboard-home");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("Invalid credentials")) {
          setEmailorphoneError("Invalid email or phone number.");
          setPasswordError("Invalid password.");
        } else {
          setEmailorphoneError(errorMessage);
          setPasswordError(errorMessage);
        }
      } else {
        console.error("Login failed", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center h-[100vh] overflow-y-scroll bg-no-repeat bg-cover bg-center overflow-x-hidden items-center bg-[#2E2F32]"
      style={{ backgroundImage: 'url("../adminimages/loginbg.png")' }}
    >
      <div className="lg:w-[40%] xl:w-[35%] sm:w-[95%] md:w-[60%] h-fit py-5 lg:px-6 xl:px-16 gap-8 flex flex-col boxsh rounded-lg text-white bg-[#191C20]">
        <div className="flex flex-col gap-8">
          <div className="flex justify-center items-center text-[#63B263] text-2xl font-bold">
            REBOOTS ADMIN PANEL
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xl font-medium">
              <span className="text-[#63B263] font-semibold">Hello, </span>let’s
              get started
            </div>
            <div className="text-base font-medium">Sign in to continue</div>
          </div>
        </div>
        <form
          className="flex flex-col sm:gap-5 lg:gap-2 xl:gap-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 font-semibold text-white">
            <label className="text-sm">Mobile Number/ Email ID:</label>
            <input
              type="text"
              value={emailorphone}
              onChange={(e) => setEmailorphone(e.target.value)}
              className="bg-[#2A3038] text-white rounded-sm sm:h-[2.5rem] xl:h-[3.5rem] p-2 text-lg focus:outline-[#5BC0DE] focus:outline-none"
            />
            {emailorphoneError && (
              <div className="text-red-500 text-sm mt-1">
                {emailorphoneError}
              </div>
            )}
          </div>
          <div className="flex flex-col font-semibold text-white gap-2">
            <label className="text-sm">Password:</label>
            <div className="flex sm:h-[2.5rem] xl:h-[3.5rem] w-full items-center justify-between rounded-sm bg-[#2A3038]">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#2A3038] rounded-sm sm:h-[2.5rem] xl:h-[3.5rem] p-2 w-full text-white text-lg focus:outline-[#5BC0DE] focus:outline-none"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="mr-4 h-5 w-5 text-white cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {passwordError && (
              <div className="text-red-500 text-sm mt-1">{passwordError}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Captcha</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="bg-[#2A3038] rounded-sm sm:h-[2.5rem] xl:h-[3.5rem] p-2 w-full text-white text-lg focus:outline-[#5BC0DE] focus:outline-none"
                />
                {captchaError && (
                  <div className="text-red-500 text-sm mt-1">
                    {captchaError}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-sm sm:h-[2.5rem] xl:h-[3.5rem] flex justify-center items-center text-black text-lg font-medium bg-[#5BC0DE]"
              >
                {loading ? "Wait..." : "Login"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <span className="flex justify-center text-sm items-center text-[white] p-2 rounded-md font-semibold">
                  {generatedCaptcha}
                </span>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-white text-xl font-semibold underline"
                >
                  <TbRefresh />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                <span>Keep me signed in.</span>
              </div>
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-1">
          <span>Forgot my password</span>
          <span>Forgot my email</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
