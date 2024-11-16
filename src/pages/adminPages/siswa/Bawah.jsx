import { Box, Grid, Table, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button, IconButton } from '@mui/material';
import { Autocomplete, Input } from '@mui/joy';
import { CssVarsProvider, extendTheme } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import filter from '../../../static/filter';
import client from '../../../router/Client';
import { React, useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import ChartComponent from './ChartComponent';
import LoadingSpin from '../../../components/LoadingSpin';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import * as XLSX from 'xlsx';
import { formatDate, toUpperCase, capitalizeWords, formatTime, isLate } from '../../../helpers/helper';

export default function Kotak() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 5;

  useEffect(() => {
    client.get('presensi/guru').then(({ data }) => {
      setData(data.data);
      setLoading(false);
    });
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = data.slice(startIndex, endIndex);

  const theme = extendTheme({
    components: {
      JoyAutocomplete: {
        defaultProps: {
          variant: 'soft',
        },
      },
      JoyInput: {
        defaultProps: {
          variant: 'soft',
        },
      },
    },
  });

  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const exportToExcel = () => {
    // Membentuk data untuk ekspor
    const exportData = data.map((row) => ({
      Nama: toUpperCase(row.siswa.nama),
      Tanggal: formatDate(row.tanggal),
      Keterangan: capitalizeWords(row.keterangan),
      Hadir: formatTime(row.waktu_datang),
      Pulang: row.pulang,
    }));

    // Membuat worksheet dan workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Presensi Guru');

    // Mengekspor file Excel
    XLSX.writeFile(workbook, 'presensi_guru.xlsx');
  };

  if (loading) {
    return <LoadingSpin />;
  }

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  if (!data || data.length === 0) {
    return <div>Belum ada yang Absen😪</div>;
  }

  return (
    <>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Slider {...settings} ref={sliderRef}>
          <Box sx={{ display: 'flex' }}>
            <Grid item xs={6}>
              <Box
                className="wrapper"
                sx={{
                  mt: 8,
                  width: 'full',
                  height: 700,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Box sx={{ px: { lg: 10, xs: 3 }, pt: { lg: 5, xs: 3 }, width: '95%', height: { lg: 640, xs: 700 }, borderRadius: 3, bgcolor: 'white', boxShadow: '0px 12px 30px 9px #DDE9F9', mt: { lg: 8, xs: 2 } }}>
                  {/* <Box sx={{ display: { lg: 'flex', xs: 'none' }, justifyContent: 'end', width: 'full', gap: 3 }}>
                    <CssVarsProvider theme={theme}>
                      <Autocomplete variant="soft" placeholder="Filter" options={filter} sx={{ width: 150, height: 47 }} />
                      <Input variant="soft" sx={{ width: 300, xs: { display: 'none' } }} startDecorator={<SearchIcon />} placeholder="Cari" />
                    </CssVarsProvider>
                  </Box> */}
                  <div className='flex justify-between'>
                  <Typography sx={{ fontSize: { lg: '1.9rem', xs: '1.5rem' }, fontWeight: 'bold', color: '#373D3F' }}>Rekap Presensi Siswa</Typography>
                  <Button
                      variant="contained"
                      startIcon={<UploadFileIcon />}
                      onClick={exportToExcel}
                      sx={{ marginLeft: 2 }}>
                      Export to Excel
                    </Button>
                  </div>
                  <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table sx={{ minWidth: 250 }}>
                      <TableHead sx={{ bgcolor: '#DDE9F9', '& .MuiTableCell-root': { fontWeight: 600, width: 900, fontSize: { lg: '19px', xs: '15px' }, color: '#32383E' } }}>
                        <TableRow>
                          <TableCell align="center">Nama</TableCell>
                          <TableCell align="center">Tanggal</TableCell>
                          <TableCell align="center">Keterangan</TableCell>
                          <TableCell align="center">Hadir</TableCell>
                          <TableCell align="center">Pulang</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ '& .MuiTableCell-root': { fontSize: { lg: '18px', xs: '13px' } }, '& .MuiChip-root': { fontSize: { lg: '18px', xs: '15px' }, width: 90, fontWeight: 'bold', borderRadius: 2 } }}>
                        {paginatedRows.map((row, index) => (
                          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{toUpperCase(row.siswa.nama)}</TableCell>
                            <TableCell align="center">{formatDate(row.tanggal)}</TableCell>
                            <TableCell align="center">
                              <Chip
                                label={capitalizeWords(row.keterangan)}
                                sx={{
                                  width: 90,
                                  backgroundColor: row.keterangan === 'alpha' ? '#FBF2EF' : row.keterangan === 'hadir' ? '#E6FFFA' : row.keterangan === 'telat' ? '#FEF5E5' : row.keterangan === 'izin' ? '#b4fff6' : '#555E68',
                                  color: row.keterangan === 'alpha' ? '#DC3545' : row.keterangan === 'hadir' ? '#00D8B6' : row.keterangan === 'telat' ? '#FFAE1F' : row.keterangan === 'izin' ? '#00d8b6' : '#555E68',
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={formatTime(row.waktu_datang)}
                                sx={{
                                  backgroundColor: isLate(row.waktu_datang) ? '#FBF2EF' : '#DDE9F9',
                                  color: isLate(row.waktu_datang) ? '#DC3545' : '#2D8EFF',
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={row.pulang}
                                sx={{
                                  backgroundColor: row.pulang === 'Tdk Absen' ? '#FBF2EF' : '#DDE9F9',
                                  color: row.pulang === 'Tdk Absen' ? '#DC3545' : '#2D8EFF',
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: { lg: 'flex', xs: 'flex' }, position: 'fixed', width: { lg: 180, xs: 220 }, alignItems: { xs: 'end' }, justifyContent: { lg: 'space-between', xs: 'space-around' }, height: { xs: 40, lg: 50 }, mt: 2 }}>
                    <Button variant="contained" sx={{ width: { xs: 10 }, height: { xs: 30 } }} onClick={() => handleChangePage(page > 0 ? page - 1 : 0)} disabled={page === 0}>
                      Prev
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ width: { xs: 10 }, height: { xs: 30 } }}
                      onClick={() => handleChangePage(page < Math.ceil(data.length / rowsPerPage) - 1 ? page + 1 : page)}
                      disabled={data.length <= rowsPerPage || page >= Math.ceil(data.length / rowsPerPage) - 1}>
                      Next
                    </Button>
                        
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}></Grid>
          </Box>
          <Box p={2} sx={{ display: { lg: 'block', xs: 'none' } }}>
            <ChartComponent />
          </Box>
        </Slider>
        <IconButton onClick={handlePrev} sx={{ position: 'absolute', top: '50%', left: { lg: 0, xs: -30 }, transform: 'translateY(-50%)', zIndex: 1, display: { lg: 'block', xs: 'none' } }}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={handleNext} sx={{ position: 'absolute', top: '50%', right: { lg: 0, xs: -30 }, transform: 'translateY(-50%)', zIndex: 1, display: { lg: 'block', xs: 'none' } }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </>
  );
}
