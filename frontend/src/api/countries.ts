import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      emoji
      id
      name
      code
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      emoji
      id
      name
    }
  }
`;

export const GET_COUNTRY = gql`
  query Country($code: String!) {
    country(code: $code) {
      code
      continent {
        name
        id
      }
      emoji
      name
    }
  }
`;
