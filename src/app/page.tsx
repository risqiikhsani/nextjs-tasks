"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"


function getRandomCharacter() {
    const characters = ["A", "B", "C", "D", "E"];
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

function countBelow7(seed: any) {
    let count = 0;
    for (let char of seed) {
        if (!isNaN(char) && parseInt(char) < 7) {
            count++;
        }
    }
    return count;
}

function count7OrAbove(seed: any) {
    let count = 0;
    for (let char of seed) {
        if (!isNaN(char) && parseInt(char) >= 7) {
            count++;
        }
    }
    return count;
}

export default function Page() {
    const [receivedJson, setReceivedJson] = useState(null)
    const [hasilResponse, setHasilResponse] = useState([])
    const [profesi, setProfesi] = useState([])
    const fetchUser = async () => {
        try {
            // const response = await fetch(`${process.env.URL}/api/random-users`)
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/random-users`, { cache: 'no-store' })
            const data = await response.json()
            setReceivedJson(data)
        } catch (error) {
            console.error("Error fetching user:", error)
        }
    }



    useEffect(() => {
        const fetchProfesi = async () => {
            try {
                // const response = await fetch(`${process.env.URL}/api/random-users`)
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/profesi`, { cache: 'no-store' })
                const data = await response.json()
                setProfesi(data)
            } catch (error) {
                console.error("Error fetching user:", error)
            }
        }
        const fetchHasilResponse = async () => {
            try {
                // const response = await fetch(`${process.env.URL}/api/random-users`)
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/hasil-response`, { cache: 'no-store' })
                const data = await response.json()
                setHasilResponse(data)
            } catch (error) {
                console.error("Error fetching user:", error)
            }
        }
        const postResponse = async () => {
            if (receivedJson) {
                const result = {
                    "jenis_kelamin_kode": receivedJson.data.results[0].gender == "male" ? "1" : "2",
                    "nama": receivedJson.data.results[0].name.first || "",
                    "nama_jalan": receivedJson.data.results[0].location.street.name || "",
                    "email": receivedJson.data.results[0].email || "",
                    "angka_kurang": countBelow7(receivedJson.data.info.seed),
                    "angka_lebih": count7OrAbove(receivedJson.data.info.seed),
                    "profesi_kode": getRandomCharacter() || "",
                    "plain_json": JSON.stringify(receivedJson) || "",
                }
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/hasil-response`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(result)
                    })
                    const data = await response.json()
                    console.log(JSON.stringify(data))
                } catch (error) {
                    console.error("Error posting data:", error)
                }
            }
        }
        const fetchData = async () => {
            await postResponse(); // Wait for postResponse to finish before proceeding
            fetchHasilResponse(); // Now call fetchHasilResponse
            fetchProfesi();
            console.log("hasil response = " + hasilResponse);
        };

        fetchData();
        console.log("hasil response = " + hasilResponse)
    }, [receivedJson])

    return (
        <div className="flex flex-col px-20 text-center gap-10 p-10 ">
            <h1>PRE TEST 1  </h1>
            <Button variant="outline" onClick={fetchUser}>Click to add user from randomuser</Button>
            <pre className="border-4 border-indigo-600 whitespace-pre-wrap break-words bg-gray-100 p-4">{JSON.stringify(receivedJson)}</pre>
            <h2>TABEL HASIL RESPONSE</h2>
            <Table className="border-4 border-indigo-600">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">no</TableHead>
                        <TableHead className="text-center">nama</TableHead>
                        <TableHead className="text-center">jenis_kelamin</TableHead>
                        <TableHead className="text-center">jalan</TableHead>
                        <TableHead className="text-center">email</TableHead>
                        <TableHead className="text-center">profesi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        hasilResponse.map((item, index) => (
                            <>
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>{item.nama}</TableCell>
                                    <TableCell>{item.jenis_kelamin_kode}</TableCell>
                                    <TableCell>{item.nama_jalan}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.profesi_kode}</TableCell>
                                </TableRow>
                            </>
                        ))
                    }

                </TableBody>
            </Table>
            <h2>TABEL PROFESI</h2>
            <Table className="border-4 border-indigo-600">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">no</TableHead>
                        <TableHead className="text-center">profesi</TableHead>
                        <TableHead className="text-center">jumlah</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        profesi.map((item, index) => (
                            <>
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>{item.nama_profesi}</TableCell>
                                    <TableCell>{item._count.hasil_response}</TableCell>
                                </TableRow>
                            </>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}