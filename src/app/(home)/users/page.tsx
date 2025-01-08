import React from "react";

const URL = process.env.NEXT_PUBLIC_API_URL;
export default async function page() {
  let data;
  try {
    const response = await fetch(`${URL}/api/users`);
    data = await response.json();    
  } catch (error) {
    console.error(error)
  }

  return <div>
    {data ? JSON.stringify(data) : "Error fetching data."}
  </div>;
}
