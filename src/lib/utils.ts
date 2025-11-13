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
        daily_calorie_intake: parseFloat(values[24]),
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

export function formatDate(d: Date): string {
    return new Intl.DateTimeFormat(undefined, {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(d);
}

export function formatKey(key: string): string {
    return key === 'bmi' ? 'BMI' : key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
}

// Función para obtener las claves a mostrar
export function getColumns(columns: string[], data: MeasurementData[], format: boolean = true) {
    const f = format ? formatKey : (v: string) => v;
    if (columns.length)
        return columns.map(f);
    if (!data?.length)
        return [];
    return Object.keys(data[0]).map(f);
}

export function formatValue(val: any) {
    if (val == null) return "-";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (val instanceof Date) {
        return formatDate(val);
    }
    if (typeof val === "number") {
        return Number(val.toFixed(2));
    }
    return String(val);
}

export function getUnits(key: string, show_tanita_rating: boolean = false, add_parentheses: boolean = false): string {
    let units = ''
    if (key === 'visceral_fat') {
        units = show_tanita_rating ? 'tanita rating' : '';
    } else if (key.includes('fat') || key == "water") {
        units = '%';
    } else if (key.includes('muscle') || ['total_weight', 'bone_mass'].includes(key)) {
        units = 'Kg';
    } else if (key.includes('age')) {
        units = 'years';
    } else if (key === 'height') {
        units = 'cm';
    } else if (key === 'daily_calorie_intake') {
        units = 'Kcal/day';
    } 
    return add_parentheses && units ? `(${units})` : units;
}

