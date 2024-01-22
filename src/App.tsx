import { FormProvider } from './components/FormContext';
import { FormStep } from './components/FormStep';
import Home from './components/Home';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <FormProvider>
      <FormStep />
    </FormProvider>
    <Home />
  </ThemeProvider>
      
    </>
  );
}

export default App;
