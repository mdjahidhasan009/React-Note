import {GenericForm, TGenericFormRef} from "@/components/form";
import {TEmployeeFormValue, EmployeeSchema, initialValues} from "@/features/employee-onboarding/schema.ts";
import {useRef} from "react";
import {Stepper} from "@/components/stepper/Stepper.tsx";
import {PersonalDetailsFields} from "@/features/employee-onboarding/PersonalDetailsFields.tsx";

export const EmployeeOnboarding = () => {
    const formRef = useRef<TGenericFormRef<TEmployeeFormValue>>(null);

    return (
        <GenericForm
            ref={formRef}
            schema={EmployeeSchema}
            initialValues={initialValues}
            onSubmit={async (values) => {
                console.log(values);
            }}
        >
            <Stepper>
                <Stepper.Step>
                    <PersonalDetailsFields />
                </Stepper.Step>
                <Stepper.Step>Employment Details</Stepper.Step>
                <Stepper.Step>Professional Experience</Stepper.Step>
                <Stepper.Step>Skills and Goals</Stepper.Step>
                <Stepper.Step>Policy</Stepper.Step>
                <Stepper.Step>Preview</Stepper.Step>
            </Stepper>
        </GenericForm>
    )
}
