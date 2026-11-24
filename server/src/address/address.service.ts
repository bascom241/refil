import { ResourceNotFoundError, UserNotFoundError } from "../errors/NotFoundError.js";
import type { AddressDto } from "./types/LocationRequest.types.js";
import userModel from "../auth/auth.model.js"
import type { LocationResponse } from "./types/LocationResponse.js";
import addressModel from "./address.model.js";


export const createAddress = async (data: AddressDto, userId: string): Promise<LocationResponse> => {
    if (!userId) {
        throw new ResourceNotFoundError("user id is required")
    }
    const { label, street, city, location, state, country, additionalInfo } = data;

    const user = await userModel.findById(userId);
    if (!user) {
        throw new UserNotFoundError("user not found");
    }

    const address = await addressModel.create({
        user: user._id,
        label,
        street,
        city,
        location,
        state,
        country,
        additionalInfo
    });


    return {
        user: address.user.toString(),
        label: address.label,
        street: address.street,
        location: {
            type: address.location?.type ?? "Point",
            coordinates: address.location?.coordinates ?? []
        },
        country: address.country,
        additionalInfo: address.additionalInfo,
        state: address.state,
        city: address.city

    }

}


export const fetchUserAddress = async (userId: string): Promise<LocationResponse[]> => {
    if (!userId) {
        throw new ResourceNotFoundError("user id is required")
    }

    const user = await userModel.findById(userId);

    if (!user) {
        throw new UserNotFoundError("user not found");
    }

    const addresses = await addressModel.find({ user: user._id });

    return addresses.map((address) => ({
        user: address.user.toString(),
        label: address.label,
        street: address.street,
        city: address.city,
        location: {
            type: address.location?.type ?? "Point",
            coordinates: address.location?.coordinates ?? []
        },
        state: address.state,
        country: address.country,
        additionalInfo: address.additionalInfo
    }));
}


