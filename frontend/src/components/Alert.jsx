import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const Alert = ({alert}) => {

    useEffect( () => {
        const notify = () => {
            if(alert.msg){
                if(alert.error) {
                    toast.error(alert.msg);
                } else {
                    toast.success(alert.msg);
                }

                return;
            }
            
            if(alert.promise) {
                toast.promise(alert.promise, {
                    loading: 'Loading ...',
                    success: alert.promise.msg,
                    error: 'Something occurs. Sorry!'
                })
            }
        }
        notify();
    }, [alert.msg]);

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