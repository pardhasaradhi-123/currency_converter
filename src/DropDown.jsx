import React from "react";

export default function DropDown({
  currency,
  setCurrency,
  currencies,

  title = "",
}) {
  return (
    <>
      <div>
        <label htmlFor={title} className="font-semibold capitalize">
          {title}
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {currencies?.map((eachCuurency) => {
            return (
              <option value={eachCuurency} key={eachCuurency}>
                {eachCuurency}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
