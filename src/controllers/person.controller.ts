import { Request, Response } from "express";
import { createPerson, getPersonById } from "../services/database/person";
import { EmergencyContact, Insurance, Person, Visit } from "../types";

export const getPerson = async (req: Request, res: Response) => {
    const { id } = req.params;
    const person = await getPersonById(Number(id));
    res.json(person);
};

export const addPerson = async (req: Request, res: Response) => {
    const { patientInfo, emergencyContactInfo, visitInfo, insuranceInfo } = req.body;

    const p: Person = patientInfo;
    const i: Insurance = insuranceInfo;
    const e: EmergencyContact = emergencyContactInfo;
    const v: Visit = visitInfo;

    // console.log(emergencyContactInfo, visitInfo, insuranceInfo);

    try{
        if(!p || !i || !e || !v){
            throw new Error("Missing required fields")
        }
        if (!v.reason){
            throw new Error("Missing required fields")
        }
        const person = await createPerson(p, i, e, v)
        res.json(person)
    }
    catch(error){
        res.status(400).json(error)
    }
};