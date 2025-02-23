import { login } from "@/services/auth.service";
import { cookies } from "next/headers";
export async function POST(request) {
    try {        
        const cookiesStore = await cookies();
        const body = await request.json();
        console.log(body);
        
         const token = await login(body.email, body.password);
        // set cookies
        if (token) {
            cookiesStore.set({
							name: "token",
							value: token,
                            path: "/",
                            maxAge: 60 * 60,
                            httpOnly: true,
						});
            return Response.json({
                success: true,
                token
            })
        }
        throw new Error("An error occurred");
    }
    catch (err) {
        console.log(err);
        return Response.json({
            success: false,
            message: "An error occurred",
        });
    }

}