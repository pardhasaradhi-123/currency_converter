import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { MdCurrencyExchange } from "react-icons/md";

export default function Converter() {
  const [currencyData, setCurrencyData] = useState([]);
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [convterting, setConvterting] = useState(false);
  const [error, setError] = useState(null);

  const host = "api.frankfurter.app";

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(`https://${host}/currencies`);
      const data = await response.json();
      setCurrencyData(Object.keys(data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleSubmit = async () => {
    try {
      setConvterting(true);
      const res = await fetch(
        `https://${host}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const result = await res.json();
      setConvertedAmount(result.rates[toCurrency]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setConvterting(!convterting);
    }
  };

  const swapCurrencies = (e) => {
    e.preventDefault();
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(false);
  };

  return (
    <React.Fragment>
      <div className="rounded-md p-5 w-[600px] border-2 shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold capitalize">currency converter</h1>
          <MdCurrencyExchange size={35} />
        </div>
        <article className="flex justify-between gap-8 my-5 max-sm:flex-col">
          <DropDown
            currencies={currencyData}
            title="from"
            currency={fromCurrency}
            setCurrency={setFromCurrency}
          />
          {/* swapping button */}
          <div className="flex justify-center items-center -mb-5">
            <button
              onClick={swapCurrencies}
              className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 h-fit"
            >
              <HiArrowsRightLeft />
            </button>
          </div>
          <DropDown
            currencies={currencyData}
            title="to"
            currency={toCurrency}
            setCurrency={setToCurrency}
          />
        </article>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount..."
          className="bg-gray-200 w-[50%] max-sm:w-full rounded-md p-3 mt-2 mb-3 outline-none"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="uppercase bg-green-300 p-3 font-semibold hover:bg-green-500 hover:text-white hover:font-bold tracking-wide rounded-md mt-3"
          >
            Convert
          </button>
        </div>

        {convertedAmount && (
          <div className="flex justify-center items-center my-4">
            <p className="text-xl text-green-600 font-semibold">
              Converted amount is{" "}
              <strong>
                {convertedAmount} {toCurrency}
              </strong>
            </p>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center my-4">
            <p className="text-xl text-red-600 font-semibold">{error}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
