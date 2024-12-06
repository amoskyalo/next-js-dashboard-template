import { handleRemoveSession, handleSetSession } from '.';

export const handleLogout = async (currentPath?: string) => {
    //this function will be called during user logout to clear their sessions.
    //currentPath will be used to redirect back user where they were, incase they were logged out after their session expires.
    //it will be called on the client side.
    //modify it to match your needs.
    await handleRemoveSession();

    const logoutUrl = currentPath ? `/auth/login?redirect=${currentPath}` : '/auth/login';
    window.location.replace(logoutUrl);
};

export const handleUserIdenityUpdate = async (user: any) => {
    //this function takes user, and passes it to the handleSetSession function on the server actions.
    //it will be called on the client side, eg: login.
    //modify it to match your needs.

    await handleSetSession({ userInfo: user });

    return user;
};
