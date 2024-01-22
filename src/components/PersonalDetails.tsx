import { DevTool } from "@hookform/devtools";
import { KeyboardTab } from "@mui/icons-material";
import { Card, CardContent, FormControl, Grid, TextField, FormLabel, Select, MenuItem, Box, Typography, Toolbar, Button, FormHelperText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFormStateHere } from "./FormContext";

const myStyles = makeStyles((theme:any) => ({
  formControl: {
   '& .MuiInputBase-root': {
    height: '40px', 
    borderRadius:"5px",
    marginRight:"15px"
   },
  },
   
 }))
 

 const schema = yup.object({
  name: yup.string().transform((value) => value.trim().replace(/\s+/g, ' ')).min(3,'Enter at least 3 characters' ).required("Name is required"),
  mobile: yup.string().matches(/^(?:[6-9]\d{9})?$/, 'Enter a valid mobile number'),
  age: yup.string().test('age', 'Must be a valid age', function (value) {
   const { createError } = this;
 
   if (value) {
    const formattedValue = value.length === 1 ? `0${value}` : value;
 
    const isTwoDigitNumber = /^(0[1-9]|[1-9][0-9])$/.test(formattedValue);
    const isDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$/.test(formattedValue);
 
    if (!isTwoDigitNumber && !isDate) {
     return createError({ path: 'age', message: 'Age must be a valid two-digit number or in the format dd/mm/yyyy' });
    }
   } 
   return true; 
  }).required('Age is required'),
  gender: yup.string().required('Select Gender'),
  govtID: yup.string(),
  enterGovtID: yup.string().test('govtID', 'Invalid ID', function (value) {
   const { govtID } = this.parent;

   if (!govtID) {
    return true; 
   }
 
   if (govtID === 'aadhar') {
    if (!/^\d{12}$/.test(value || '')) {
     return this.createError({ message: 'Enter 12-digit Aadhar ID' });
    } else if(!/^[2-9]\d{11}$/.test(value || '')){
     return this.createError({message:'Aadhar ID should not start with 0 or 1'});
    }
   } else if (govtID === 'pan') {
    if (!/^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$/.test(value || '')) {
     return this.createError({ message: 'Enter valid 10-digit PAN ID' });
    } 
   }
 
   return true;
  }).test('govtIDSelected', 'Govt ID Type is required when Govt ID is entered', function (value) {
   const { govtID } = this.parent;
 
   if (value && !govtID) {
    return this.createError({ message: 'Select Govt ID Type first!' });
   }
 
   return true;
  }),
 });

  interface formValues {
  name : string;
  age: string;
  mobile?:string;
  gender:string;
  govtID?:string;
  enterGovtID?:string;
 }


const PersonalDetails = () => {

  const styleClass = myStyles()

  const {onHandleNext, setFormData, formData} = useFormStateHere()

  const myForm = useForm<formValues>({resolver:yupResolver(schema), defaultValues:formData})

  const {register, handleSubmit, formState, control, watch} = myForm;
  const {errors} = formState;

  const genderValue = watch('gender');
  const idValue = watch('govtID');
  

  const onFormSubmit = (data:formValues) => {
   if(data.age.length === 1){
    data.age = '0'+ data.age
   }

   if(data.govtID === 'pan' && data.enterGovtID){
    data.enterGovtID = data.enterGovtID.toUpperCase()
   }

   setFormData(prevFormData => ({...prevFormData,...data}))

   onHandleNext()
   
  } 
 return (
  <>
   <Card>
    <CardContent>
      <Box maxWidth="md" margin="auto" boxShadow={3} bgcolor="background.paper" p={2} marginTop="0px" >
       <Toolbar>
        <Typography marginTop="-15px" variant="h4">Personal Details</Typography>
       </Toolbar>

       <form onSubmit={handleSubmit(onFormSubmit)}>

       <Grid container spacing={2} >
        <Grid item xs={5}>
         <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
          <TextField className={styleClass.formControl} placeholder="Enter Name" {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
         </FormControl>
        </Grid>
        <Grid item xs={5}>
         <FormControl fullWidth>
          <FormLabel>Date of Birth or Age*</FormLabel>
          <TextField className={styleClass.formControl} placeholder="DD/MM/YYYY or Age in Years" {...register('age')} error={!!errors.age} helperText={errors.age?.message}/>
         </FormControl>
        </Grid>

        <Grid item xs={2}>
         <FormControl fullWidth size="small">
          <FormLabel>Sex*</FormLabel>
          <Select displayEmpty value={genderValue} {...register('gender')} renderValue={genderValue !== "" ? undefined : () => <em style={{ color: "gray" }}>Enter Sex</em>}>
           <MenuItem value={"M"}>Male</MenuItem>
           <MenuItem value={"F"}>Female</MenuItem>
          </Select>
          <FormHelperText>{errors.gender?.message}</FormHelperText>
         </FormControl>
        </Grid>

        <Grid item xs={4}>
         <FormControl fullWidth>
          <FormLabel>Mobile</FormLabel>
          <TextField className={styleClass.formControl} type="text" placeholder="Enter Mobile" {...register('mobile')} error={!!errors.mobile} helperText={errors.mobile?.message}/>
         </FormControl>
        </Grid>

        <Grid item xs={8}>
         <Grid container spacing={1}>
          <Grid item xs={4}>
           <FormControl fullWidth size="small">
            <FormLabel>Govt Issued ID</FormLabel>
            <Select displayEmpty value={idValue} {...register('govtID')} renderValue={idValue !== "" ? undefined : () => <em style={{ color: "gray" }}>ID Type</em>}>
             <MenuItem value={"aadhar"}>Aadhar</MenuItem>
             <MenuItem value={"pan"}>PAN</MenuItem>
            </Select>
            <FormHelperText>{errors.govtID?.message}</FormHelperText>
           </FormControl>
          </Grid>
          <Grid item xs={8}>
           <FormControl fullWidth>
            <TextField className={styleClass.formControl} placeholder="Enter Govt ID" style={{ marginTop: '23px' }} {...register('enterGovtID')} error={!!errors.enterGovtID} helperText={errors.enterGovtID?.message}/>
           </FormControl>
          </Grid>
         </Grid>
        </Grid>

        <Grid item xs={12}>
         <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained" endIcon={<KeyboardTab />} >Next</Button>
         </Box>
        </Grid>

       </Grid>
       </form>
      </Box>

     <DevTool control={control} />
     
    </CardContent>
   </Card>
  </>
 );
};

export default PersonalDetails;
