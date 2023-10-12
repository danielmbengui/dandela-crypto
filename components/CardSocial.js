import React from "react";
//import { div, div, div } from "mui-treasury/component-flex";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Persondiv = ({ src = "", name = "", count = 0 }) => {
  return (
    <div gap={2} p={2} noWrap>
      <div noShrink>
        <Avatar src={src} />
      </div>
      <div gap={1} grow stackPoint={240} aligndivs="center">
        <div grow>
          <Typography
            noWrap
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#122740",
            }}
          >
            <b>{name}</b>
          </Typography>
          <Typography
            noWrap
            variant="body2"
            sx={{
              fontSize: "0.875rem",
              color: "#758392",
              mt: -0.25,
            }}
          >
            {count} mutual friends
          </Typography>
        </div>
        <div>
          <Button
            size="small"
            variant={"outlined"}
            sx={{
              borderRadius: 5,
              padding: "0.125rem 0.75rem",
              borderColor: "#becddc",
              fontSize: "0.75rem",
            }}
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function CardSocial({...props}) {
  return (
    <div
      borderRadius={2}
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#1f2733" : "rgb(244, 247, 250)",
        boxShadow: (theme) =>
          theme.palette.mode === "dark" ? "unset" : "0 8px 16px 0 #BDC9D7",
      }}
      {...props}
    >
      <div
        aligndivs="baseline"
        p={2}
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#2f3c50" : "#fff",
        }}
      >
        <div grow mr={1}>
          <Typography variant="h6">
            <b>Who to follow</b>
          </Typography>
        </div>
        <div>
          <Link href="#">Refresh</Link> • <Link href="#">See all</Link>
        </div>
      </div>
      <Persondiv
        src="https://i.pravatar.cc/300?img=10"
        name="Amber Matthews"
        count={6}
      />
      <Divider />
      <Persondiv
        src="https://i.pravatar.cc/300?img=20"
        name="Russel Robertson"
        count={2}
      />
      <Divider />
      <Persondiv
        src="https://i.pravatar.cc/300?img=30"
        name="Kathleen Ellis"
        count={2}
      />
    </div>
  );
}