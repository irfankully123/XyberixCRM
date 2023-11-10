import Swal from 'sweetalert2'

const successToast = (message) =>
    Swal.fire({
    icon: 'success',
    title: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

export default successToast;
