"use client"

import useUserState from "@/stores/user-store";
import Loading from "@/components/shared/Loading";
import { useRouter } from "next/navigation";
import { checkToken } from "@/lib/api/userAPI";
import { useEffect } from "react";

export function withPublic(Component:any) {
	return function WithPublic(props:any) {
    const { currentUser, setCurrentUser } = useUserState();

		useEffect(() => {
			const initialize = async () => {
				try {
					const accessTokenCheck = localStorage.getItem("accessToken");
					if(accessTokenCheck == null) return;

					checkToken(accessTokenCheck)
					.then((response:any) => {
						setCurrentUser(response?.data);
					})
					.catch((err:any) => {
						console.log(err);
					})
				} catch (err:any) {
					console.log(err.message);
				} 
			};
			initialize();
		}, []);

		const router = useRouter();

		return <Component {...props} />;
	};
}

export function withProtected(Component:any) {
	return function WithProtected(props:any) {
		const router = useRouter();
		const { currentUser, setCurrentUser } = useUserState();

		useEffect(() => {
			const initialize = async () => {
				try {
					const accessTokenCheck = localStorage.getItem("accessToken");
					if(accessTokenCheck == null){
						router.replace("/authentication/login");
						return <Loading></Loading>;
					}
					checkToken(accessTokenCheck)
					.then((response:any) => {
						setCurrentUser(response?.data);
						return response?.data;
					})
					.then((user) => {
						if (!user) {
							router.replace("/authentication/login");
							return <Loading></Loading>;
						}
					})
					.catch((err:any) => {
						console.log(err);
					})
				} catch (err:any) {
					console.log(err.message);
				} 
			};
			initialize();
		}, []);

		return <Component {...props} />;
	};
}