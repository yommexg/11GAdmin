interface CarAddressProps {
  busStop: string;
  setBusStop: React.Dispatch<string>;
  city: string;
  setCity: React.Dispatch<string>;
  state: string;
  setState: React.Dispatch<string>;
  country: string;
  setCountry: React.Dispatch<string>;
}

const CarAddress: React.FC<CarAddressProps> = ({
  busStop,
  city,
  country,
  setBusStop,
  setCity,
  setCountry,
  setState,
  state,
}) => {
  const handleBusStopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusStop(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <h2 className="font-bold text-sm">
        Location: <span className="text-red-500">*</span>
      </h2>
      <div className="flex flex-wrap gap-5 mb-5 mt-2">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-sm">Bus Stop:</label>
          <input
            type="text"
            id="busStop"
            placeholder="Enter Nearest Landmark"
            value={busStop}
            onChange={handleBusStopChange}
            className="px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold text-sm">City:</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={city}
            onChange={handleCityChange}
            className="px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold text-sm">State:</label>
          <input
            type="text"
            id="state"
            placeholder="Enter State"
            value={state}
            onChange={handleStateChange}
            className="px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold text-sm">Country:</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            value={country}
            onChange={handleCountryChange}
            className="px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CarAddress;
