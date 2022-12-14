export interface ITask {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly status: boolean;
    readonly created_at: Date;
}
