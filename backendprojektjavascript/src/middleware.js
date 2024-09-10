import { NextResponse } from "next/server";
import { verifyJWT } from "./utils/jwt";

const unsafeMethods = ["POST", "PUT", "DELETE"];

export async function middleware(req) {
  console.log("Middleware is running", req.method);
  if (unsafeMethods.includes(req.method)) {
    console.log("VERIFY");
    let jwtPayload;
    try {
      const bearer = req.headers.get("Authorization") || "";
      const token = bearer.split(" ")?.[1];
      if (!token) {
        throw new Error("no token submitted");
      }

      jwtPayload = await verifyJWT(token);
      const headers = new Headers(req.headers);
      headers.set("userId", JSON.stringify(jwtPayload.userId));
      return NextResponse.next({ headers: headers });
    } catch (error) {
      return NextResponse.json(
        {
          error: "Unauthorized request",
        },
        { status: 401 }
      );
    }
  }
}

export const config = {
  matcher: ["/api/items/"],
};
