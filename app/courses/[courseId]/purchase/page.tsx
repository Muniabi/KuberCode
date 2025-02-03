import { Metadata } from "next";
import PurchaseContent from "./purchase-content";

export const metadata: Metadata = {
    title: "Оплата курса | Kuber Code",
    description: "Оформление покупки курса",
};

export default function PurchasePage({
    params,
}: {
    params: { courseId: string };
}) {
    return <PurchaseContent courseId={params.courseId} />;
}
