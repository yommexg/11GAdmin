const logoImage = new URL("../../assets/logo/11GLogo.png", import.meta.url)
  .href;

const Spinner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-50">
      <img
        src={logoImage}
        alt="Loading..."
        className="w-16 h-16 border-5 border-white border-opacity-30 rounded-full animate-spin"
      />
    </div>
  );
};

export default Spinner;
