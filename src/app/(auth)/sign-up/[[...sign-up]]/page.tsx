import { SignUp } from "@clerk/nextjs";

import { TrackView } from "@/components/analytics";

export const metadata = {
  title: "Create account · TEAS 7 Prep",
};

export default function SignUpPage() {
  return (
    <>
      <TrackView name="signup_started" />
      <SignUp />
    </>
  );
}
