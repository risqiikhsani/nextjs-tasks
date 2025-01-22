import { createErrorResponse } from "@/lib/actions";

export async function POST(){
    return createErrorResponse("Error testing, Something went wrong",404)
}