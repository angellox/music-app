import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const Alert = ({alert}) => {

    useEffect( () => {

        const notify = () => {
            if(alert.msg) {
                if(alert.error) {
                    toast.error(alert.msg);
                } else {
                    toast.success(alert.msg);
                }
            }
        }

        notify();
        
    }, [alert]);

  return (
      <div>
        <Toaster 
            position="top-right"
        />
      </div>
      
  )
}

export default Alert;