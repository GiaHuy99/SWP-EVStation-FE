import React, { useState } from "react";
import { useAppDispatch } from "../../../app/Hooks";
import { updateUserProfile } from "../UserThunks";
import { User } from "../types/UserType";

interface Props {
    user: User;
}

const UserProfileForm: React.FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState(user.name || "");
    const [phone, setPhone] = useState(user.phone || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUserProfile({ id: user.id, name, phone }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />

            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />

            <button type="submit">Update</button>
        </form>
    );
};

export default UserProfileForm;
