import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "../../utils/logo";
import { RootState, useAppDispatch } from "../../redux/store";
import { loginAsync } from "../../redux/slice/loginSlice";
import Spinner from "../../components/Spinner";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loading = useSelector((state: RootState) => state.login.loading);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmail(value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleVerify = () => {
    if (!email || !password) {
      toast.error("Please Input all fields");
    } else {
      dispatch(
        loginAsync({
          email,
          pwd: password,
          extra: {
            navigate,
          },
        })
      );
    }
  };

  return (
    <div className="py-8 md:py-20 md:flex md:flex-col md:items-center">
      {loading && <Spinner />}
      <div className=" flex gap-8 flex-col justify-center px-8">
        <div>
          <Logo />
        </div>
        <div>
          <h2 className="font-bold mb-3 text-3xl">ADMIN LOGIN</h2>
        </div>
        <div className="flex flex-col gap-3 md:w-[150%]">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="bg-slate-200 p-2 text-black font-semibold"
          />
        </div>

        <div className="flex flex-col gap-3 md:w-[150%]">
          <label htmlFor="password">Password:</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="bg-slate-200 p-2 text-black font-semibold w-full"
            />
            <button
              className="absolute right-2 top-3 text-xs"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          className="p-4 bg-slate-900 text-white hover:opacity-50  md:w-[150%]"
          onClick={handleVerify}
        >
          Login
        </button>
      </div>
      <p className="w-full text-white absolute text-sm bottom-0 text-center p-6 bg-black">
        © 2024 11G Autos. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
