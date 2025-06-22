import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SECRET_KEY || (process.env.NODE_ENV === "development" ? "test-secret-key" : undefined);

const key = new TextEncoder().encode(secretKey);

export async function verify(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
export async function getSession() {
  // Do this otherwise we get error from Nextjs about not being able to access next/headers outside app folder
  // (https://github.com/vercel/next.js/issues/49757#issuecomment-1911540734)
  const { cookies } = await import("next/headers");

  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return verify(session);
}

export async function sign(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}
