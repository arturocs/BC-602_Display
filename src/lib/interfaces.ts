export enum Sex {
    Male = 'Male', // '1' 
    Female ='Female', // '0'
}

export enum ActivityLevel {
    Inactive = 'Inactive', // '1'
    ModeratelyActive = 'Moderately Active', // '2'
    VeryActive = 'Very Active', // '3'
}

export interface MeasurementData {
    model: string; // Model number of the tanita device
    //date: string;
    //time: string;
    date : Date; // Date of measurement
    guest: boolean;
    sex: Sex;
    age: number;
    height: number; // cm
    activity_level: ActivityLevel;
    weight: number; // Kg
    bmi: number;

    // Fat as percentage of weight
    fat_body: number;
    fat_right_arm: number;
    fat_left_arm: number;
    fat_right_leg: number;
    fat_left_leg: number;
    fat_trunk: number;

    // Muscle mass as Kg
    muscle_body: number;
    muscle_right_arm: number;
    muscle_left_arm: number;
    muscle_right_leg: number;
    muscle_left_leg: number;
    muscle_trunk: number;

    bone_mass: number;

    visceral_fat: number; // Tanita rating number [1-59]

    metabolic_rate: number; // Kcal/day
    metabolic_age: number; // Years
    water: number; // %
}