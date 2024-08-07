import LoginForm from "@/components/auth/login-form";
import Image from "next/image";
import { Suspense } from "react";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (<div >
    <Suspense>
      {/* <Image
        layout="fill"
        objectFit="cover"
        quality={10}

        src={"/images/wasac.jpg"}
        alt="WASAC Logo"
      /> */}


      <LoginForm />

    </Suspense>

  </div>);
}
