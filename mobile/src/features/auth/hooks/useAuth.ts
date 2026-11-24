import { useMutation } from "@tanstack/react-query";
import { login, register, verifyToken } from "../api/auth";

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
}

export const useRegister = () => {
    return useMutation ({
        mutationFn: register
    })
}

export const useVerify = () => {
    return useMutation ({
        mutationFn: verifyToken
    })
}