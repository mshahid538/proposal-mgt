import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const LoginForm = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to access dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/dashboard" className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button>Login</Button>
          <small className="flex items-center gap-1">
            Don't have an account?
            <Link href={"/signup"} className="hover:underline">
              Sign up
            </Link>
          </small>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
