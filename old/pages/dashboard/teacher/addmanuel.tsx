import CloseLayout from "@/layout/CloseLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import EditCreateQuestion from "@/template/Question/EditCreateQuestion";
import NumberOfQuestion from "@/template/Question/NumberOfQuestion";
import React, { useState } from "react";

export default function AddManuel() {

    const [number, setNumber] = useState(0)
    
    return (
        <DashboardLayout title="Manuel Upload of Question">
            <CloseLayout>
                {number > 0 ? <EditCreateQuestion number={number} setNumber={setNumber} />
                    :
                    <NumberOfQuestion edit={true} setNumber={setNumber} />
                }
            </CloseLayout>
        </DashboardLayout>
    )
}