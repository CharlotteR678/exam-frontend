import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_COUNTRY } from "../api/countries";
import { Country } from "../types";

export function CountryPage() {
  const { code } = useParams();
  const { loading, data } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  console.log(data);
  const country: Country = data?.country || [];

  if (loading) return <p>Loading...</p>;

  return (
    <section id="countryPage">
      <p className="emoji">{country.emoji}</p>
      <p>
        Name : {country.name} ({country.code})
      </p>
      <p>Continent : {country.continent?.name}</p>
    </section>
  );
}
