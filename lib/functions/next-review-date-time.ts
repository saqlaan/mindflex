import { add } from "date-fns";

export function computeNextReviewDateTime(difficultyLevel: number): string {
  let duration: { [key: string]: number } = {};
  switch (difficultyLevel) {
    case 1:
      duration = { days: 3 };
      break;
    case 2:
      duration = { days: 1 };
      break;
    case 3:
      duration = { minutes: 10 };
      break;
    case 4:
      duration = { minutes: 5 };
      break;
    case 5:
      duration = { seconds: 30 };
      break;
    default:
      // You can set a default duration if necessary
      duration = { minutes: 1 }; // Default to 1 minute if difficulty level is invalid
  }
  console.log({ duration, difficultyLevel });
  // Adding the duration to the current date
  return add(new Date(), duration).toISOString();
}
