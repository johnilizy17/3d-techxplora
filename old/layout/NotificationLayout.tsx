import { getQuizByID } from "@/url/route/quiz";
import { getNonMatchingObjects } from "@/utils/constants";
import { onMessageListener } from "@/utils/firebase";
import { requestNotificationPermission, SentNotification } from "@/utils/notification";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function NatificationLayout({ children }: any) {

    const { Group } = useSelector((a: { teacher: { Group: any } }) => a.teacher);
    const { quizzes } = useSelector((a: { teacher: { quizzes: any } }) => a.teacher)
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const { notification } = useSelector((a: { auth: { notification: any } }) => a.auth);

    async function notificationProcess() {
         if (!notification) {
        await requestNotificationPermission()
         }
        if (!Group || Group.length === 0) return;
        if (user.accountable_type !== "App\\Models\\Student") return
        async function processGroups() {
            for (const a of Group) {
                const { data } = await getQuizByID(a.group_code);
                const { length } = getNonMatchingObjects(quizzes, data, "id");

                if (length > 0) {
                    const result = await SentNotification(notification, "Quiz to Join", `You currently have a total number of ${length} quiz form ${a.title} you have not join`, `/dashboard/teacher/groups?code=${a.group_code}`);
                }

                // wait 2 seconds before moving to next item
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        processGroups()

    }

    useEffect(() => {
        const unsubscribe = onMessageListener()
            .then((payload:any) => {
                 })
            .catch(err => console.log("Foreground message listener failed: ", err));

        return () => {
            // cleanup if necessary
        };
    }, []);

    useEffect(() => {
        notificationProcess()
    }, [Group.length, notification]);


    return children
}