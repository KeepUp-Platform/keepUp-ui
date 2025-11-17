import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // --- TOASTS (Notificaciones) ---
  private toastsSource = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSource.asObservable();

  // --- MODAL DE CONFIRMACIÓN ---
  private confirmSource = new Subject<ConfirmDialogData | null>();
  confirmState$ = this.confirmSource.asObservable();

  constructor() {}

  // Método para mostrar notificación
  show(type: 'success' | 'error' | 'info', message: string) {
    const currentToasts = this.toastsSource.value;
    const newToast: Toast = { id: Date.now(), type, message };
    
    this.toastsSource.next([...currentToasts, newToast]);

    // Auto-eliminar después de 3 segundos
    setTimeout(() => this.remove(newToast.id), 3000);
  }

  remove(id: number) {
    const currentToasts = this.toastsSource.value;
    this.toastsSource.next(currentToasts.filter(t => t.id !== id));
  }

  // Métodos rápidos
  success(message: string) { this.show('success', message); }
  error(message: string) { this.show('error', message); }

  // --- LÓGICA DEL MODAL ---
  confirm(data: ConfirmDialogData) {
    this.confirmSource.next(data);
  }

  closeConfirm() {
    this.confirmSource.next(null);
  }
}