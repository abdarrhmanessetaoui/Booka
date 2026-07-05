import {auth} from "@clerk/nextjs/server";
import {PLANS, PLAN_LIMITS, PlanType} from "@/lib/subscription-constants";

export const getUserPlan = async (): Promise<PlanType> => {
    const { has, userId } = await auth();

    if (!userId) return PLANS.FREE;

    if (has({ plan: "pro" })) return PLANS.PRO;
    if (has({ plan: "standard" })) return PLANS.STANDARD;

    return PLANS.FREE;
}

export const getPlanLimits = async () => {
    const plan = await getUserPlan();
    return PLAN_LIMITS[plan];
}
