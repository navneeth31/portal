export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    if (totalSessions === 0 || presentCount === 0) {
        return 0;
    }
    const percentage = (presentCount / totalSessions) * 100;
    return percentage.toFixed(2); // Limit to two decimal places
};


export const groupAttendanceBySubject = (subjectAttendance) => {
    if (!subjectAttendance || !Array.isArray(subjectAttendance)) {
        return {};
    }

    const attendanceBySubject = {};

    subjectAttendance.forEach((attendance) => {
        // Skip if attendance or attendance.subName is null or undefined
        if (!attendance || !attendance.subName) {
            return;
        }

        const subName = attendance.subName.subName;
        const sessions = attendance.subName.sessions;
        const subId = attendance.subName._id;

        if (!attendanceBySubject[subName]) {
            attendanceBySubject[subName] = {
                present: 0,
                absent: 0,
                sessions: sessions,
                allData: [],
                subId: subId
            };
        }
        if (attendance.status === "Present") {
            attendanceBySubject[subName].present++;
        } else if (attendance.status === "Absent") {
            attendanceBySubject[subName].absent++;
        }
        attendanceBySubject[subName].allData.push({
            date: attendance.date,
            status: attendance.status,
        });
    });
    return attendanceBySubject;
}

export const calculateOverallAttendancePercentage = (subjectAttendance) => {
    if (!subjectAttendance || !Array.isArray(subjectAttendance) || subjectAttendance.length === 0) {
        return 0;
    }

    let totalSessionsSum = 0;
    let presentCountSum = 0;
    const uniqueSubIds = [];

    subjectAttendance.forEach((attendance) => {
        // Skip if attendance.subName is null or undefined
        if (!attendance || !attendance.subName) {
            return;
        }

        const subId = attendance.subName._id;
        if (subId && !uniqueSubIds.includes(subId)) {
            const sessions = parseInt(attendance.subName.sessions) || 0;
            totalSessionsSum += sessions;
            uniqueSubIds.push(subId);
        }
        presentCountSum += attendance.status === "Present" ? 1 : 0;
    });

    if (totalSessionsSum === 0 || presentCountSum === 0) {
        return 0;
    }

    return (presentCountSum / totalSessionsSum) * 100;
};
