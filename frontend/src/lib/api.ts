import {
  API_BASE_URL,
} from "@/lib/constants";
import {
  ApiError,
  CreatePortfolioResponse,
  PortfolioPayload,
  PortfolioResponse,
  UploadResponse,
} from "@/lib/types";

type ApiResult<T extends object> = T | ApiError;

async function parseResponse<T extends object>(response: Response): Promise<ApiResult<T>> {
  const payload = (await response.json().catch(() => ({
    success: false,
    error: "Unexpected server response",
  }))) as ApiResult<T>;

  if (!response.ok) {
    if ("success" in payload && payload.success === false) {
      return payload;
    }

    return { success: false, error: "Something went wrong" };
  }

  return payload;
}

export async function getPortfolio(code: string) {
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${code}`, {
    cache: "no-store",
  });

  return parseResponse<PortfolioResponse>(response);
}

export async function createPortfolio(payload: PortfolioPayload) {
  const response = await fetch(`${API_BASE_URL}/api/portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<CreatePortfolioResponse>(response);
}

async function uploadFile(
  url: string,
  fieldName: "image" | "resume",
  file: File
) {
  const formData = new FormData();
  formData.append(fieldName, file);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  return parseResponse<UploadResponse>(response);
}

export function uploadImage(file: File) {
  return uploadFile(`${API_BASE_URL}/api/upload/image`, "image", file);
}

export function uploadResume(file: File) {
  return uploadFile(`${API_BASE_URL}/api/upload/resume`, "resume", file);
}
