"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { useAuth } from "@/components/client/auth-provider";
import Button from "@/components/client/button";

export default function Login() {
  const { checkAuth } = useAuth();
  const { push } = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    startTransition(async () => {
      const result = await login(null, formData);
      if (result?.error) {
        setError(result.error);
      } else {
        await checkAuth();
        push("/");
      }
    });
  };

  return (
    <div className="h-full">
      <div className="flex justify-center items-center h-full">
        <div className="w-1/3 border-slate-300 p-[10px] rounded-md flex flex-col gap-1 border">
          <div className="flex-1">
            <div className="text-xl text-center">Please login</div>
            <div className="text-center">Enter username and password</div>
          </div>
          <div className="flex-3">
            <form onSubmit={handleSubmit} className="h-full">
              <div className="flex flex-col items-center gap-4 justify-center h-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-64 border rounded border-slate-300 p-1"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-64 border rounded border-slate-300 p-1"
                />
                <Button primary nativeProps={{ type: "submit", disabled: isPending }}>
                  {isPending ? "Logging in" : "Login"}
                </Button>
              </div>
            </form>
            {error && <div className="text-red-800 text-lg text-center">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
