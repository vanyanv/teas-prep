import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign in · TEAS 7 Prep",
};

export default function SignInPage() {
  return <SignIn />;
}
