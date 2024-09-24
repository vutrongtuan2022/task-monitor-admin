import axiosClient from '.';
const accountServices = {
	sendOTP: (
		data: {
			email: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/send-otp`, data, {
			cancelToken: tokenAxios,
		});
	},
};
export default accountServices;
