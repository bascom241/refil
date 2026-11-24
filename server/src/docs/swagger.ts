const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Refill API",
    version: "1.0.0",
    description: "API documentation for the Refill server.",
  },
  servers: [{ url: "/api/v1" }],
  tags: [{ name: "Auth", description: "Authentication and account operations" }],
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a user",
        description: "Creates a user account and sends a verification code by SMS.",
        operationId: "registerUser",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
              example: {
                firstName: "Abdulbasit",
                lastName: "Abdulwahab",
                phoneNumber: "+2348059139063",
                password: "omotosho123",
                role: "Customer",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created and verification code sent.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterSuccess" },
              },
            },
          },
          "400": {
            description: "Request validation failed.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } },
            },
          },
          "409": {
            description: "A user with this phone number already exists.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
          default: {
            description: "Unexpected server or SMS provider error.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in",
        description: "Authenticates a user with their phone number and password.",
        operationId: "loginUser",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
              example: { phoneNumber: "+14155552671", password: "securePassword123" },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/LoginSuccess" } },
            },
          },
          "400": {
            description: "Request validation failed.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } },
            },
          },
          "401": {
            description: "Invalid password.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
          "409": {
            description: "No user exists with this phone number.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
          default: {
            description: "Unexpected server error.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
        },
      },
    },
    "/auth/verify": {
      post: {
        tags: ["Auth"],
        summary: "Verify a new account",
        description: "Verifies the account using the code sent by SMS. Codes expire after 10 minutes.",
        operationId: "verifyUser",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TokenRequest" },
              example: { token: "1234" },
            },
          },
        },
        responses: {
          "200": {
            description: "Account verified.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ActionSuccess" } },
            },
          },
          "400": {
            description: "Request validation failed.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } },
            },
          },
          "401": {
            description: "Verification code is invalid or expired.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
          default: {
            description: "Unexpected server error.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
        },
      },
    },
    "/auth/forgot-password": {
      post: {
        tags: ["Auth"],
        summary: "Request a password reset code",
        description: "Sends a password reset code to the user's phone number. The code expires after 10 minutes.",
        operationId: "forgotPassword",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ForgotPasswordRequest" },
              example: { phoneNumber: "+14155552671" },
            },
          },
        },
        responses: {
          "200": {
            description: "Password reset code sent.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ActionSuccess" } },
            },
          },
          "400": {
            description: "Request validation failed.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } },
            },
          },
          "409": {
            description: "No user exists with this phone number.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
          default: {
            description: "Unexpected server or SMS provider error.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
        },
      },
    },
    "/auth/verify-reset-password": {
      post: {
        tags: ["Auth"],
        summary: "Verify a password reset code",
        description: "Validates and consumes the password reset code sent by SMS.",
        operationId: "verifyPasswordReset",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TokenRequest" },
              example: { token: "1234" },
            },
          },
        },
        responses: {
          "200": {
            description: "Password reset code verified.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ActionSuccess" } },
            },
          },
          "400": {
            description: "Request validation failed.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } },
            },
          },
          "401": {
            description: "Reset code is invalid or expired.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
          default: {
            description: "Unexpected server error.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
        },
      },
    },
    "/auth/reset-password": {
      post: {
        tags: ["Auth"],
        summary: "Reset the authenticated user's password",
        description: "Sets a new password after reset-code verification. Requires the user's access token.",
        operationId: "resetPassword",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ResetPasswordRequest" },
              example: { newPassword: "newSecurePassword456" },
            },
          },
        },
        responses: {
          "200": {
            description: "Password reset successfully.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ActionSuccess" } },
            },
          },
          "400": {
            description: "Request validation failed.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } },
            },
          },
          "401": {
            description: "Missing or invalid access token.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
          "409": {
            description: "The authenticated user could not be found.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
          default: {
            description: "Unexpected server error.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
        },
      },
    },
    "/auth/address": {
      post: {
        tags: ["Auth"],
        summary: "Add an address for the authenticated user",
        description: "Creates an address associated with the user identified by the access token.",
        operationId: "addUserAddress",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Address" },
              example: {
                label: "Home",
                street: "123 Main Street",
                city: "Seattle",
                state: "WA",
                country: "US",
                additionalInfo: "",
                location: { type: "Point", coordinates: [-122.3321, 47.6062] },
                isDefault: true,
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Address created.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AddressSuccess" } },
            },
          },
          "400": {
            description: "Request validation failed.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } },
            },
          },
          "401": {
            description: "Missing or invalid access token.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
          "409": {
            description: "The authenticated user could not be found.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
          default: {
            description: "Unexpected server error.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Access token returned by register or login.",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["firstName", "lastName", "phoneNumber", "password"],
        properties: {
          firstName: { type: "string", minLength: 2 },
          lastName: { type: "string", minLength: 2 },
          phoneNumber: {
            type: "string",
            minLength: 11,
            description: "Use the international phone-number format accepted by the SMS provider.",
          },
          password: { type: "string", minLength: 8 },
          role: { type: "string", enum: ["Vendor", "Customer", "Rider"], default: "Customer" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["phoneNumber", "password"],
        properties: {
          phoneNumber: { type: "string", minLength: 11 },
          password: { type: "string", minLength: 8 },
        },
      },
      TokenRequest: {
        type: "object",
        required: ["token"],
        properties: {
          token: { type: "string", minLength: 4, description: "One-time code sent by SMS." },
        },
      },
      ForgotPasswordRequest: {
        type: "object",
        required: ["phoneNumber"],
        properties: { phoneNumber: { type: "string", minLength: 11 } },
      },
      ResetPasswordRequest: {
        type: "object",
        required: ["newPassword"],
        properties: { newPassword: { type: "string", minLength: 8 } },
      },
      Address: {
        type: "object",
        required: ["street", "city", "state", "country", "location"],
        properties: {
          label: { type: "string", enum: ["Home", "Work", "Other"], default: "Home" },
          street: { type: "string", minLength: 1 },
          city: { type: "string", minLength: 1 },
          state: { type: "string", minLength: 1 },
          country: { type: "string", minLength: 1 },
          additionalInfo: { type: "string", default: "" },
          location: { $ref: "#/components/schemas/GeoPoint" },
          isDefault: { type: "boolean", default: false },
        },
      },
      GeoPoint: {
        type: "object",
        required: ["type", "coordinates"],
        properties: {
          type: { type: "string", enum: ["Point"] },
          coordinates: {
            type: "array",
            description: "Exactly two numbers in [longitude, latitude] order.",
            minItems: 2,
            maxItems: 2,
            items: { type: "number" },
            example: [-122.3321, 47.6062],
          },
        },
      },
      RegisterSuccess: {
        type: "object",
        required: ["success", "data", "message"],
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "user created succesfully" },
          data: { $ref: "#/components/schemas/RegisterResponse" },
        },
      },
      RegisterResponse: {
        type: "object",
        required: ["phoneNumber", "firstName", "lastName", "accessToken"],
        properties: {
          phoneNumber: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          accessToken: { type: "string", description: "JWT access token." },
          token: {type: "string"}
        },
      },
      LoginSuccess: {
        type: "object",
        required: ["success", "data", "message"],
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Login successfully" },
          data: { $ref: "#/components/schemas/LoginResponse" },
        },
      },
      LoginResponse: {
        type: "object",
        required: ["accessToken"],
        properties: { accessToken: { type: "string", description: "JWT access token." } },
      },
      ActionSuccess: {
        type: "object",
        required: ["success", "message"],
        properties: {
          success: { type: "boolean", example: true },
          data: { description: "Omitted when the operation has no response data." },
          message: { type: "string" },
        },
      },
      AddressSuccess: {
        type: "object",
        required: ["success", "data", "message"],
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Address created successfully" },
          data: { $ref: "#/components/schemas/AddressResponse" },
        },
      },
      AddressResponse: {
        type: "object",
        required: ["location", "street", "user", "label", "city", "state", "country", "additionalInfo"],
        properties: {
          location: { $ref: "#/components/schemas/GeoPoint" },
          street: { type: "string" },
          user: { type: "string", description: "ID of the user associated with this address." },
          label: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          country: { type: "string" },
          additionalInfo: { type: "string" },
        },
      },
      ValidationError: {
        type: "object",
        required: ["status", "errors"],
        properties: {
          status: { type: "string", example: "fail" },
          errors: {
            type: "array",
            items: {
              type: "object",
              required: ["field", "message"],
              properties: {
                field: { type: "string", example: "password" },
                message: { type: "string", example: "Password must be at least 8 characters long" },
              },
            },
          },
        },
      },
      ApiError: {
        type: "object",
        required: ["success", "error"],
        properties: {
          success: { type: "boolean", example: false },
          error: {
            type: "object",
            required: ["code", "message"],
            properties: {
              code: { oneOf: [{ type: "string" }, { type: "number" }], example: "INVALID_CREDENTIALS" },
              message: { type: "string", example: "Invalid credentials" },
            },
          },
        },
      },
    },
  },
} as const;

export default openApiSpec;
