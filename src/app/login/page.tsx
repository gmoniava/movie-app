"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { useAuth } from "@/components/client/auth-provider";
import Button from "@/components/client/button";
export default function Login() {
  const { checkAuth } = useAuth();
  const { push } = useRouter();

  const [state, formAction, isPending] = useActionState(async (prevState: any, formData: any) => {
    const result = await login(prevState, formData);

    if (!result?.error) {
      await checkAuth(); // Refresh context after server sets session
      push("/"); // Navigate after everything is ready
    }

    return result;
  }, null);

  return (
    <div className="h-full">
      <div className="flex justify-center items-center h-full">
        <div className=" w-1/3  border-slate-300 p-[10px] h-1/4 rounded-md flex flex-col border">
          <div className="flex-1">
            <div className="text-xl text-center">Please login</div>
            <div className="text-center">Enter username and password</div>
          </div>
          <div className="flex-3">
            {" "}
            <form action={formAction} className="h-full">
              <div className="flex flex-col items-center justify-center h-full">
                <input type="email" name="email" placeholder="Email" className="border rounded border-slate-300 mb-1" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border rounded border-slate-300 mb-3"
                />
                <Button primary nativeProps={{ type: "submit" }}>
                  {isPending ? "Logging in" : "Login"}
                </Button>
              </div>
            </form>
            {state?.error && <div className="text-red-800 text-lg text-center">{state.error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
