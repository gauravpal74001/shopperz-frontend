
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {toast} from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth}  from "../firebase"
import { useLoginMutation } from "../redux/api/user-api";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { messageResponse } from "../types/api-types";

const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [login] = useLoginMutation();

    const loginHandler= async()=>{
        try{
            const provider= new GoogleAuthProvider();

            const {user}= await signInWithPopup(auth , provider);

            const res= await login({
                 name:user.displayName!,
                 photo:user.photoURL!,
                 email:user.email!,
                 dob:date,
                 role:"user",
                 gender,
                 _id:user.uid
            });
            console.log(user);

            if("data" in res){
                toast.success(res.data?.message as string);
            }
            else{
                const error=res.error as FetchBaseQueryError;
                const message=error.data as messageResponse;
                toast.error(message.message);
            }
        }catch(error){
          toast.error("sign in failed");
        }
    };

    return (
        <div className="login">
            <main>
                <h1 className="heading">Login</h1>

                <div>
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="" disabled>Choose gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div>
                    <p>Already Signed In?</p>
                    <button className="google-btn">
                        <FcGoogle /> <span onClick={loginHandler}>Sign In with Google</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
