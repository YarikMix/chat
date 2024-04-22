import Avatar from "../Avatar/Avatar.tsx";
import ProfilePopup from "../ProfilePopup/ProfilePopup.tsx";
import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import "./UserProfile.sass"

function UserProfile() {
    const {username} = useAuth()

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const open = Boolean(anchor);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    return (
        <div className="profile-container" onClick={handleClick}>
            <Avatar username={username}/>
            <ProfilePopup open={open} anchor={anchor}/>
        </div>
    )
}

export default UserProfile