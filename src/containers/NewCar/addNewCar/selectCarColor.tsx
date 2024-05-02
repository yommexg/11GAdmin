interface SelectColorProps {
  selectedColor: string;
  setSelectedColor: React.Dispatch<string>;
}

const colorInfo = [
  "red",
  "blue",
  "black",
  "white",
  "silver",
  "gray",
  "green",
  "yellow",
  "orange",
  "brown",
  "purple",
  "pink",
  "gold",
  "beige",
  "cream",
  "turquoise",
  "teal",
  "burgundy",
  "navy",
  "maroon",
  "charcoal",
  "ivory",
  "taupe",
  "olive",
  "bronze",
  "copper",
  "magenta",
  "lime",
  "khaki",
  "violet",
];

const SelectColor: React.FC<SelectColorProps> = ({
  selectedColor,
  setSelectedColor,
}) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedColor(selected);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="carColor" className="font-bold text-sm">
        Color: <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-2 items-center">
        <select
          id="carColor"
          value={selectedColor}
          onChange={handleColorChange}
          className="rounded-lg w-fit px-2 py-1"
        >
          <option value="">Select Color </option>

          {colorInfo.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectColor;
