
import { BsExclamationTriangle } from "react-icons/bs";
import CardWrapper from "./card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/"
      backButtonLabel="Back to login"
    >
      <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <BsExclamationTriangle className="h-4 w-4 flex-none" />
        <p className="">Authentication with your auth provider failed!</p>
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
