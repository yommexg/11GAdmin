interface SelectGearProps {
  selectedGearType: string;
  setSelectedGearType: React.Dispatch<string>;
}

const GearTypeInfo = ["Automatic", "Manual"];

const SelectGear: React.FC<SelectGearProps> = ({
  selectedGearType,
  setSelectedGearType,
}) => {
  const handleGearTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = event.target.value;
    setSelectedGearType(selected);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="carGear" className="font-bold text-sm">
        Gear: <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-2 items-center">
        <select
          id="carGear"
          value={selectedGearType}
          onChange={handleGearTypeChange}
          className="rounded-lg w-fit px-2 py-1"
        >
          <option value="">Select Gear</option>

          {GearTypeInfo.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectGear;
