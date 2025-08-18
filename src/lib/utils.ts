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
        weight: parseFloat(values[8]),
        bmi: parseFloat(values[9]),
        fat_body: parseFloat(values[10]),
        fat_right_arm: parseFloat(values[11]),
        fat_left_arm: parseFloat(values[12]),
        fat_right_leg: parseFloat(values[13]),
        fat_left_leg: parseFloat(values[14]),
        fat_trunk: parseFloat(values[15]),
        muscle_body: parseFloat(values[16]),
        muscle_right_arm: parseFloat(values[17]),
        muscle_left_arm: parseFloat(values[18]),
        muscle_right_leg: parseFloat(values[19]),
        muscle_left_leg: parseFloat(values[20]),
        muscle_trunk: parseFloat(values[21]),
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
import type { Sex, ActivityLevel, MeasurementData } from "$lib/interfaces";

function parseLine(line:string): MeasurementData {
    const values = line.split(',').slice(10).filter((_,index) => index %2 !=0 )
    return {
        model: values[0],
        date: values[1],
        time: values[2],
        guest: values[3] === '1',
        sex: values[4] as Sex,
        age: parseInt(values[5]),
        height: parseInt(values[6]),
        activity_level: values[7] as ActivityLevel,
        weight: parseFloat(values[8]),
        bmi: parseFloat(values[9]),
        fat_body: parseFloat(values[10]),
        fat_right_arm: parseFloat(values[11]),
        fat_left_arm: parseFloat(values[12]),
        fat_right_leg: parseFloat(values[13]),
        fat_left_leg: parseFloat(values[14]),
        fat_trunk: parseFloat(values[15]),
        muscle_body: parseFloat(values[16]),
        muscle_right_arm: parseFloat(values[17]),
        muscle_left_arm: parseFloat(values[18]),
        muscle_right_leg: parseFloat(values[19]),
        muscle_left_leg: parseFloat(values[20]),
        muscle_trunk: parseFloat(values[21]),
        bone_mass: parseFloat(values[22]),
        visceral_fat: parseFloat(values[23]),
        metabolic_rate: parseFloat(values[24]),
        metabolic_age: parseFloat(values[25]),
        water: parseFloat(values[26]),
    }
}

export async function parseFile(file: File): Promise<string> {
  const text = await file.text();
  console.log("File content:", text);
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const measurements: MeasurementData[] = lines.map(parseLine);
    console.log("Parsed measurements:", measurements);
  return text
}