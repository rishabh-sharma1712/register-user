import { HowToReg, KeyboardBackspace } from '@mui/icons-material'
import { Autocomplete, Box, Button, Card, CardContent, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Modal, Select, TextField, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools";
import { TFormData, initialFormData, useFormStateHere } from './FormContext'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './FormReducer'


const style = { position: 'absolute' as 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,};

interface addressValues {
    addressVal?:string;
    state?: string;
    city?: string;
    country?: string;
    pincode?: string;
}

interface Country {
    name: {
      common: string;
    };
  }

interface RootState {
    user: TFormData
}

const addrschema = yup.object({
    addressVal:yup.string(),
    city:yup.string(),
    state:yup.string(),
    country:yup.string(),
    pincode:yup.string().matches(/^\d*$/, 'Pincode must be a number'),
})

const myStyles = makeStyles((theme:any) => ({
    formControl: {
      '& .MuiInputBase-root': {
        height: '40px', 
        borderRadius:"5px",
        marginRight:"15px"
      },
    },      
  }))

const AddressDetails = () => {

    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(error => console.error(error));
    }, []);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const styleClass = myStyles()
    const{onHandleBack, setFormData, formData} = useFormStateHere()

    const addrForm = useForm<addressValues>({resolver:yupResolver(addrschema), defaultValues:formData})
    const { register, handleSubmit, watch, formState:{errors}, control } = addrForm

    const dispatch = useDispatch();

    const finalSubmit = (data:addressValues) => {
        setFormData(prevFormData => ({...prevFormData,...data}))
        // console.log(data);

        dispatch(addUser(data))
        setFormData(initialFormData)
        handleOpen()  
    }

    const cityVal = watch('city')
    const stateVal = watch('state')

  return (
    < >
        <Card>
            <CardContent>
                <Box maxWidth="md" margin="auto" boxShadow={3} bgcolor="background.paper" p={2} marginTop="0px" borderRadius={5}>
                    <Toolbar>
                        <Typography variant='h4'>
                            Address Details
                        </Typography>
                    </Toolbar>
                    <form onSubmit={handleSubmit(finalSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <FormLabel>Address</FormLabel>
                                    <TextField className={styleClass.formControl} placeholder='Enter Address' {...register('addressVal')} error={!!errors.addressVal} helperText={errors.addressVal?.message}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3.5}>
                                <FormControl fullWidth size='small'>
                                    <FormLabel>State</FormLabel>
                                    <Select displayEmpty {...register('state')} value={stateVal} renderValue={stateVal !== ""  ? undefined  : () => <em style={{ color: "gray" }}>Enter state</em>}>
                                        <MenuItem value={'U.P.'}>Uttar Pradesh</MenuItem>
                                        <MenuItem value={'M.P.'}>Madhya Pradesh</MenuItem>
                                        <MenuItem value={'H.P.'}>Himachal Pradesh</MenuItem>
                                        <MenuItem value={'A.P.'}>Andhra Pradesh</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.state?.message}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3.5}>
                                <FormControl fullWidth size='small'>
                                    <FormLabel>City</FormLabel>
                                    <Select displayEmpty {...register('city')} value={cityVal} renderValue={cityVal !== ""  ? undefined  : () => <em style={{ color: "gray" }}>Enter city/town/village</em>}>
                                        <MenuItem value={'Lucknow'}>Lucknow</MenuItem>
                                        <MenuItem value={'Gautam Buddha Nagar'}>Gautam Buddha Nagar</MenuItem>
                                        <MenuItem value={'Chandigarh'}>Chandigarh</MenuItem>
                                        <MenuItem value={'Delhi'}>Delhi</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.city?.message}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4.5}>
                                <FormControl fullWidth>
                                    <FormLabel>Country</FormLabel>
                                    <Controller name="country" control={control} defaultValue="" render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Autocomplete  size='small' options={countries} getOptionLabel={(option) => option.name.common} style={{ width: 300 }} value={countries.find(country => country.name.common === value) || null} onChange={(_, data) => onChange(data ? data.name.common : "")} renderInput={(params) => (
                                                <TextField placeholder='Enter Country' {...params} error={!!error} helperText={error ? error.message : null} />
                                            )}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <FormLabel>Pincode</FormLabel>
                                    <TextField className={styleClass.formControl} type="text" placeholder='Enter Pincode' {...register('pincode')} error={!!errors.pincode} helperText={errors.pincode?.message} />
                                </FormControl>
                            </Grid>


                            {/* *******Button for Go Back******

                            <Grid item xs={4}>
                                <Box display="flex" justifyContent="center">
                                    <Button onClick={onHandleBack} variant="contained" startIcon={<KeyboardBackspace />}>Back</Button>
                                </Box>
                            </Grid> */}

                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">
                                    <Button type="submit" variant="contained" endIcon={<HowToReg />}>Register User</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <DevTool control={control} />
            </CardContent>
        </Card>

        <div>
      <Modal open={open} onClose={onHandleBack} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
      >
        <Box sx={style} borderRadius={5}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Success
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            New User has been Registered.
          </Typography>
        </Box>
      </Modal>
    </div>
        
    </>
  )
}

export default AddressDetails