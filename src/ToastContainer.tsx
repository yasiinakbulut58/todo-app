import { ToastContainer } from "react-toastify";

function ToastContainerBase() {
  return (
    <ToastContainer
      style={{ fontSize: 14, fontWeight: 600 }}
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default ToastContainerBase;
