export interface INotification {
    id: string;
    type: 'error' | 'message',
    text: string
}