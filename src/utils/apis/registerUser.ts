import { post } from "@/utils/post";

export type RegisterUserRequest = {
  email: string;
  name: string;
  password: string;
};

export function registerUser(request: RegisterUserRequest) {
  return post<RegisterUserRequest>("/users", request);
}
