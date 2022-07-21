import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query Launches($mission_name: String!, $limit: Int!) {
    launches(find: {mission_name: $mission_name}, limit: $limit) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name
      }
      links {
        wikipedia
      }
      launch_success
    }
  }
`;

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($id: ID!) {
    launch(id: $id) {
      mission_name
      launch_site {
        site_name
      }
      links {
        wikipedia
        article_link
      }
      launch_success
      details
      launch_date_local
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

