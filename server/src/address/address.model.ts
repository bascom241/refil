import mongoose, {Schema} from "mongoose"
import { LocationType } from "./types/location.types.js"
import { AddressStatus } from "./types/AddressStatus.enum.js"

const addressSchema = new Schema ({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    label: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },

    street: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    additionalInfo: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: {
        type: String,
        enum: Object.values(LocationType),
        required: true,
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },

    status: {
      type: String, 
      enum: Object.values(AddressStatus), 
      default: AddressStatus.ACTIVE
    }, 


    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)


export default mongoose.model("Address", addressSchema)