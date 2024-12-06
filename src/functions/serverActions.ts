'use server';

import { cookies } from 'next/headers';

//define user interface;
export const handleSetSession = async ({ userInfo }: { userInfo: any }) => {
    const cookieStore = await cookies();
    cookieStore.set('user', JSON.stringify(userInfo));
};

export const handleRemoveSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('user');
};
