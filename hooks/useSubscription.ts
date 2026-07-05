'use client';

import { useAuth, useUser } from "@clerk/nextjs";
import { PLANS, PLAN_LIMITS, PlanType } from "@/lib/subscription-constants";

export const useSubscription = () => {
    const { has, isLoaded: isAuthLoaded } = useAuth();
    const { user, isLoaded: isUserLoaded } = useUser();

    const isLoaded = isAuthLoaded && isUserLoaded;

    if (!isLoaded) {
        return {
            plan: PLANS.FREE,
            limits: PLAN_LIMITS[PLANS.FREE],
            isLoaded: false
        };
    }

    let plan: PlanType = PLANS.FREE;

    // 1. First Check: Clerk's `has` helper from useAuth
    if (has?.({ product: 'pro' }) || has?.({ plan: 'pro' })) {
        plan = PLANS.PRO;
    } else if (has?.({ product: 'standard' }) || has?.({ plan: 'standard' })) {
        plan = PLANS.STANDARD;
    } 
    // 2. Second Check: Fallback to user public metadata if `has` fails (caching issue)
    else {
        const metadataPlan = (user?.publicMetadata?.plan || user?.publicMetadata?.billingPlan)?.toString().toLowerCase();
        
        if (metadataPlan === 'pro') {
            plan = PLANS.PRO;
        } else if (metadataPlan === 'standard') {
            plan = PLANS.STANDARD;
        }
    }

    return {
        plan,
        limits: PLAN_LIMITS[plan],
        isLoaded: true
    };
};
