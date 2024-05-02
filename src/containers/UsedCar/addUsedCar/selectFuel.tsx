interface SelectFuelProps {
  selectedFuelType: string;
  setSelectedFuelType: React.Dispatch<string>;
}

const fuelTypeInfo = ["Diesel", "Electric", "Petrol"];

const SelectFuel: React.FC<SelectFuelProps> = ({
  selectedFuelType,
  setSelectedFuelType,
}) => {
  const handleFuelTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = event.target.value;
    setSelectedFuelType(selected);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="carGear" className="font-bold text-sm">
        Fuel: <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-2 items-center">
        <select
          id="carFuel"
          value={selectedFuelType}
          onChange={handleFuelTypeChange}
          className="rounded-lg w-fit px-2 py-1"
        >
          <option value="">Select Fuel</option>

          {fuelTypeInfo.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectFuel;
