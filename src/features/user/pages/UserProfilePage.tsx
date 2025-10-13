import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { getUserById } from "../UserThunks";
import UserProfileForm from "../components/UserProfileForm";

const UserProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, loading } = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserById("123")); // hoặc lấy id từ auth
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>No user found</p>;

    return <UserProfileForm user={user} />;
};

export default UserProfilePage;
export {};
