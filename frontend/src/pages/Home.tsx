import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ADD_COUNTRY, GET_COUNTRIES } from "../api/countries";
import { Country } from "../types";

export function HomePage() {
  const { loading, data } = useQuery(GET_COUNTRIES);
  const countries: Country[] = data?.countries || [];
  const [addCountry] = useMutation(ADD_COUNTRY, {
    refetchQueries: [{ query: GET_COUNTRIES }],
  });
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    emoji: "",
  });

  console.log(countries);

  const formInputs = [
    { name: "Name", key: "name", inputType: "text" },
    { name: "Emoji", key: "emoji", inputType: "text" },
    { name: "Code", key: "code", inputType: "text" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addCountry({
        variables: {
          data: {
            code: formData.code,
            emoji: formData.emoji,
            name: formData.name,
          },
        },
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <form className="countryForm" onSubmit={handleSubmit}>
        {formInputs.map((input, index) => (
          <div key={index} className="formField">
            <label htmlFor={input.name}>{input.name}</label>
            <input
              type={input.key}
              id={input.name}
              name={input.name}
              value={formData[input.key as keyof typeof formData]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [input.key]: e.target.value,
                }))
              }
            />
          </div>
        ))}
        <button type="submit">Add</button>
      </form>
      <section className="countriesSection">
        {countries.map((country) => (
          <Link
            to={`/country/${country.code}`}
            key={country.code}
            className="countryField"
          >
            <p>{country.name}</p>
            <p>{country.emoji}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
