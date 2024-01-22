import AddressDetails from "./AddressDetails";
import { useFormStateHere } from "./FormContext"
import PersonalDetails from "./PersonalDetails";

export const FormStep = () => {
    const {step} = useFormStateHere();

    switch (step) {
        case 1:
            return <PersonalDetails />;
        case 2:
            return <AddressDetails />;
        default:
            return null
    }
}