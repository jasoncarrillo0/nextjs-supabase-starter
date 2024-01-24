
import Input from "@/components/Input";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    pass: string 
    setPass: Dispatch<SetStateAction<string>>
    first: string
    setFirst: Dispatch<SetStateAction<string>>
    last: string 
    setLast: Dispatch<SetStateAction<string>>
}

const SignupForm = ({
    email, setEmail,
    pass, setPass,
    first, setFirst,
    last, setLast
}: Props) => {
    

    return (
        <div>
            <Input
                type="text"
                label="first name"
                text={first}
                setText={setFirst}
            />
            <Input
                type="text"
                label="last name"
                text={last}
                setText={setLast}
            />
            <Input type="email" label="email" text={email} setText={setEmail} />
            <Input
                type="password"
                label="password"
                text={pass}
                setText={setPass}
            />
            
        </div>
    );
}



export default SignupForm;