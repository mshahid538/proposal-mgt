import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const SignupForm = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Signup to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/login" className="flex flex-col gap-4">
          <Input type="text" placeholder="Name" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button>Signup</Button>
          <small className="flex items-center gap-1">
            Already have an account?
            <Link href={"/login"} className="hover:underline">
              Login
            </Link>
          </small>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
