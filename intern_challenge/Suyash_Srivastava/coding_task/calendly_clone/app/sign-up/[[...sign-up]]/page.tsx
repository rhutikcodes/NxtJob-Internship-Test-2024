import MaxWidthContainer from "@components/MaxWidthContainer";
import { CheckCircle } from "lucide-react";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <MaxWidthContainer>
    <div className="flex justify-between">
    <div className="ml-20 mt-24"><h6 className="text-blue-800 font-medium uppercase">Try Calendly for free</h6>
    <h1 className="text-6xl font-bold pt-8 leading-normal">Create your <br/><span className="text-blue-600">free</span> account</h1>
    <h6 className="pt-5 text-balance w-4/5 text-xl">Make scheduling with clients and recruits easier with a free Calendly account. First-time signups also receive a free, 14-day trial of our Teams subscription plan!</h6>
    <div className="mt-8">
      <h3 className="font-semibold text-2xl ">This Team trial includes upgrades like:</h3>
      <ul className="mt-8 space-y-8 text-wrap w-4/5 ">
        <li className="flex text-xl gap-4 items-center align-top "><CheckCircle color="blue"/>Ability to book meetings as a team with clients and more</li>
        <li className="flex text-xl gap-4 items-center"><CheckCircle color="blue"/>Unlimited event types (30-minute video call, 15-minute phone call)</li>
        <li className="flex text-xl gap-4 items-center"><CheckCircle color="blue"/>Remove Calendly branding</li>
        <li className="flex text-xl gap-4 items-center"><CheckCircle color="blue"/>Ability to charge for meetings with PayPal and Stripe<br/> - plus more</li>
      </ul>
    </div>
    </div>
    <div className="mr-20 mt-20 w-3/4"><SignUp />
    
    </div>
    </div>
  </MaxWidthContainer>
  );
}