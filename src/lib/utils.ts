import { ActivityLevel, Sex, type MeasurementData } from "$lib/interfaces";

function parseSex(value: string): Sex {
    switch (value) {
        case '0':
            return Sex.Female;
        case '1':
            return Sex.Male;
        default:
            throw new Error(`Invalid Sex value: ${value}. Expected '0' or '1'.`);
    }
}

function parseActivityLevel(value: string): ActivityLevel {
    switch (value) {
        case '1':
            return ActivityLevel.Inactive;
        case '2':
            return ActivityLevel.ModeratelyActive;
        case '3':
            return ActivityLevel.VeryActive;
        default:
            throw new Error(`Invalid Activity Level value: ${value}. Expected '1', '2', or '3'.`);
    }
}

function parseGuest(value: string): boolean {
    switch (value) {
        case '0':
            return false;
        case '1':
            return true;
        default:
            throw new Error(`Invalid Guest value: ${value}. Expected '0' or '1'`);
    }
}


function parseLine(line: string): MeasurementData {
    const values = line.split(',').slice(10).filter((_, index) => index % 2 != 0).map(value => value.trim().replace(/"/g, ''));
    let date = `${values[1].split("/").reverse().join("-")}T${values[2]}`
    return {
        model: values[0],
        date: new Date(date),
        guest: parseGuest(values[3]),
        sex: parseSex(values[4]),
        age: parseInt(values[5]),
        height: parseInt(values[6]),
        activity_level: parseActivityLevel(values[7]),
        total_weight: parseFloat(values[8]),
        bmi: parseFloat(values[9]),
        total_fat: parseFloat(values[10]),
        right_arm_fat: parseFloat(values[11]),
        left_arm_fat: parseFloat(values[12]),
        right_leg_fat: parseFloat(values[13]),
        left_leg_fat: parseFloat(values[14]),
        trunk_fat: parseFloat(values[15]),
        total_muscle: parseFloat(values[16]),
        right_arm_muscle: parseFloat(values[17]),
        left_arm_muscle: parseFloat(values[18]),
        right_leg_muscle: parseFloat(values[19]),
        left_leg_muscle: parseFloat(values[20]),
        trunk_muscle: parseFloat(values[21]),
        bone_mass: parseFloat(values[22]),
        visceral_fat: parseFloat(values[23]),
        metabolic_rate: parseFloat(values[24]),
        metabolic_age: parseFloat(values[25]),
        water: parseFloat(values[26]),
    }
}

export async function parseFile(file: File): Promise<MeasurementData[]> {
    const text = await file.text();
    console.log("File content:", text);
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return lines.map(parseLine);
}