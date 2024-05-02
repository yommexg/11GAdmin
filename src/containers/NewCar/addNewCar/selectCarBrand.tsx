import { useState } from "react";

import { carBrands } from "../../../utils/carBrands";

interface SelectCarBrandProps {
  selectedBrand: string;
  setSelectedBrand: React.Dispatch<string>;
}

const SelectCarBrand: React.FC<SelectCarBrandProps> = ({
  selectedBrand,
  setSelectedBrand,
}) => {
  const [selectedBrandLogo, setSelectedBrandLogo] = useState("");

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
    const brand = carBrands.find((item) => item.brand === selectedBrand);
    if (brand) {
      setSelectedBrandLogo(brand.logo);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="carBrand" className="font-bold text-sm">
        Brand: <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-2 items-center">
        {selectedBrand && selectedBrandLogo && (
          <img
            src={selectedBrandLogo}
            alt={`${selectedBrand} Logo`}
            className="w-10 h-10 rounded-full"
          />
        )}
        <select
          id="carBrand"
          value={selectedBrand}
          onChange={handleBrandChange}
          className="rounded-lg w-fit px-2 py-1"
        >
          <option value="">Select brand</option>

          {carBrands.map((item) => (
            <option key={item.brand} value={item.brand}>
              {item.brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectCarBrand;
