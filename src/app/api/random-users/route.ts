export async function GET(request: Request) {
    const res = await fetch('https://randomuser.me/api/', {
      headers: {
        'Content-Type': 'application/json',
        // 'API-Key': process.env.DATA_API_KEY,
      },
    })
    const data = await res.json()
   
    return Response.json({ data })
  }