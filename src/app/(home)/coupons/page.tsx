

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

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {

    const response = await fetch(`${URL}/api/coupon`, { cache: 'no-store' });
    const dynamicData = await response.json();

    return (
        <>
            {/* You can render the dynamic data here */}



            <div className='flex flex-col gap-2'>



                <CreateCoupon />
                {dynamicData.map((coupon: any) => (
                    <Card key={coupon.id}>
                        <CardHeader>
                            <CardTitle>{coupon.name}</CardTitle>
                            {/* <CardDescription>{coupon.body}</CardDescription> */}

                        </CardHeader>
                        <CardContent>
                            <p>{coupon.description}</p>
                            {coupon.image && <Image src={coupon.image} alt="image" width="400" height="400" className='mx-auto' />}
                            <p>{coupon.category}</p>
                            <p>{coupon.expiredTime}</p>
                            <p>{coupon.amount}</p>
                        </CardContent>
                        <CardFooter className='flex gap-2 items-center justify-end'>
                            <UpdateCoupon data={coupon} />
                            <DeleteCoupon coupon_id={coupon.id} />
                        </CardFooter>
                    </Card>
                ))}

                {dynamicData.length == 0 && <p>No coupon found.</p>}
            </div>


        </>
    );
};

