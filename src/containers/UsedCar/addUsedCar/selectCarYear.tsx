interface YearOption {
  value: number;
  label: string;
}

interface SelectCarYearProps {
  selectedYear: number;
  setSelectedYear: React.Dispatch<number>;
}

const currentYear = new Date().getFullYear();
const years: YearOption[] = Array.from({ length: 30 }, (_, i) => ({
  value: currentYear - i,
  label: (currentYear - i).toString(),
}));

const SelectCarYear: React.FC<SelectCarYearProps> = ({
  selectedYear,
  setSelectedYear,
}) => {
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="carBrand" className="font-bold text-sm">
        Year: <span className="text-red-500">*</span>
      </label>
      <select
        value={selectedYear || ""}
        onChange={handleYearChange}
        className="rounded-lg w-fit px-2 py-1"
      >
        <option value="">Select year</option>
        {years.map((year) => (
          <option key={year.value} value={year.value}>
            {year.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCarYear;
