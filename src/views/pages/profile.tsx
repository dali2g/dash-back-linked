import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LocationCity from "@mui/icons-material/LocationCity";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import NavbarSidebarLayout from "../layout/navbar-sidebar";

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

const AgentCard = () => {
  const avatar =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";

  return (
    <NavbarSidebarLayout>
         
    <Box
      component="div"
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
    >
      <img
        src={
          checkImage(avatar) ? avatar : "https://via.placeholder.com/90"
        } // Use a placeholder URL here or update the logic for avatar
        alt="user"
        width={90}
        height={90}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <Stack direction="column" justifyContent="space-between" flex={1} gap={{ xs: 4, sm: 2 }}>
        <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
          <Typography fontSize={22} fontWeight={600} color="#11142d">
           Amine Becha
          </Typography>
          <Typography fontSize={14} color="#808191">
            Admin
          </Typography>
        </Stack>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
          <InfoBar icon={<EmailOutlined sx={{ color: "#808191" }} />} name="aminebecha@gmail.com" />
          <InfoBar icon={<Place sx={{ color: "#808191" }} />} name="Tunisie" />
          <InfoBar icon={<Phone sx={{ color: "#808191" }} />} name="+216 55224499" />
          <InfoBar icon={<LocationCity sx={{ color: "#808191" }} />} name="Département Info" />
        </Stack>
      
      </Stack>
    </Box>
{/* 
   
    <Box
      component="div"
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
    >
      <img
        src={
          checkImage(avatar) ? avatar : "https://via.placeholder.com/90"
        } // Use a placeholder URL here or update the logic for avatar
        alt="user"
        width={90}
        height={90}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <Stack direction="column" justifyContent="space-between" flex={1} gap={{ xs: 4, sm: 2 }}>
        <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
          <Typography fontSize={22} fontWeight={600} color="#11142d">
           Mohamed Attia
          </Typography>
          <Typography fontSize={14} color="#808191">
            Ingenieur Informatique
          </Typography>
        </Stack>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
          <InfoBar icon={<EmailOutlined sx={{ color: "#808191" }} />} name="med.attia@outlook.com" />
          <InfoBar icon={<Place sx={{ color: "#808191" }} />} name="Gabes" />
          <InfoBar icon={<Phone sx={{ color: "#808191" }} />} name="+21654950310" />
          <InfoBar icon={<LocationCity sx={{ color: "#808191" }} />} name="Département Info" />
        </Stack>
      
      </Stack>
    </Box>
   
    <Box
      component="div"
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
    >
      <img
        src={
          checkImage(avatar) ? avatar : "https://via.placeholder.com/90"
        } // Use a placeholder URL here or update the logic for avatar
        alt="user"
        width={90}
        height={90}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <Stack direction="column" justifyContent="space-between" flex={1} gap={{ xs: 4, sm: 2 }}>
        <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
          <Typography fontSize={22} fontWeight={600} color="#11142d">
     Asma Kerkeni
          </Typography>
          <Typography fontSize={14} color="#808191">
            RH Specialiste
          </Typography>
        </Stack>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
          <InfoBar icon={<EmailOutlined sx={{ color: "#808191" }} />} name="kerkniasma@yahoo.fr" />
          <InfoBar icon={<Place sx={{ color: "#808191" }} />} name="Sousse" />
          <InfoBar icon={<Phone sx={{ color: "#808191" }} />} name="+216 98751200" />
          <InfoBar icon={<LocationCity sx={{ color: "#808191" }} />} name="Département RH" />
        </Stack>
     
      </Stack>
    </Box>
  
   
    <Box
      component="div"
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(179,200,179,0.4)",
        },
      }}
    >
      <img
        src={
          checkImage(avatar) ? avatar : "https://via.placeholder.com/90"
        } // Use a placeholder URL here or update the logic for avatar
        alt="user"
        width={90}
        height={90}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <Stack direction="column" justifyContent="space-between" flex={1} gap={{ xs: 4, sm: 2 }}>
        <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
          <Typography fontSize={22} fontWeight={600} color="#11142d">
           Ali Nassri
          </Typography>
          <Typography fontSize={14} color="#808191">
           Technicien en Comptabilité
          </Typography>
        </Stack>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
          <InfoBar icon={<EmailOutlined sx={{ color: "#808191" }} />} name="nassriali@gmail.com" />
          <InfoBar icon={<Place sx={{ color: "#808191" }} />} name="Nabeul" />
          <InfoBar icon={<Phone sx={{ color: "#808191" }} />} name="+216 20548642" />
          <InfoBar icon={<LocationCity sx={{ color: "#808191" }} />} name="Département Gestion" />
        </Stack>
  
      </Stack>
    </Box> */}
    </NavbarSidebarLayout>
  );
};

export default AgentCard;
