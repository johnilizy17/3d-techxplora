import CloseLayout from "@/layout/CloseLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import CreateQuestion from "@/template/Question/CreateQuestion";
import NumberOfQuestion from "@/template/Question/NumberOfQuestion";
import React, { useState } from "react";

export default function ManuelUpload() {

    const [number, setNumber] = useState(0)
    
    return (
        <DashboardLayout title="Manuel Upload of Question">
            <CloseLayout>
                {number > 0 ? <CreateQuestion number={number} setNumber={setNumber} />
                    :
                    <NumberOfQuestion setNumber={setNumber} />
                }
            </CloseLayout>
        </DashboardLayout>
    )
}