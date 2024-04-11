
export interface LinkProps{
    github?: string;
    linkedIn?: string;
    portfolio?: string;

}

export interface ContactProps{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    location?: string;
}

export interface WorkExperience{
title: string;
company: string;
location: string;
startMonth: string;
startYear: string;
endMonth?: string;
endYear?: string;
workDescription?: string;
bulletDescription?: string[];
}

export interface Education{
name: string;
school: string;
startMonth: string;
startYear: string;
endMonth?: string;
endYear?: string;
description?: string;
bulletDescription?: string[];
}