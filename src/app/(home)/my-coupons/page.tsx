"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import RemoveClaimCoupon from './_my-coupons/remove-claim-coupon';
import { formatDateString } from '@/utils/formattedDate';
import { Badge } from '@/components/ui/badge';

const URL = process.env.NEXT_PUBLIC_URL;

export default function Page() {
    const [dynamicData, setDynamicData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/coupon-claim`);
                setDynamicData(response.data);
                setLoading(false);
            } catch (err) {
                setError('An error occurred while fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <h1 className="text-4xl font-extrabold my-4">List of claimed vouchers</h1>
            <div className='md:grid md:grid-cols-4 md:gap-4 flex flex-col gap-2'>
                {dynamicData.map((claimedCoupon: any) => (
                    <Card key={claimedCoupon.coupon.id}>
                        <CardHeader>
                            <CardTitle>{claimedCoupon.coupon.name}</CardTitle>
                        </CardHeader>
                        <CardContent>

                            {claimedCoupon.coupon.image && (
                                <Image
                                    src={claimedCoupon.coupon.image}
                                    alt="image"
                                    width={400}
                                    height={400}
                                    className='mx-auto'
                                />
                            )}

                            {!claimedCoupon.coupon.image && <Image src="/discount.png" alt="image" width="400" height="400" className='mx-auto' />}
                            <div className='flex gap-2 p-2'>
                                <Badge variant="outline">Description</Badge>
                                <p>{claimedCoupon.coupon.description}</p>
                            </div>

                            <div className='flex gap-2 p-2'>
                                <Badge variant="outline">Category</Badge>
                                <p>{claimedCoupon.coupon.category}</p>
                            </div>

                            <div className='flex gap-2 p-2'>
                                <Badge variant="outline">time expire</Badge>
                                <p>{formatDateString(claimedCoupon.coupon.expiredTime)}</p>
                            </div>

                            <div className='flex gap-2 p-2'>
                                <Badge variant="outline">Code</Badge>
                                <p>{claimedCoupon.coupon.code}</p>
                            </div>
                        </CardContent>
                        <CardFooter className='flex gap-2 items-center justify-end'>
                            <RemoveClaimCoupon coupon_id={claimedCoupon.id} />
                        </CardFooter>
                    </Card>
                ))}
                {dynamicData.length === 0 && <p>No claimed Coupon found.</p>}
            </div>
        </>

    );
}