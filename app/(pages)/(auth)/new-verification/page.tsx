import NewVerificationForm from "@/components/auth/new-verification-form";
import { Suspense } from "react";

export const metadata = {
  title: "Verification",
};

export default function NewVerificationPage() {
  return (
  <div>
    <Suspense fallback={<>Loading...</>}>
      <NewVerificationForm />
    </Suspense>
  </div>
  );
}
