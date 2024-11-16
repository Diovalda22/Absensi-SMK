import { Box, Grid, Typography, CircularProgress, useMediaQuery  } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MailIcon from "@mui/icons-material/Mail";
import { alpha, useTheme } from "@mui/material/styles";
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useState } from 'react';
import client from '../../../router/Client';

export default function Card() {

  const [data, setData] = useState([])

  useEffect(() => {
    client.get('presensi/guru').then(({data}) => {
      setData(data.data)
    })
  }, [])

  const izinCount = data.filter(item => item.keterangan === 'izin').length;
  const telatCount = data.filter(item => item.keterangan === 'telat').length;
  const presensiCount = data.filter(item => item.waktu_datang !== null).length;
  const alphaCount = data.filter(item => item.waktu_datang === null && item.keterangan !== 'izin' ).length;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid container spacing={isMobile ? 4 : 7}>
        {isMobile ? (
          <>
          <Grid item xs={6} sm={6} md={3}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                height: isMobile ? 130 : 230,
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
                overflow: 'hidden',
                alignItems: 'center',
                borderRadius: 7,
                boxShadow: "0px 12px 24px #DDE9F9",
              }}
            >
            <Box sx={{ marginLeft: 0, display: 'flex', flexDirection: 'row', textAlign: 'start', height: '65%', alignItems: 'center' }}>
              <EventAvailableIcon sx={{ fontSize: 70, color: '#2D8EFF', display:{xs: 'none'} }} />
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ textAlign:'center' }}>
                  <Typography variant="caption" fontSize={18} sx={{ bgcolor:'#2D8EFF', px: 3, pt: 2, pb: 0.5 }} fontWeight="semibold" color="#ffff">
                    Presensi
                  </Typography>
                  <Typography variant="h5" color="#0175f8" sx={{ fontWeight: 'bold', fontSize: 40 }}>
                    {presensiCount}
                  </Typography>
                  <Typography variant="subtitle2" fontSize={18} fontWeight="semibold" color="#2D8EFF">
                    Siswa
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                height: isMobile ? 130 : 230,
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                overflow:'hidden',
                borderRadius: 7,
                boxShadow: "0px 12px 24px #DDE9F9",
              }}
            >
            <Box sx={{ marginLeft: 0, display: 'flex', flexDirection: 'row', textAlign: 'start', height: '65%', alignItems: 'center' }}>
              <MailIcon sx={{ fontSize: 70, color: '#00D8B6', display:{xs: 'none'} }} />
              <Box sx={{ display: 'flex', flexDirection: 'row',  }}>
                <Box sx={{ textAlign:'center' }}>
                  <Typography variant="caption" fontSize={18} sx={{ bgcolor:'#00D8B6', px: 6, pt: 2, pb: 0.5 }} fontWeight="semibold" color="#ffff">
                    Izin
                  </Typography>
                  <Typography variant="h5" color="#00d8b6" sx={{ fontWeight: 'bold', fontSize: 40 }}>
                    {izinCount}
                  </Typography>
                  <Typography variant="subtitle2" fontSize={18} fontWeight="semibold" color="#01f8d3">
                    Siswa
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                height: isMobile ? 130 : 230,
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                borderRadius: 7,
                overflow: 'hidden',
                boxShadow: "0px 12px 24px #DDE9F9",
              }}
            >
            <Box sx={{ marginLeft: 0, display: 'flex', flexDirection: 'row', textAlign: 'start', height: '65%', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ fontSize: 70, color: "#FFAE1F",  display:{xs: 'none'} }} />
              <Box sx={{ display: 'flex', flexDirection: 'row',  }}>
                <Box sx={{ textAlign:'center' }}>
                  <Typography variant="caption" fontSize={18} sx={{ bgcolor:'#FFAE1F', px: 5.2, pt: 2, pb: 0.5 }} fontWeight="semibold" color="#ffff">
                    Telat
                  </Typography>
                  <Typography variant="h5" color="#ffa201" sx={{ fontWeight: 'bold', fontSize: 40 }}>
                    {telatCount}
                  </Typography>
                  <Typography variant="subtitle2" fontSize={18} fontWeight="semibold" color="#ffae1f">
                    Siswa
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                height: isMobile ? 130 : 230,
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: 7,
                boxShadow: "0px 12px 24px #DDE9F9",
              }}
            >
            <Box sx={{ marginLeft: 0, display: 'flex', flexDirection: 'row', textAlign: 'start', height: '65%', alignItems: 'center' }}>
              <CancelIcon sx={{ fontSize: 70, color: "#DC3545",  display:{xs: 'none'} }} />
              <Box sx={{ display: 'flex', flexDirection: 'row',  }}>
                <Box sx={{ textAlign:'center' }}>
                  <Typography variant="caption" fontSize={18} sx={{ bgcolor:'#DC3545', px: 4.6, pt: 2, pb: 0.5 }} fontWeight="semibold" color="#ffff">
                    Alpha
                  </Typography>
                  <Typography variant="h5" color="#ff0b21" sx={{ fontWeight: 'bold', fontSize: 40 }}>
                    {alphaCount}
                  </Typography>
                  <Typography variant="subtitle2" fontSize={18} fontWeight="semibold" color="#dc3545">
                    Siswa
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
          </>
        ) : (
          <>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: '#FFFFFF',
                  height: 230,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  borderRadius: 7,
                  boxShadow: "0px 12px 24px #DDE9F9",
                }}
              >
                <Box sx={{ marginLeft: 5, display: 'flex', flexDirection: 'column', textAlign: 'start', height: '65%' }}>
                  <EventAvailableIcon sx={{ fontSize: 65, color: '#2D8EFF' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="semibold" color="#5A6A85">
                        Total
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {presensiCount} Siswa
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 5, position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        size={80}
                        thickness={4}
                        value={(presensiCount / 36) * 100}
                        variant="determinate"
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 1
                        }}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="text.secondary"
                          sx={{ fontWeight: "bold" }}
                        >
                          {`${presensiCount}/36`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: '#FFFFFF',
                  height: 230,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  borderRadius: 7,
                  boxShadow: "0px 12px 24px #DDE9F9",
                }}
              >
                <Box sx={{ marginLeft: 5, display: 'flex', flexDirection: 'column', textAlign: 'start', height: '65%' }}>
                  <MailIcon sx={{ fontSize: 65, color: '#00D8B6' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="semibold" color="#5A6A85">
                        Total Ijin/Sakit
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {izinCount} Siswa
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 5, position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        size={80}
                        thickness={4}
                        value={(izinCount / 36) * 100}
                        variant="determinate"
                        sx={{ color: '#00D8B6' }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 1
                        }}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="text.secondary"
                          sx={{ fontWeight: "bold" }}
                        >
                          {`${izinCount}/36`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              height: 230,
              width: 'full',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              borderRadius: 7,
              boxShadow: "0px 12px 24px #DDE9F9",
            }}>
            <Box sx={{marginLeft: 5, display: 'flex', justifyContent: 'space-around', flexDirection: 'column', textAlign: 'start', height: '65%', alignItems: 'start' }}>
              <AccessTimeIcon sx={{ fontSize: 65, color: '#FFAE1F' }} />
              <Box  sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                <Typography variant="p" fontWeight="semibold" color="#5A6A85">
                  Total Telat
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {telatCount} Siswa
                </Typography>
                
                </Box>
                  <Box sx={{ marginLeft: 5, position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      size={80}
                      thickness={4}
                      value={(telatCount / 36) * 100} // Menghitung persentase
                      variant="determinate"
                      sx={{color:'#FFAE1F'}}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 0
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >{`${telatCount}/36`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              height: 230,
              width: 'full',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              borderRadius: 7,
              boxShadow: "0px 12px 24px #DDE9F9",
            }}>
            <Box sx={{marginLeft: 5, display: 'flex', justifyContent: 'space-around', flexDirection: 'column', textAlign: 'start', height: '65%', alignItems: 'start' }}>
              <CancelIcon sx={{ fontSize: 65, color: '#DC3545' }} />
              <Box  sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                <Typography variant="p" fontWeight="semibold" color="#5A6A85">
                  Total Alpha
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {alphaCount} Siswa
                </Typography>
                
                </Box>
                  <Box sx={{ marginLeft: 5, position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      size={80}
                      thickness={4}
                      value={(alphaCount / 36) * 100} // Menghitung persentase
                      variant="determinate"
                      sx={{color:'#DC3545'}}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 0
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >{`${alphaCount}/36`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
