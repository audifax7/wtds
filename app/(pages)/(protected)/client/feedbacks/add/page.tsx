import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { FeedbackForm } from "./components/form";

export const metadata: Metadata = {
  title: "ADD FEEDBACK",
};

export default function AddFeedbacksPage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">ADD MY SUGGESTION TO WASAC</h3>
        </div>
        <Separator />
        <FeedbackForm />
      </div>
    </>
  );
}
