import api from "./apiConnection";
import type { UserDTO } from "@/types";

const BASE_PATH = "/api/v1/users";

export const userService = {
  partialUpdateUser: async (
    id: number,
    userData: Partial<UserDTO>
  ): Promise<UserDTO> => {
    const response = await api.patch<UserDTO>(`${BASE_PATH}/${id}`, userData);
    return response.data;
  },
};
