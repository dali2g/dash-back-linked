import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LocationCity from "@mui/icons-material/LocationCity";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import NavbarSidebarLayout from "../layout/navbar-sidebar";
import axios from "axios";

interface Responsable {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const avatarPlaceholder =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";

function checkImage(url) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const InfoBar = ({ icon, name }) => (
  <Stack flex={1} minWidth={{ xs: "100%", sm: 300 }} gap={1.5} direction="row">
    {icon}
    <Typography fontSize={14} color="#808191">
      {name}
    </Typography>
  </Stack>
);

const AgentCard = ({ user }) => {
  const [connectedUser, setConnectedUser] = useState<Responsable>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchConnectedUser = async () => {
      try {
        const response = await axios.get<Responsable>("http://localhost:5173/users/profils");
        console.log("Fetched data:", response.data);
        setConnectedUser(response.data);
      } catch (error) {
        console.error("Error fetching connected user:", error);
      }
    };

    fetchConnectedUser();
  }, []);

  return (
    <NavbarSidebarLayout>
      {user.map((userData: any, index) => (
        <Box
          key={userData._id}
          component="div"
          width="100%"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "20px",
            padding: "20px",
            boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
            marginTop: index > 0 ? "20px" : 0, 
          }}
        >
          <img
            src={checkImage(userData.avatar) ? userData.avatar : avatarPlaceholder}
            alt="user"
            width={100} 
            height={100} 
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          <Stack direction="column" justifyContent="center" flex={1} gap={{ xs: 4, sm: 4 }}>
            <Typography fontSize={22} fontWeight={600} color="#11142d">
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography fontSize={14} color="#808191">
              Responsable
            </Typography>
            <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
              <InfoBar icon={<EmailOutlined sx={{ color: "#808191" }} />} name={userData.email} />
              <InfoBar icon={<Place sx={{ color: "#808191" }} />} name="Tunisie" />
              <InfoBar icon={<Phone sx={{ color: "#808191" }} />} name={userData.phone} />
              <InfoBar icon={<LocationCity sx={{ color: "#808191" }} />} name="Département Info" />
            </Stack>
          </Stack>
        </Box>
      ))}
    </NavbarSidebarLayout>
  );
};

export default AgentCard;
