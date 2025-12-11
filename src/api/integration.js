// Minimal no-op stubs so UI renders without Base44.
export const Core = {}; 
export const InvokeLLM = async () => ({ ok: true, data: null });
export const SendEmail = async () => ({ ok: true });
export const UploadFile = async () => ({ url: "" });
export const UploadPrivateFile = async () => ({ url: "" });
export const GenerateImage = async () => ({ url: "" });
export const ExtractDataFromUploadedFile = async () => ({});
export const CreateFileSignedUrl = async () => ({ url: "" });