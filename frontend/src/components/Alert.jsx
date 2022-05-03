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
        
    }, [alert]);


  return (
      <div>
        <Toaster 
            position="top-center"
            toastOptions={{
                duration: 5000,
                style: {
                    background: '#6B3557',
                    color: '#ffffff',
                    fontSize: '20px'
                }
            }}
        />
      </div>  
  )
}

export default Alert;