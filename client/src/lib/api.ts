export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH";

interface ApiRequestOptions {
	method?: HttpMethod;
	body?: unknown;
	token?: string | null;
}

interface ApiErrorBody {
	message?: string;
}

export interface GuestbookEntryResponse {
	id: string;
	message: string;
	role: string | null;
	gradient: string;
	doodles: unknown[];
	createdAt: string;
	user: {
		name: string;
		imageUrl: string | null;
		clerkUserId?: string | null;
	};
}

export interface CreateGuestbookEntryPayload {
	message: string;
	role?: string;
	gradient: string;
	doodles: unknown[];
}

export interface ContactPayload {
	name: string;
	email: string;
	message: string;
}

async function apiRequest<T>(
	path: string,
	{ method = "GET", body, token }: ApiRequestOptions = {}
): Promise<T> {
	const url = `${API_URL}${path}`

	console.log("API request:", {
		url,
		method,
		hasBody: Boolean(body),
		hasToken: Boolean(token),
	})

	const response = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		credentials: "include",
		body: body ? JSON.stringify(body) : undefined,
	})

	console.log("API response:", {
		url,
		status: response.status,
		ok: response.ok,
	})

	if (!response.ok) {
		let message = `Request failed with status ${response.status}`

		try {
			const data = (await response.json()) as ApiErrorBody
			if (data?.message) {
				message = data.message
			}
		} catch {
			// Keep default message when error body is not JSON.
		}

		throw new Error(message)
	}

	if (response.status === 204) {
		return undefined as T
	}

	return (await response.json()) as T
}

export async function getGuestbookEntries() {
	return apiRequest<{ entries: GuestbookEntryResponse[] }>("/api/guestbook");
}

export async function createGuestbookEntry(
	payload: CreateGuestbookEntryPayload,
	token: string
) {
	return apiRequest<{
		message: string
		entry: GuestbookEntryResponse
	}>("/api/guestbook", {
		method: "POST",
		body: payload,
		token,
	})
}

export async function getMyGuestbookEntries(token: string) {
	return apiRequest<{ entries: GuestbookEntryResponse[] }>("/api/guestbook/mine", {
		token,
	});
}

export async function deleteMyGuestbookEntry(id: string, token: string) {
	return apiRequest<{ message: string }>(`/api/guestbook/${id}`, {
		method: "DELETE",
		token,
	});
}

export async function sendContactMessage(payload: ContactPayload) {
	return apiRequest<{ message: string; delivered: boolean }>("/api/contact", {
		method: "POST",
		body: payload,
	});
}