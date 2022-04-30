import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const Alert = ({alert}) => {

    useEffect( () => {
        if(Object.keys(alert).length === 0) return;

        if(alert.error) {
            toast.error(alert.msg);
            return;
        }

        toast.success(alert.msg);
        
    }, [alert.error]);


  return (
      <div>
        <Toaster 
            position="top-center"
            toastOptions={{
                duration: 7000
            }}
        />
      </div>  
  )
}

export default Alert;