import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";
import { useAuthStorage } from "./useAuthStorage";

export const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, { data, loading, error }] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(data?.authenticate?.accessToken);
    apolloClient.resetStore();
    return data;
  };

  return [signIn, { data, loading, error }];
};
