export interface DemoItem {
  id: string;
  name: string;
  value: number;
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  createdAt: number;
}