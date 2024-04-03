interface DashboardData {
    current_gpa: number;
    total_credit_course_taken: number;
    current_semester: string;
    unpaid_fees: number;
}

interface IPKData {
    ipk: number;
}

interface CurrentSemesterData {
    current_semester_year: string;
}

interface UKTData {
    total_ukt: number;
}

interface TotalCreditsData {
    total_credits: number;
}

export { DashboardData, IPKData, CurrentSemesterData, UKTData, TotalCreditsData };
