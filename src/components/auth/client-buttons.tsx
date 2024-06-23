import { signOut, signIn } from "next-auth/react";

export function SignIn() {
  return <button onClick={() => signIn()}>Sign in</button>;
}

export function SignOut() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
