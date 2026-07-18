// src/lib/toast.js
import { toast } from "sonner";

export function successToast(message) {
  toast.success(message);
}

export function errorToast(message) {
  toast.error(message);
}