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
    date : Date; // Date of measurement
    guest: boolean;
    sex: Sex;
    age: number;
    height: number; // cm
    activity_level: ActivityLevel;
    total_weight: number; // Kg
    bmi: number;

    // Fat as percentage of weight
    total_fat: number;
    right_arm_fat: number;
    left_arm_fat: number;
    right_leg_fat: number;
    left_leg_fat: number;
    trunk_fat: number;

    // Muscle mass as Kg
    total_muscle: number;
    right_arm_muscle: number;
    left_arm_muscle: number;
    right_leg_muscle: number;
    left_leg_muscle: number;
    trunk_muscle: number;

    bone_mass: number;

    visceral_fat: number; // Tanita rating number [1-59]

    daily_calorie_intake: number; // Kcal/day
    metabolic_age: number; // Years
    water: number; // %
}