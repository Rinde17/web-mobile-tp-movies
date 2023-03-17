export interface ITvCredit {
    cast: [{
        adult: boolean;
        gender: number | null;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string | null;
        character: string;
        credit_id: string;
        order: number;
    }];
}