import {toast} from 'react-toastify';
import icons from '~/constants/images/icons';
import IconCustom from './IconCustom/IconCustom';

export const toastText = ({msg}: {msg: string}) =>
	toast.info(msg, {
		position: 'top-center',
		autoClose: 2000,
		hideProgressBar: true,
		closeButton: false,
		className: 'toastify-custom',
		icon: false,
	});

export const toastSuccess = ({msg}: {msg: string}) =>
	toast.success(msg, {
		autoClose: 2000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-success',
		icon: false,
	});

export const toastInfo = ({msg}: {msg: string}) =>
	toast.info(msg, {
		autoClose: 2000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-info',
		icon: false,
	});
export const toastWarn = ({msg}: {msg: string}) =>
	toast.warning(msg, {
		autoClose: 2000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-warn',
		icon: false,
	});
export const toastError = ({msg}: {msg: string}) =>
	toast.error(msg, {
		autoClose: 2000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-error',
		icon: false,
	});

// Custom toast success
export const toastDeleteSuccess = ({msg}: {msg: string}) =>
	toast.error(msg, {
		autoClose: 2000000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-success',
		icon: IconCustom('success'),
	});

export const toastAddSuccess = ({msg}: {msg: string}) =>
	toast.error(msg, {
		autoClose: 2000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-success',
		icon: IconCustom('delete'),
	});

export const toastEditSuccess = ({msg}: {msg: string}) =>
	toast.error(msg, {
		autoClose: 2000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-success',
		icon: IconCustom('edit'),
	});
