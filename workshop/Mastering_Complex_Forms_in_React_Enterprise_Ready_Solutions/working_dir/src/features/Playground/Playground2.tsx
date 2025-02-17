import {Stepper} from "@/components/stepper/Stepper.tsx";

export const Playground2 = () => {
    return (
        <Stepper>
            <Stepper.Step>Step One</Stepper.Step>
            <Stepper.Step>Two</Stepper.Step>
            <Stepper.Step>
                <div>Three</div>
                <div>Four</div>
            </Stepper.Step>
            <Stepper.Step>Five</Stepper.Step>
        </Stepper>
    )
}