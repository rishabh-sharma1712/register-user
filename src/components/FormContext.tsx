import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


export interface TFormData {
    name : string;
    age: string;
    mobile?:string;
    gender:string;
    govtID?:string;
    enterGovtID?:string;
    addressVal?:string;
    state?: string;
    city?: string;
    country?: string;
    pincode?: string;
}

interface IFormContext {
    onHandleNext:() => void;
    onHandleBack:() => void;
    step:number;
    formData:TFormData;
    setFormData:Dispatch<SetStateAction<TFormData>>
}

const FormContext = createContext<IFormContext>({
    onHandleNext : ()=>{},
    onHandleBack: ()=>{},
    step:1,
    formData:{name:'',age:'', mobile:'', gender:'', govtID:'', enterGovtID:'', addressVal:'', state:'', city:'', country:'', pincode:''},
    setFormData:() => {}
})

interface IProps {
    children: ReactNode,
}

export const initialFormData = {name:'',age:'',mobile:'', gender:'', govtID:'', enterGovtID:'', addressVal:'', state:'', city:'', country:'', pincode:''}

export const FormProvider = ({children}:IProps) => {
    const[step, setStep] = useState(1)
    const[formData, setFormData] = useState<TFormData>(initialFormData)

    const onHandleNext = () => {
        setStep((prev) => prev+1)
    }

    const onHandleBack = () => {
        setStep((prev) => prev-1)
    }

    return <FormContext.Provider value={{onHandleBack, onHandleNext, step, formData, setFormData}}>
        {children}
    </FormContext.Provider>
}

export const useFormStateHere = () => {
    return useContext(FormContext);
}