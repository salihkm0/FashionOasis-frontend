import { useState, useMemo, useEffect } from "react";
import { Box, Button, Drawer, Stack, Typography, styled, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { adminNavActions } from "../../assets/json/navbar";
// import logo from '../assets/logo/logo-new.jpeg';

const Sidebar = ({ open, onClose, ...props }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"))
  const navigate = useNavigate()


  const Navitem = ({ item, ...props }) => {
    let act = false
    if (`/${item.href}` === window.location.pathname) {
      act = true
    }
    return (
      <Stack direction={"row"}
        spacing={1}
        sx={{
          backgroundColor: act && '#c83c4f',
          cursor: 'pointer',
          py: 0.8, px: 1, borderRadius: '8px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          color: act ? '#fff' : '#555252',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#c83c4f',
            color: '#fff'
          }
        }}
        {...props}
      >
        {/* <Box sx={{ color: act && '#ffff',display:'flex',justifyContent:'center',alignItems:'center' }}>{item.icon}</Box> */}
        <Typography variant="subtitle2" > {item.title}</Typography>
      </Stack>
    )
  }

  const Content = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: '#F9FAFB'
        }}
      >
        <Box sx={{ p: 2}}>
          <Stack direction={'row'} sx={{ alignItems: 'center'}}>
            {/* This icon can be replaced with your logo */}
            {/* <img style={{borderRadius:'50%'}} height={'160px'} src={logo} alt="logo"/> */}
            <p>FasionOasis</p>
          </Stack>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            maxHeight: "calc(100vh - 15px)",
            overflowY: "auto",
          }}
        >
          <Stack spacing={1} m={2}>
            {adminNavActions.map((item, index) => {
              return (
                <Navitem key={index} item={item} onClick={() => { navigate(`/${item.href}`) }} />
              );
            })}
          </Stack>
        </Box>
      </Box>
    );
  }

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            color: "secondary.contrastText",
            width: 280,
            border: "none",
          },
        }}
        variant="permanent"
      >
        <Content />
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#fff",
          color: "secondary.contrastText",
          width: 260,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      <Content />
    </Drawer>
  );
};

export default Sidebar;
