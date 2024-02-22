/* eslint-disable react/no-unescaped-entities */
import MaxWidthContainer from "@components/MaxWidthContainer"
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <MaxWidthContainer>
    <div className="flex justify-between">
      <div className="ml-20 mt-20">
      <h1 className="text-6xl font-bold text-gray-900 leading-normal">Welcome back <br />to<span className="text-blue-600"> Calendly</span></h1>
      <h6 className="pt-3 text-2xl text-gray-500">Log in to your account to get back to your hub for<br />scheduling meetings.</h6>
      <h6 className="pt-5 text-2xl font-semibold">Don't have an account?<span className="text-blue-600"><a href="/sign-up"> Sign Up</a></span></h6></div>
     <div className="mt-20 mr-20">
     <SignIn />
     </div>
     </div>
     </MaxWidthContainer>
  );
}