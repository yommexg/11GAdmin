interface SelectEngineProps {
  selectedEngine: string;
  setSelectedEngine: React.Dispatch<string>;
}

const engineInfo = ["V2", "V4", "V6", "V8"];

const SelectEngine: React.FC<SelectEngineProps> = ({
  selectedEngine,
  setSelectedEngine,
}) => {
  const handleEngineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedEngine(selected);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="carEngine" className="font-bold text-sm">
        Engine: <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-2 items-center">
        <select
          id="carEngine"
          value={selectedEngine}
          onChange={handleEngineChange}
          className="rounded-lg w-fit px-2 py-1"
        >
          <option value="">Select Engine </option>

          {engineInfo.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectEngine;
