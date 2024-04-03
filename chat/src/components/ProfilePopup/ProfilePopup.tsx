import {Unstable_Popup as BasePopup} from "@mui/base/Unstable_Popup";
import {Button, styled} from "@mui/material";
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";

type ProfilePopupProps = {
    open: boolean,
    anchor: null | HTMLElement
}

function ProfilePopup({open, anchor}: ProfilePopupProps) {

    const {username, logout} = useAuth()

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <BasePopup open={open} anchor={anchor} placement={"right"} offset={-20}>
            <PopupBody>
                <Username>{username}</Username>
                <Button onClick={handleLogout}>Выйти</Button>
            </PopupBody>
        </BasePopup>
    )
}

const PopupBody = styled('div')(
    () => `
  width: max-content;
  padding: 12px 32px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid #E5EAF2;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 0.1);
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`,
);

const Username = styled('span')(
    () => `
        font-size: 16px;
        font-weight: bold;
    `
)

export default ProfilePopup