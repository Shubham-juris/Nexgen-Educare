import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginImage from '../../assets/Login&Signup/Login&Signup.jpg'; // Correctly import the image

const Login = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentId = formData.get('studentId');
    const password = formData.get('password');

    // Handle login logic here
    console.log('Student ID:', studentId);
    console.log('Password:', password);

    // Show success message
    setOpenSnackbar(true);

    // Reset form
    setFormKey((prevKey) => prevKey + 1);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${LoginImage})`, // Use the imported image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth='xs'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          data-aos='fade-up'
        >
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.85)',
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography component='h1' variant='h5'>
              Student Login
            </Typography>
            <Box
              key={formKey}
              component='form'
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='studentId'
                label='Student ID'
                name='studentId'
                autoComplete='student-id'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoComplete='current-password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Typography
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Forget Password
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: '100%' }}
        >
          Login successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;