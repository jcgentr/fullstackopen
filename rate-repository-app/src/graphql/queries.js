import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          id
          createdAt
          name
          ownerAvatarUrl
          ownerName
          ratingAverage
          reviewCount
          stargazersCount
          fullName
          forksCount
          description
          language
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
