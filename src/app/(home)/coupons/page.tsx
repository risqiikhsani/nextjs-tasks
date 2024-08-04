

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import CreateCoupon from './_coupons/create-coupon';
import UpdateCoupon from './_coupons/update-coupon';
import DeleteCoupon from './_coupons/delete-coupon';
import Dashboard from '@/components/dashboard';
import Image from 'next/image';
import ClaimCoupon from './_coupons/claim-coupon';
import { formatDateString } from '@/utils/formattedDate';
import { Badge } from "@/components/ui/badge"

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {

    const response = await fetch(`${URL}/api/coupon`, { cache: 'no-store' });
    const dynamicData = await response.json();

    return (
        <>
            {/* You can render the dynamic data here */}

            <h1 className="text-4xl font-extrabold my-4">Get Vouchers for best price !</h1>

            <div className='flex flex-col gap-2'>



                <CreateCoupon />




                {dynamicData.length == 0 && <p>No coupon found.</p>}

                <div className='md:grid md:grid-cols-4 md:gap-4 flex flex-col gap-2'>
                {dynamicData.map((coupon: any) => (
                    <Card key={coupon.id}>
                        <CardHeader>
                            <CardTitle>{coupon.name}</CardTitle>
                            {/* <CardDescription>{coupon.body}</CardDescription> */}

                        </CardHeader>
                        <CardContent>

                            {coupon.image && <Image src={coupon.image} alt="image" width="400" height="400" className='mx-auto' />}
                            {!coupon.image && <Image src="/discount.png" alt="image" width="400" height="400" className='mx-auto' />}
                            <div className='flex gap-2 p-2'>
                            <Badge variant="outline">Description</Badge>
                            <p>{coupon.description}</p>
                            </div>
                            
                            <div className='flex gap-2 p-2'>
                            <Badge variant="outline">Category</Badge>
                            <p>{coupon.category}</p>
                            </div>
                            
                            <div className='flex gap-2 p-2'>
                            <Badge variant="outline">time expire</Badge>
                            <p>{formatDateString(coupon.expiredTime)}</p>
                            </div>
                            
                            <div className='flex gap-2 p-2'>
                            <Badge variant="outline">Available coupons</Badge>
                            <p>{coupon.amount} units</p>
                            </div>
                            
                        </CardContent>
                        <CardFooter className='flex flex-wrap gap-2 items-center justify-end'>
                            <UpdateCoupon data={coupon} />
                            <DeleteCoupon coupon_id={coupon.id} />
                            <ClaimCoupon coupon_id={coupon.id} />
                        </CardFooter>
                    </Card>
                ))}
                </div>
            </div>


        </>
    );
};

