import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const res = await fetch ("/api/auth/google", {
              method: 'POST',
              headers: {
                "Content-Type" : "application/json",
              },
              body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL,
              }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            console.log("Could not sign in with google", error);
        }
    };
  return (
    <button onClick={handleGoogleClick} type="button" className="flex items-center justify-center gap-3 border border-slate-400 rounded-lg text-black shadow-md py-3 mt-6 hover:bg-gray-200 transition duration-300 w-full ">
      <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
      Continue with Google
    </button>
  )
}
