import { useNavigate } from "react-router-dom";

const SignUpButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-gray-300"
        onClick={() => navigate("/login")}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignUpButton;
